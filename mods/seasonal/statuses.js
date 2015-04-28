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
	},
	taunting: {
		duration: 4,
		onFoeRedirectTarget: function (target, source, source2, move) {
			if (this.validTarget(this.effectData.target, source, move.target)) {
				return this.effectData.target;
			}
		}
	},
	sacrifice: {
		duration: 4,
		onAnyModifyDamage: function (damage, source, target, move) {
			for (var i = 0; i < target.side.active.length; i++) {
				if (target !== target.side.active[i] && target.side.active[i].volatiles['sacrifice']) {
					this.directDamage(damage, target, source, {id: 'sacrifice'});
					return 0;
				}
			}
			return;
		}
	}
};
