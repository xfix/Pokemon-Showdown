exports.BattleScripts = {
	gen: 6,
	// Init function to set things up.
	// It makes all moves to have true accuracy.
	init: function() {
		for (var i in this.data.Movedex) {
			if (typeof this.data.Movedex[i].basePower === 'number' && this.data.Movedex[i].basePower > 0) {
				var accuracy = (this.data.Movedex[i].accuracy === true) ? 100 : this.data.Movedex[i].accuracy;
				var basePower = Math.floor(this.data.Movedex[i].basePower * accuracy / 100);
				if (this.data.Movedex[i].critRatio === 2) basePower *= 1.125;
				if (this.data.Movedex[i].critRatio === 3) basePower *= 1.25;
				this.modData('Movedex', i).basePower = basePower;
			}
			this.modData('Movedex', i).accuracy = true;
		}
	},
	// Edit getDamage so there is no crits and no random damage.
	getDamage: function (pokemon, target, move, suppressMessages) {
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
		if (!move.type) move.type = '???';
		var type = move.type;
		// '???' is typeless damage: used for Struggle and Confusion etc
		var category = this.getCategory(move);
		var defensiveCategory = move.defensiveCategory || category;

		var basePower = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		if (!basePower) {
			if (basePower === 0) return; // returning undefined means not dealing damage
			return basePower;
		}
		basePower = this.clampIntRange(basePower, 1);


		basePower = this.runEvent('BasePower', pokemon, target, move, basePower, true);
		if (!basePower) return 0;
		basePower = this.clampIntRange(basePower, 1);

		var level = pokemon.level;

		var attacker = pokemon;
		var defender = target;
		var attackStat = category === 'Physical' ? 'atk' : 'spa';
		var defenseStat = defensiveCategory === 'Physical' ? 'def' : 'spd';
		var statTable = {atk:'Atk', def:'Def', spa:'SpA', spd:'SpD', spe:'Spe'};
		var attack;
		var defense;

		var atkBoosts = move.useTargetOffensive ? defender.boosts[attackStat] : attacker.boosts[attackStat];
		var defBoosts = move.useSourceDefensive ? attacker.boosts[defenseStat] : defender.boosts[defenseStat];

		var ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
		var ignorePositiveDefensive = !!move.ignorePositiveDefensive;

		var ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
		var ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));

		if (ignoreOffensive) {
			this.debug('Negating (sp)atk boost/penalty.');
			atkBoosts = 0;
		}
		if (ignoreDefensive) {
			this.debug('Negating (sp)def boost/penalty.');
			defBoosts = 0;
		}

		if (move.useTargetOffensive) attack = defender.calculateStat(attackStat, atkBoosts);
		else attack = attacker.calculateStat(attackStat, atkBoosts);

		if (move.useSourceDefensive) defense = attacker.calculateStat(defenseStat, defBoosts);
		else defense = defender.calculateStat(defenseStat, defBoosts);

		// Apply Stat Modifiers
		attack = this.runEvent('Modify' + statTable[attackStat], attacker, defender, move, attack);
		defense = this.runEvent('Modify' + statTable[defenseStat], defender, attacker, move, defense);

		//int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
		var baseDamage = Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * basePower * attack / defense) / 50) + 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			var spreadModifier = move.spreadModifier || 0.75;
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}
		// weather modifier (TODO: relocate here)

		// STAB
		if (move.hasSTAB || type !== '???' && pokemon.hasType(type)) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a Missingno.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		// types
		var totalTypeMod = 0;

		if (target.negateImmunity[move.type] !== 'IgnoreEffectiveness' || this.getImmunity(move.type, target)) {
			totalTypeMod = target.runEffectiveness(move);
		}

		totalTypeMod = this.clampIntRange(totalTypeMod, -6, 6);
		if (totalTypeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (var i = 0; i < totalTypeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (totalTypeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (var i = 0; i > totalTypeMod; i--) {
				baseDamage = Math.floor(baseDamage / 2);
			}
		}

		if (basePower && !Math.floor(baseDamage)) {
			return 1;
		}

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		return Math.floor(baseDamage);
	}
};
