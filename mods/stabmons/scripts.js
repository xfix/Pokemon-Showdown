exports.BattleScripts = {
	init: function() {
		for (var i in exports.BattleLearnsets) {
			console.log(i);
			for (var n in exports.BattleMovedex) {
				if ((exports.BattleMovedex[n].type in exports.BattlePokedex[i].types)) {
					exports.BattleLearnsets[i].learnset[exports.BattleMovedex[n].id] = ["5L1"];
				}
			}
			delete pokemon;
		}
	}
};