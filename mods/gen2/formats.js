exports.BattleFormats = {
	pokemon: {
		effectType: 'Banlist',
		validateSet: function(set, format) {
			var template = this.getTemplate(set.species);
			var problems = [];
			if (set.species === set.name) delete set.name;

			if (template.gen > this.gen) {
				problems.push(set.species+' does not exist in gen '+this.gen+'.');
			} else if (template.isNonstandard) {
				problems.push(set.species+' is not a real Pokemon.');
			}
			if (set.moves) for (var i=0; i<set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.gen > this.gen) {
					problems.push(move.name+' does not exist in gen '+this.gen+'.');
				} else if (move.isNonstandard) {
					problems.push(move.name+' is not a real move.');
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name||set.species) + ' has more than four moves.');
			}
			
			// Automatically set ability to None
			set.ability = 'None';
			
			// In gen 2, there's no advantage on having subpar EVs and you could max all of them
			set.evs = {hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255};
				
			// IVs still maxed at 30 on Gen 2
			for (var iv in set.ivs) {
				if (set.ivs[iv] > 30) set.ivs[iv] = 30;
				if (set.ivs[iv] % 2 !== 0) {
					set.ivs[iv] = Math.floor(set.ivs.atk / 2) * 2;
				}
			}
			// Also calculate the IV oddness on gen 2. First, special is one IV
			set.ivs.spa = set.ivs.spd;
			// Don't run shinies they fuck your IVs
			if (set.shiny) {
				set.ivs.def = 20;
				set.ivs.spe = 20;
				set.ivs.spa = 20;
				set.ivs.spd = 20;
				// Attack can vary, so let's check it
				if (!((set.ivs.atk / 2) in {2:1, 3:1, 6:1, 7:1, 10:1, 11:1, 14:1, 15:1})) {
					set.ivs.atk = 30;
				}
			}
			// The HP iv is calcualted xoring the other IVs
			set.ivs.hp = ((set.ivs.atk / 2) ^ (set.ivs.def / 2) ^ (set.ivs.spa / 2) ^ (set.ivs.spe / 2)) * 2;
			
			// They also get a useless nature, since that didn't exist
			set.nature = 'Serious';
			
			return problems;
		}
	}
};
