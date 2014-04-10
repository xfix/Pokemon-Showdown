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
	},
	// Acid Spray - 40 BP, 100 Acc, 100% chance to lower target's SpD by 2 stages, hits Steel-types super effectively (16 PP)
	acidspray: {
		inherit: true,
		affectedByImmunities: false,
		getEffectiveness: weakToType('Steel')
	},
	// Aerial Ace - 75 BP, -- Acc, never misses
	aerialace: {
		inherit: true,
		basePower: 75
	},
	// Air Slash - 85 BP, 90 Acc, 20% chance to flinch target
	airslash: {
		inherit: true,
		basePower: 85,
		accuracy: 90,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch'
		}
	},
	// Air Cutter - 70 BP, 100 Acc, high critical hit ratio
	aircutter: {
		inherit: true,
		basePower: 70,
		accuracy: 100
	},
	// Aqua Tail - 45 BP, 100 Acc, hits twice
	aquatail: {
		inherit: true,
		basePower: 45,
		accuracy: 100,
		multihit: 2
	},
	// Arm Thrust - 25 BP, 100 Acc, hits 2-5 times
	armthrust: {
		inherit: true,
		basePower: 25
	},
	// Aromatic Mist - Heals 50% of user's HP and raises user's SpD by 1 stage (16 PP)
	aromaticmist: {
		inherit: true,
		heal: [1,2]
	},
	// Assurance - 40 BP, 100 Acc, +1 priority (48 BP)
	assurance: {
		inherit: true,
		basePower: 40,
		basePowerCallback: function(pokemon, target) {
			if (pokemon.volatiles.assurance && pokemon.volatiles.assurance.hurt) {
				this.debug('Boosted for being damaged this turn');
				return 80;
			}
			return 40;
		},
		priority: 1,
		pp: 30
	}
}
