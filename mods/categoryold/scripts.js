exports.BattleScripts = {
	gen: 6,
	getCategory: function(move) {
		move = this.getMove(move);
		if (move.category === 'Status') return 'Status';
		if (move.id === 'secretsword') return 'Special';
		var specialTypes = {Fire:1, Water:1, Grass:1, Ice:1, Electric:1, Dark:1, Psychic:1, Dragon:1, Fairy:1};
		return specialTypes[move.type] ? 'Special': 'Physical';
	}
};
