exports.BattleScripts = {
	init: function() {
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			var bst = Object.keys(template.baseStats).map(function(stat) {return template.baseStats[stat]}).sum();
			var newStats = {};
			for (var stat in template.baseStats) {
				newStat = Math.round(template.baseStats[stat]*600/bst);
				newStats[stat] = newStat>255?255:newStat;
			}
			this.modData('Pokedex', i).baseStats = newStats;
		}
	}
};
