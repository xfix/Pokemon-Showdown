exports.BattleFormats = {
	suicidemons: {
		effectType: 'Banlist',
		validateTeam: function (team) {
			var problems = [];
			if (team.length < 6) {
				problems.push('You must have six Pokémon.');
			}
		},
		validateSet: function (set) {
			var problems = [];
			var name = set.name || set.species;
			if (set.level !== 100) {
				problems.push(name + ' must be level 100.');
			}
			if (set.moves.length !== 4) {
				problems.push(name + ' must have four moves.');
			}
			else {
				var i;
				var found = false;
				for (i = 0; i < 4; i++) {
					var move = this.getMove(set.moves[i]);
					if (move.category !== 'Status') {
						found = true;
						break;
					}
				}
				if (!found) {
					problems.push(name + " must have at least one damaging move");
				}
			}
			return problems;
		},
		ruleset: ['Shedinja', 'Self-Destruct', 'Explosion', 'Memento',
			'Final Gambit', 'Healing Wish', 'Heal Pulse', 'Lunar Dance', 'Dream Eater', 'Snore',
			'Return', 'Frustration', 'Fake Out', 'Natural Gift']
	}
}
