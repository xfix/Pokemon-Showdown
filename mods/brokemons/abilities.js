function createTypeChanger(id, name, type) {
	return {
		desc: "Turns all of this Pokemon's " + type + "-typed attacks into Flying-type and deal 1.4x damage. Does not affect Hidden Power.",
		shortDesc: "This Pokemon's Normal moves become " + type + "-type and do 1.4x damage.",
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'hiddenpower') {
				move.type = type;
				pokemon.addVolatile(id);
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: id,
		name: name,
		rating: 3,
		num: -6,
		gen: 6
	};
}

exports.BattleAbilities = {
	// Adaptability: Powers up STAB moves by 1.8x
	adaptability: {
		inherit: true,
		onModifyMove: function(move) {
			move.stab = 1.8;
		}
	},
	// Aerilate: Turns Normal moves into Flying moves and boosts them by 1.4x
	aerilate: createTypeChanger('aerilate', 'Aerilate', 'Flying'),
	// Aftermath: Takes away 1/3 of the max HP of the attacker landing the finishing hit.
	aftermath: {
		inherit: true,
		onFaint: function(target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.isContact && source) {
				this.damage(source.maxhp/3, source, target);
			}
		}
	},
	// Air Lock: Removes all weather
	airlock: {
		inherit: true,
		onStart: function () {
			this.clearWeather();
		},
		onAnyModifyPokemon: undefined,
		onAnyTryWeather: undefined
	},
	// Amplifate: Turns Normal moves into Electric moves and boosts them by 1.4x
	amplifate: createTypeChanger('amplifate', 'Amplifate', 'Electric')
}
