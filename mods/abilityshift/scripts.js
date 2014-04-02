exports.BattleScripts = {
	init: function() {
		var self = this;
		var abilityList = Object.keys(this.data.Abilities).sort().filter(function(i) {return !self.data.Abilities[i].isNonstandard});
		console.log(abilityList);
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			var newAbilities = {};
			for (var a in template.abilities) {
				var abilityIndex = abilityList.indexOf(toId(template.abilities[a]));
				newAbilities[a] = this.data.Abilities[abilityList[abilityIndex + 1] || abilityList[0]].name;
			}
			if (template.id === 'jirachi') console.log(newAbilities);
			this.modData('Pokedex', i).abilities = newAbilities;
		}
	}
};
