exports.BattleScripts = {
	init: function() {
		for (var i in this.data.Learnsets) {
			var learnset = this.data.Learnsets[i].learnset;
			var physFight = (learnset['closecombat'] || []).union(learnset['superpower'] || []);
			if (physFight.length) this.modData('Learnsets', i).learnset['forcepalm'] = (learnset['forcepalm'] || []).union(physFight);
			var specFight = learnset['focusblast'] || [];
			if (specFight.length) this.modData('Learnsets', i).learnset['aurasphere'] = (learnset['aurasphere'] || []).union(specFight);
		}
	}
};
