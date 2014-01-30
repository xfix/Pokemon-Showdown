exports.BattleScripts = {
	init: function() {
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			var bst = Object.keys(template.baseStats).map(function(stat) {return template.baseStats[stat]}).sum();
			var newBst = 900 - bst;
			var newStats = {};
			for (var stat in template.baseStats) {
				newStat = Math.round((template.baseStats[stat]/bst)*newBst);
				newStats[stat] = newStat>255?255:newStat;
			}
			this.modData('Pokedex', i).baseStats = newStats;
		}
	}
};
