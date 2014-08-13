exports.BattleMovedex = {
	aerialace: {
		inherit: true,
		onTryHit: function (target, pokemon) {
			this.points(pokemon.side, 'AERIAL ACE Kreygasm', 10);
		}
	},
	fissure: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'OHKO', 10);
			this.points(target.side, 'Hype', 10);
		}
	},
	guillotine: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'OHKO', 10);
			this.points(target.side, 'Hype', 10);
		}
	},
	horndrill: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'OHKO', 10);
			this.points(target.side, 'Hype', 10);
		}
	},
	sheercold: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'OHKO', 10);
			this.points(target.side, 'Hype', 10);
		}
	},
	healpulse: {
		inherit: true,
		onHit: function (target, source) {
			if (target.hp !== target.maxhp) {
				this.points(source.side, 'A good deed a day brings happiness to stay!', 20);
			}
			if (source.hasAbility('megalauncher')) this.heal(this.modify(target.maxhp, 0.75));
			else this.heal(Math.ceil(target.maxhp * 0.5));
		}
	},
	dreameater: {
		inherit: true,
		onHit: function (target, source) {
			this.points(source.side, 'Rarely successful', 30);
		}
	},
	nightmare: {
		inherit: true,
		onHit: function (pokemon, source) {
			if (pokemon.status === 'slp') {
				this.points(source.side, 'Rarely successful', 30);
			}
		}
	},
	spitup: {
		inherit: true,
		onHit: function (pokemon, source) {
			this.points(source.side, 'Rarely successful', 30);
		}
	},
	swallow: {
		inherit: true,
		onTryHit: function (pokemon) {
			if (!pokemon.volatiles['stockpile'] || !pokemon.volatiles['stockpile'].layers) return false;
			this.points(pokemon.side, 'Rarely successful', 30);
		}
	},
	healingwish: {
		inherit: true,
		effect: {
			duration: 2,
			onStart: function (side) {
				this.debug('Healing Wish started on ' + side.name);
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				if (target.position != this.effectData.sourcePosition) {
					return;
				}
				if (!target.fainted) {
					var source = this.effectData.source;
					if (target.status || target.maxhp !== target.hp) {
						this.points(target.side, 'Rarely successful', 30);
					}
					var damage = target.heal(target.maxhp);
					target.setStatus('');
					this.add('-heal', target, target.getHealth, '[from] move: Healing Wish');
					target.side.removeSideCondition('healingwish');
				}
			}
		}
	},
	rapidspin: {
		inherit: true,
		self: {
			onHit: function (pokemon) {
				var success = false;
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				var sideConditions = {spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};
				for (var i in sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
						this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
						success = true;
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					this.add('-remove', pokemon, pokemon.volatiles['partiallytrapped'].sourceEffect.name, '[from] move: Rapid Spin', '[of] ' + pokemon, '[partiallytrapped]');
					delete pokemon.volatiles['partiallytrapped'];
					success = true;
				}
				if (success) {
					this.points(pokemon.side, 'Rarely successful', 30);
				}
			}
		}
	},
	defog: {
		inherit: true,
		onHit: function (target, source) {
			var success = false;
			if (!target.volatiles['substitute']) this.boost({evasion:-1});
			var sideConditions = {reflect:1, lightscreen:1, safeguard:1, mist:1, spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};
			for (var i in sideConditions) {
				if (target.side.removeSideCondition(i)) {
					this.add('-sideend', target.side, this.getEffect(i).name, '[from] move: Defog', '[of] ' + target);
					success = true;
				}
			}
			for (var i in sideConditions) {
				if (i === 'reflect' || i === 'lightscreen') continue;
				if (source.side.removeSideCondition(i)) {
					this.add('-sideend', source.side, this.getEffect(i).name, '[from] move: Defog', '[of] ' + source);
				}
			}
			if (success) {
				this.points(source.side, 'Rarely successful', 30);
			}
		}
	},
	venoshock: {
		inherit: true,
		onBasePower: function (basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				this.points(pokemon.side, 'Rarely successful', 30)
				return this.chainModify(2);
			}
		},
	},
	wakeupslap: {
		inherit: true,
		basePowerCallback: function (pokemon, target) {
			if (target.status === 'slp') {
				this.points(pokemon.side, 'Rarely successful', 30);
				return 140;
			}
			return 70;
		}
	},
	smellingsalts: {
		inherit: true,
		basePowerCallback: function (pokemon, target) {
			if (target.status === 'par') {
				this.points(pokemon.side, 'Rarely successful', 30);
				return 140;
			}
			return 70;
		}
	}
}
