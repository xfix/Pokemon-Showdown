exports.BattleScripts = {
	gen: 6,
	randomTeam: function () {
		var team = [];
		var i;
		for (i = 0; i < 6; i++) {
			team.push({
				name: 'Smeargle',
				moves: ['metronome'],
				ability: 'moody',
				evs: {
					hp: 0,
					atk: 0,
					def: 0,
					spa: 0,
					spd: 0,
					spe: 0
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				// This is the most serious metagame yet.
				nature: 'Serious',
				item: 'airballoon',
				level: 100,
				// It doesn't matter, to be honest.
				happiness: 42,
				// Make shinies possible, but rare.
				shiny: Math.random() * 1024 <= 1
			});
		}
		return team;
	}
};
