/**
 * Gen 1 mechanics were fairly different, so we need to make a lot of changes to battle.js
 * using this.
 */
exports.BattleScripts = {
	gen: 1,
	init: function() {
		// We check for everything that didn't exist back in gen 1 and make it Illegal
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			if (template.gen > 1) template.isNonstandard = true;
			delete template.abilities['DW'];
		}
		for (var i in this.data.Movedex) {
			var move = this.getMove(i);
			if (move.gen > 1) move.isNonstandard = true;
		}
		for (var i in this.data.Abilities) {
			var ability = this.getAbility(i);
			if (ability.gen > 1) ability.isNonstandard = true;
		}
		for (var i in this.data.Items) {
			var item = this.getItem(i);
			if (item.gen > 1) item.isNonstandard = true;
		}
	},
	runMove: function(move, pokemon, target, sourceEffect) {
		/**
		 * runMove event needs to be reviewed for gen 1
		 */
		move = this.getMove(move);
		if (!target) target = this.resolveTarget(pokemon, move);

		this.setActiveMove(move, pokemon, target);

		if (pokemon.movedThisTurn || !this.runEvent('BeforeMove', pokemon, target, move)) {
			this.debug(''+pokemon.id+' move interrupted; movedThisTurn: '+pokemon.movedThisTurn);
			this.clearActiveMove(true);
			return;
		}
		if (move.beforeMoveCallback) {
			if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
				this.clearActiveMove(true);
				return;
			}
		}
		pokemon.lastDamage = 0;
		var lockedMove = this.runEvent('LockMove', pokemon);
		if (lockedMove === true) lockedMove = false;
		if (!lockedMove) pokemon.deductPP(move, null, target);
		this.useMove(move, pokemon, target, sourceEffect);
		this.runEvent('AfterMove', target, pokemon, move);
		this.runEvent('AfterMoveSelf', pokemon, target, move);
	},
	getDamage: function(pokemon, target, move, suppressMessages) {
		if (typeof move === 'string') move = this.getMove(move);
		if (typeof move === 'number') move = {
			basePower: move,
			type: '???',
			category: 'Physical'
		};

		if (move.affectedByImmunities) {
			if (!target.runImmunity(move.type, true)) {
				return false;
			}
		}

		if (move.ohko) {
			if (target.speed > pokemon.speed) {
				this.add('-failed', target);
				return false;
			}
			return target.maxhp;
		}
		
		if (move.damageCallback) {
			return move.damageCallback.call(this, pokemon, target);
		}
		
		if (move.damage === 'level') {
			return pokemon.level;
		}
		
		if (move.damage) {
			return move.damage;
		}

		if (!move) {
			move = {};
		}
		
		if (!move.category) move.category = 'Physical';
		if (!move.defensiveCategory) move.defensiveCategory = move.category;
		// '???' is typeless damage: used for Struggle and Confusion etc
		if (!move.type) move.type = '???';
		var type = move.type;

		// In Gen 1 category deppends on attacking type
		var specialTypes = {Fire:1, Water:1, Grass:1, Ice:1, Electric:1, Dark:1, Psychic:1, Dragon:1};
		var category = (type in specialTypes)? 'Special' : 'Physical';
		console.log(move.name + ': Using ' + category + ' type of attack for ' + type + '-type move.');
		
		var basePower = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		if (!basePower) return 0;
		basePower = clampIntRange(basePower, 1);

		// We check if it's a 100% crit move
		move.critRatio = clampIntRange(move.critRatio, 0, 5);
		var critMult = [0, 16, 8, 4, 3, 2];
		move.crit = move.willCrit || false;
		var critRatio = 0;
		// Otherwise, we calculate the critical hit chance
		if (typeof move.willCrit === 'undefined') {
			// In gen 1, the critical chance is based on speed
			switch (move.critRatio) {
			case 1:
				// Normal crit-rate: BaseSpeed * 100 / 512.
				critRatio = pokemon.baseStats['spe'] * 100 / 512;
				console.log('Using normal crit-rate: BaseSpeed * 100 / 512');
				break;
			case 2:
				// High crit-rate: BaseSpeed * 100 / 64
				critRatio = pokemon.baseStats['spe'] * 100 / 64;
				console.log('Using high crit-rate: BaseSpeed * 100 / 64');
				break;
			case -2:
				// Crit rate destroyed by Focus Energy (dumb trainer is dumb)
				// 1 - 3 = -2, this is a normal move
				critRatio = (pokemon.baseStats['spe'] * 100 / 64) * 0.25;
				console.log('Using ruined normal crit-rate: (pokemon.baseStats[\'spe\'] * 100 / 64) * 0.25');
				break;
			case -1:
				// 2 - 3 = -1, this is a high crit move. Deppends on speed
				if (pokemon.speed > target.speed) {
					// Critical rate not decreased
					critRatio = pokemon.baseStats['spe'] * 100 / 64;
					console.log('Using ruined high crit-rate: pokemon.baseStats[\'spe\'] * 100 / 64');
				} else {
					// If you are slower you can't crit
					console.log('Ruined crit rate, too slow, cannnot crit');
					critRatio = false;
				}
				break;
			}
			
			if (critRatio) {
				critRatio = critRatio.floor();
				var random = Math.random() * 100;
				move.crit = (random.floor() <= critRatio);
			}
		}

		if (move.crit) {
			move.crit = this.runEvent('CriticalHit', target, null, move);
		}

		// happens after crit calculation
		if (basePower) {
			basePower = this.runEvent('BasePower', pokemon, target, move, basePower);

			if (move.basePowerModifier) {
				basePower *= move.basePowerModifier;
			}
		}
		if (!basePower) return 0;
		basePower = clampIntRange(basePower, 1);

		var level = pokemon.level;

		var attacker = pokemon;
		var defender = target;
		if (move.useTargetOffensive) attacker = target;
		if (move.useSourceDefensive) defender = pokemon;

		var attack = attacker.getStat(move.category==='Physical'?'atk':'spa');
		var defense = defender.getStat(move.defensiveCategory==='Physical'?'def':'spd');

		if (move.crit) {
			move.ignoreNegativeOffensive = true;
			move.ignorePositiveDefensive = true;
		}
		if (move.ignoreNegativeOffensive && attack < attacker.getStat(move.category==='Physical'?'atk':'spa', true)) {
			move.ignoreOffensive = true;
		}
		if (move.ignoreOffensive) {
			console.log('Negating (sp)atk boost/penalty.');
			attack = attacker.getStat(move.category==='Physical'?'atk':'spa', true);
		}
		if (move.ignorePositiveDefensive && defense > target.getStat(move.defensiveCategory==='Physical'?'def':'spd', true)) {
			move.ignoreDefensive = true;
		}
		if (move.ignoreDefensive) {
			console.log('Negating (sp)def boost/penalty.');
			defense = target.getStat(move.defensiveCategory==='Physical'?'def':'spd', true);
		}

		// Gen 1 damage formula (((((min(((((2L/5 + 2)*A*P)/max(1, D))/50), 997) + 2)*S)*T)/10)*R)/255
		// Where: L: user level, A: current attack, P: move power, D: opponent current defense,
		// S is the Stab modifier, T is the type effectiveness modifier, R is random between 217 and 255
		// The max damage is 999
		console.log('Using formula: int(int(int(2*L/5+2)*A*P/D)/50) for base damage');
		var baseDamage = Math.floor(Math.floor(Math.floor(2*level/5+2) * basePower * attack/defense)/50) + 2;

		// crit
		if (move.crit) {
			if (!suppressMessages) this.add('-crit', target);
			baseDamage = this.modify(baseDamage, move.critModifier || 2);
		}

		// randomizer
		// this is not a modifier
		// gen 1-2
		var randFactor = Math.floor(Math.random()*39)+217;
		baseDamage *= Math.floor(randFactor * 100 / 255) / 100;
		console.log('Randomizing base damage as to gen 1: Math.floor(randFactor * 100 / 255) / 100, rand factor is ' + randFactor);

		// STAB
		if (type !== '???' && pokemon.hasType(type)) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a Missingno.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		
		// Types
		var totalTypeMod = this.getEffectiveness(type, target);
		if (totalTypeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);
			baseDamage *= 2;
			if (totalTypeMod >= 2) {
				baseDamage *= 2;
			}
		}
		
		if (totalTypeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);
			baseDamage = Math.floor(baseDamage/2);
			if (totalTypeMod <= -2) {
				baseDamage = Math.floor(baseDamage/2);
			}
		}

		if (basePower && !Math.floor(baseDamage)) {
			return 1;
		}

		return Math.floor(baseDamage);
	}
}