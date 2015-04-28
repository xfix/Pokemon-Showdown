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
			this.add('-message', target.name + ' has been chilled!');
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
			this.add('-message', target.name + ' is bleeding!');
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
		onStart: function (target) {
			this.add('-start', target, 'taunting');
			this.add('-message', target.name + ' is taunting its enemies!');
		},
		onEnd: function (target) {
			this.add('-end', target, 'taunting');
		},
		onFoeRedirectTarget: function (target, source, source2, move) {
			if (this.validTarget(this.effectData.target, source, move.target)) {
				return this.effectData.target;
			}
		}
	},
	sacrifice: {
		duration: 4,
		onStart: function (target) {
			this.add('-start', target, 'sacrifice');
			this.add('-message', target.name + ' is sacrificing itself for its teammates!');
		},
		onEnd: function (target) {
			this.add('-end', target, 'sacrifice');
		},
		onAnyDamage: function (damage, target, source, effect) {
			for (var i = 0; i < target.side.active.length; i++) {
				if (target !== target.side.active[i] && target.side.active[i].volatiles['sacrifice']) {
					this.add('-message', target.side.active[i].name + "'s Sacrifice took " + target.name + "'s damage!");
					this.directDamage(damage, target.side.active[i], source, {id: 'sacrifice'});
					return 0;
				}
			}
			return;
		}
	},
	corruption: {
		duration: 4,
		onStart: function (target) {
			this.add('-start', target, 'corruption');
		},
		onEnd: function (target) {
			this.add('-end', target, 'corruption');
		},
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.1);
			this.add('-message', pokemon.name + ' took Corruption damage!');
		}
	},
	wildgrowth: {
		duration: 5,
		onStart: function (side) {
			this.add('-sidestart', side, 'Wild Growth');
		},
		onResidualOrder: 21,
		onResidual: function (side) {
			for (var i = 0; i < side.active.length; i++) {
				var pokemon = side.active[i];
				if (pokemon.hp < pokemon.maxhp) {
					this.heal(pokemon.maxhp * 0.0615, pokemon, pokemon);
					this.add('-message', 'The wild growth recovered some of ' + pokemon.name + "'s HP!");
				}
			}
		},
		onEnd: function (side) {
			this.add('-sideend', side, 'Wild Growth');
		}
	},
	powershield: {
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Power Shield');
			this.add('-message', pokemon.name + ' has been shielded!');
		},
		onDamage: function (damage, target, source, effect) {
			var h = Math.ceil(damage / 4);
			this.heal(h, target, target);
			this.add('-message', target.name + "'s Power Shield healed it for " + h + "!");
			target.removeVolatile('powershield');
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Power Shield');
		}
	},
	rejuvenation: {
		duration: 3,
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Rejuvenation');
			this.add('-message', pokemon.name + ' is rejuvenating!');
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp * 0.125);
			this.add('-message', pokemon.name + ' healed due to its rejuvenation!');
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Rejuvenation');
		}
	},
	fairyward: {
		duration: 3,
		onSetStatus: function (status, target, source, effect) {
			if (source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
				return false;
			}
		},
		onTryConfusion: function (target, source, effect) {
			if (source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
				return false;
			}
		},
		onStart: function (side) {
			this.add('-sidestart', side, 'Fairy Ward');
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd: function (side) {
			this.add('-sideend', side, 'Fairy Ward');
		}
	}
};
