exports.BattleScripts = {
	init: function() {
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			var newStats = {};
			var bestStatVal = 0;
			var worstStatVal = 300;
			var bestStat = ''
			var worstStat = '';
			for (var j in template.baseStats) {
				newStats[j] = template.baseStats[j];
				if (template.baseStats[j] > bestStatVal) {
					bestStatVal = template.baseStats[j];
					bestStat = j;
				}
				if (template.baseStats[j] <= worstStatVal) {
					worstStatVal = template.baseStats[j];
					worstStat = j;
				}
			}
			newStats[bestStat] = bestStatVal/2;
			newStats[worstStat] = worstStatVal*2;
			this.modData('Pokedex', i).baseStats = newStats;
		}
	}
};
