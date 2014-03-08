exports.BattleScripts = {
	init: function() {
		for (var i in this.data.Pokedex) {
			var stats = this.getTemplate(i).baseStats;
			this.modData('Pokedex', i).baseStats = {hp:stats.spe, atk:stats.spd, def:stats.spa, spa:stats.def, spd:stats.atk, spe:stats.hp};
		}
	}
};
