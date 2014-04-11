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
		secondary: false,
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
	// Aqua Ring - Restores 1/16 of the pokemon on the user's side max HP each turn, lasts for 10 turns, lasts even if user switches out
	// Thanks go to sirDonovan, for helping me with making this work.
	aquaring: {
		inherit: true,
		volatileStatus: false,
		sideCondition: 'aquaring',
		effect: {
			duration: 10,
			onStart: function(side) {
				this.add('-sidestart', side, 'move: Aqua Ring');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual: function(side) {
				var target = side.active[this.effectData.sourcePosition];
				this.effectData.hp = target.maxhp/16;
				if (!target.fainted) {
					this.heal(this.effectData.hp, target, target);
				}
			},
			onEnd: function(side) {
				this.add('-sideend', side, 'move: Aqua Ring');
			}
		},
		target: "allySide"
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
	},
	// Aura Sphere - 90 BP, -- Acc, never misses
	aurasphere: {
		inherit: true,
		basePower: 90
	},
	// Barrage - 25 BP, 100 Acc, Steel type, hits 2-5 times
	barrage: {
		inherit: true,
		basePower: 25,
		accuracy: 100,
		type: "Steel"
	},
	// Beat Up - 25 BP, 100 Acc, hits 2-5 times
	beatup: {
		num: 251,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Deals damage to one adjacent target and hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's Substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "beatup",
		name: "Beat Up",
		pp: 20,
		priority: 0,
		multihit: [2,5],
		secondary: false,
		target: "normal",
		type: "Dark"
	},
	// Blast Burn - 90 BP, 100 Acc, 50% chance to burn the foe.
	blastburn: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
		desc: "Deals damage to one adjacent target with a 50% chance to burn it.",
		shortDesc: "50% chance to burn the target.",
		self: {},
		secondary: {
			chance: 50,
			status: 'brn'
		}
	},
	// Blizzard - 120 BP, 75 Acc, 10% chance to freeze target
	blizzard: {
		inherit: true,
		basePower: 120,
		accuracy: 75
	},
	// Bone Club - 70 BP, 100 Acc, hits Flying-types super effectively (16 PP)
	boneclub: {
		inherit: true,
		accuracy: 100,
		basePower: 70,
		pp: 10,
		affectedByImmunities: false,
		secondary: false,
		getEffectiveness: weakToType('Flying')
	}
}
