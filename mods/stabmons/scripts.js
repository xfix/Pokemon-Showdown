exports.BattleScripts = {
	init: function() {
		for (var i in exports.BattleLearnsets) {
			var pokemon = exports.BattlePokedex[i];
			for (var n in exports.BattleMovedex) {
				for (var t in pokemon.types) {
					if (pokemon.types[t] === exports.BattleMovedex[n].type && !exports.BattleLearnsets[i].learnset[exports.BattleMovedex[n].id]) {
						exports.BattleLearnsets[i].learnset[exports.BattleMovedex[n].id] = ["5L1"];
					}
				}
			}
			delete pokemon;
		}
	}
};