exports.BattleScripts = {
	gen: 6,
	getCategory: function(move) {
		move = this.getMove(move);
		if (move.category === 'Status') return 'Status';
		if (move.category === 'Physical') return 'Special';
		return 'Physical';
	}
};
