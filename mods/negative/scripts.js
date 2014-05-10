exports.BattleScripts = {
	init: function() {
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			var newStats = {
				hp: template.id === 'shedinja' ? 1 : this.clampIntRange(150 - template.baseStats.hp, 5, 145),
				atk: this.clampIntRange(150 - template.baseStats.atk, 5, 145),
				def: this.clampIntRange(150 - template.baseStats.def, 5, 145),
				spa: this.clampIntRange(150 - template.baseStats.spa, 5, 145),
				spd: this.clampIntRange(150 - template.baseStats.spd, 5, 145),
				spe: this.clampIntRange(150 - template.baseStats.spe, 5, 145)
			}
			this.modData('Pokedex', i).baseStats = newStats;
		}
	}
};

