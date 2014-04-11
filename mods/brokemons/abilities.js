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
	adaptability: {
		inherit: true,
		onModifyMove: function(move) {
			move.stab = 1.8;
		}
	},
	aerilate: createTypeChanger('aerilate', 'Aerilate', 'Flying')
}
