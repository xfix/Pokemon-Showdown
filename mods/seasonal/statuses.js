exports.BattleStatuses = {
	brn: {
		inherit: true,
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.0615);
		}
	},
	par: {
		inherit: true,
		onBeforeMove: function () {}
	},
	psn: {
		inherit: true,
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.125);
		}
	},
	chilled: {
		duration: 3,
		onStart: function (target, source, sourceEffect) {
			this.add('-start', target, 'chilled');
		},
		onEnd: function (target) {
			this.add('-end', target, 'chilled');
		},
		onModifySpe: function (speMod, pokemon) {
			return this.chain(speMod, 0.1);
		}
	},
	bleeding: {
		duration: 5,
		onStart: function (target) {
			this.add('-start', target, 'bleeding');
		},
		onEnd: function (target) {
			this.add('-end', target, 'bleeding');
		},
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.04);
		}
	}
};
