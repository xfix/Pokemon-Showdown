exports.BattleFormats = {
	oumetronome: {
		effectType: 'Banlist',
		validateSet: function (set, format) {
			var issues = [];

			if (set.item && set.item !== 'Leppa Berry') {
				issues.push(set.species + " doesn't hold Leppa Berry.");
			}
			// Make sure the item is Leppa Berry
			set.item = 'Leppa Berry';
			var metronomeFound = false;
			var recycleFound = false;
			var i;
			var movesLength = set.moves.length;
			for (i = 0; i < movesLength; i++) {
				var move = set.moves[i];
				switch (move.toLowerCase()) {
				case 'metronome':
					if (metronomeFound) {
						issues.push(set.species + " cannot have more than one Metronome.");
					}
					metronomeFound = true;
					break;
				case 'recycle':
					if (recycleFound) {
						issues.push(set.species + " cannot have more than one Recycle.");
					}
					recycleFound = true;
					break;
				// Allow empty move.
				case '':
					break;
				default:
					issues.push(set.species + " cannot have " + move + ".");
					break;
				}
			}
			if (!metronomeFound) {
				set.moves.push("Metronome");
			}
			if (!recycleFound) {
				set.moves.push("Recycle");
			}
			var totalEV = 0;
			for (var k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				issues.push(set.species + " has more than 510 total EVs.");
			}
			var template = Tools.getTemplate(set.species);
			var legalAbility = false;
			for (var i in template.abilities) {
				if (set.ability === template.abilities[i]) legalAbility = true;
			}
			if (!legalAbility) {
				issues.push(set.species + " has illegal ability " + set.ability);
			}
			return issues;
		}
	}
};
