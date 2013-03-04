/**
 * Gen 1 2 scripts.
 */
exports.BattleScripts = {
	gen: 1,
	init: function() {
		// We check for everything that didn't exist back in gen 2 and make it Illegal
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			if (template.gen > 2) template.isNonstandard = true;
			delete template.abilities['DW'];
		}
		for (var i in this.data.Movedex) {
			var move = this.getMove(i);
			if (move.gen > 2) move.isNonstandard = true;
		}
		for (var i in this.data.Abilities) {
			var ability = this.getAbility(i);
			if (ability.gen > 2) ability.isNonstandard = true;
		}
		for (var i in this.data.Items) {
			var item = this.getItem(i);
			if (item.gen > 2) item.isNonstandard = true;
		}
	},
	getDamage: function(pokemon, target, move, suppressMessages) {
		// We get the move
		if (typeof move === 'string') move = this.getMove(move);
		if (typeof move === 'number') move = {
			basePower: move,
			type: '???',
			category: 'Physical'
		};

		// First of all, we test for immunities
		if (move.affectedByImmunities) {
			if (!target.runImmunity(move.type, true)) {
				return false;
			}
		}

		// Is it ok?
		if (move.ohko) {
			if (target.speed > pokemon.speed) {
				this.add('-failed', target);
				return false;
			}
			return target.maxhp;
		}
		
		// We edit the damage through move's damage callback
		if (move.damageCallback) {
			return move.damageCallback.call(this, pokemon, target);
		}
		
		// We take damage from damage=level moves
		if (move.damage === 'level') {
			return pokemon.level;
		}
		
		// If there's a fix move damage, we run it
		if (move.damage) {
			return move.damage;
		}
		
		// If it's the first hit on a Normal-type partially trap move, it hits Ghosts but damage is 0
		if (move.volatileStatus === 'partiallytrapped' && move.type === 'Normal' && target.hasType('Ghost')) {
			return 0;
		}
		
		// Let's check if we are in middle of a partial trap sequence
		if (pokemon.volatiles['partialtrappinglock'] && (target !== pokemon) && (target === pokemon.volatiles['partialtrappinglock'].locked)) {
			return pokemon.volatiles['partialtrappinglock'].damage;
		}

		// There's no move for some reason, create it
		if (!move) {
			move = {};
		}
		
		// We check the category and typing to calculate later on the damage
		if (!move.category) move.category = 'Physical';
		if (!move.defensiveCategory) move.defensiveCategory = move.category;
		// '???' is typeless damage: used for Struggle and Confusion etc
		if (!move.type) move.type = '???';
		var type = move.type;

		// In Gen 1 category deppends on attacking type
		var specialTypes = {Fire:1, Water:1, Grass:1, Ice:1, Electric:1, Dark:1, Psychic:1, Dragon:1};
		var category = (type in specialTypes)? 'Special' : 'Physical';
		
		// We get the base power and apply basePowerCallback if necessary
		var basePower = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		
		// We check for Base Power
		if (!basePower) {
			if (basePower === 0) return; // Returning undefined means not dealing damage
			return basePower;
		}
		basePower = clampIntRange(basePower, 1);

		// Checking for the move's Critical Hit ratio
		move.critRatio = clampIntRange(move.critRatio, 0, 5);
		var critMult = [0, 16, 8, 4, 3, 2];

		move.crit = move.willCrit || false;
		if (typeof move.willCrit === 'undefined') {
			if (move.critRatio) {
				move.crit = (selfB.random(critMult[move.critRatio]) === 0);
			}
		}
		if (move.crit) {
			move.crit = selfB.runEvent('CriticalHit', target, null, move);
		}

		// Happens after crit calculation
		if (basePower) {
			basePower = this.runEvent('BasePower', pokemon, target, move, basePower);
			if (move.basePowerModifier) {
				basePower *= move.basePowerModifier;
			}
		}
		if (!basePower) return 0;
		basePower = clampIntRange(basePower, 1);

		// We now check for attacker and defender
		var level = pokemon.level;
		var attacker = pokemon;
		var defender = target;
		if (move.useTargetOffensive) attacker = target;
		if (move.useSourceDefensive) defender = pokemon;
		var atkType = (move.category === 'Physical')? 'atk' : 'spa';
		var defType = (move.defensiveCategory === 'Physical')? 'atk' : 'spa';
		var attack = attacker.getStat(atkType);
		var defense = defender.getStat(defType);

		if (move.crit) {
			move.ignoreNegativeOffensive = true;
			move.ignorePositiveDefensive = true;
		}
		if (move.ignoreNegativeOffensive && attack < attacker.getStat(atkType, true)) {
			move.ignoreOffensive = true;
		}
		if (move.ignoreOffensive) {
			this.debug('Negating (sp)atk boost/penalty.');
			attack = attacker.getStat(atkType, true);
		}
		if (move.ignorePositiveDefensive && defense > target.getStat(defType, true)) {
			move.ignoreDefensive = true;
		}
		if (move.ignoreDefensive) {
			this.debug('Negating (sp)def boost/penalty.');
			defense = target.getStat(defType, true);
		}

		// Gen 2 formula
		var baseDamage = Math.min(Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * attack * basePower / defense) / 50), 997) + 2;

		// Crit damage addition (usually doubling)
		if (move.crit) {
			if (!suppressMessages) this.add('-crit', target);
			baseDamage = this.modify(baseDamage, move.critModifier || 2);
		}
		
		// STAB damage bonus, the "???" type never gets STAB
		if (type !== '???' && pokemon.hasType(type)) {
			baseDamage = Math.floor(baseDamage * 1.5);
		}
		
		// Type effectiveness
		var totalTypeMod = this.getEffectiveness(type, target);
		// Super effective attack
		if (totalTypeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);
			baseDamage *= 2;
			if (totalTypeMod >= 2) {
				baseDamage *= 2;
			}
		}
		// Resisted attack
		if (totalTypeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);
			baseDamage = Math.floor(baseDamage / 2);
			if (totalTypeMod <= -2) {
				baseDamage = Math.floor(baseDamage / 2);
			}
		}

		// Gem 2 randomizer, it's a number between 217 and 255
		var randFactor = Math.floor(Math.random()*39)+217;
		baseDamage *= Math.floor(randFactor * 100 / 255) / 100;
		
		// If damage is less than 1, we return 1
		if (basePower && !Math.floor(baseDamage)) {
			return 1;
		}

		// We are done, this is the final damage
		return Math.floor(baseDamage);
	},
	faint: function(pokemon, source, effect) {
		pokemon.faint(source, effect);
		this.queue = [];
	}
};