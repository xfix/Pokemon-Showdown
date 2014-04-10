function weakToType(weakness) {
	return function(source, target, pokemon) {
		var type = source.type || source;
		var totalTypeMod = 0;
		var types = target.getTypes && target.getTypes() || target.types;
		for (var i=0; i<types.length; i++) {
			if (!this.data.TypeChart[types[i]]) continue;
			if (types[i] === weakness) {
				totalTypeMod++;
				continue;
			}
			var typeMod = this.data.TypeChart[types[i]].damageTaken[type];
			if (typeMod === 1) { // super-effective
				totalTypeMod++;
			}
			if (typeMod === 2) { // resist
				totalTypeMod--;
			}
		}
		return totalTypeMod;
	}
}

exports.BattleMovedex = {
	// Acid - 70 BP, 100 Acc, hits Steel-types super effectively (16 PP)
	acid: {
		inherit: true,
		basePower: 70,
		pp: 10,
		affectedByImmunities: false,
		getEffectiveness: weakToType('Steel')
	}
}
