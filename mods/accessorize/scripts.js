"use strict";

exports.BattleScripts = {
	mixTemplate: function (pokemon, type, deltas) {
		if (!type || !(type in Tools.data.TypeChart)) throw TypeError("Must specify valid type!");
		if (!deltas) throw TypeError("Must specify deltas!");
		let template = Object.clone(this.getTemplate(pokemon.species), true); // Avoid editing original version
		for (let stat in template.baseStats) {
			template.baseStats[stat] += deltas[stat] || 0;
		}
		pokemon.formeChange(template);
		if (pokemon.types.indexOf(type) < 0) {
			this.add('-start', pokemon, 'typechange', pokemon.types[0] + '/' + type);
			pokemon.typesData[1] = {type: type, suppressed: false, isAdded: false};
		}
	},
};