exports.BattleFormats = {
	oldschoolclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Old School Clause: Only Hidden Power and moves introduced in the first generation are allowed.');
		},
		onValidateSet: function (set) {
			var issues = [];
			var movesLength = set.moves.length;
			for (var i = 0; i < movesLength; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.gen > 1 && move.id !== 'hiddenpower') {
					issues.push(set.species + " can't have " + move.name + ".");
				}
			}
			return issues;
		}
	}
};
