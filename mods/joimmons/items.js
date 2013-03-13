exports.BattleItems = {
		souldew: {
			inherit: true,
			onModifySpA: function(spa, pokemon) {
				if (pokemon.template.species === 'Latios' || pokemon.template.species === 'Latias' || pokemon.template.species === 'Dragonite') {
					return spa * 1.5;
				}
			},
			onModifySpD: function(spd, pokemon) {
				if (pokemon.template.species === 'Latios' || pokemon.template.species === 'Latias' || pokemon.template.species === 'Dragonite') {
					return spd * 1.5;
				}
			},
		}
};