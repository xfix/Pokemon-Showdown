exports.BattleAbilities = {
	adaptability: {
		inherit: true,
		onModifyMove: function(move) {
			move.stab = 1.8;
		}
	}
}
