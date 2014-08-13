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
				this.points(side, 'Heroic sacrifice', 20);
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
	lunardance: {
		inherit; true,
		effect: {
			duration: 2,
			onStart: function (side) {
				this.debug('Lunar Dance started on ' + side.name);
				this.points(side, 'Heroic sacrifice', 20);
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				if (target.position != this.effectData.sourcePosition) {
					return;
				}
				if (!target.fainted) {
					var source = this.effectData.source;
					if (target.status || target.maxhp !== target.hp || target.moveset[0].pp !== target.moveset[0].maxpp || target.moveset[1].pp !== target.moveset[1].maxpp) {
						this.points(target.side, 'Rarely successful', 30);
					}
					var damage = target.heal(target.maxhp);
					target.setStatus('');
					for (var m in target.moveset) {
						target.moveset[m].pp = target.moveset[m].maxpp;
					}
					this.add('-heal', target, target.getHealth, '[from] move: Lunar Dance');
					target.side.removeSideCondition('lunardance');
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
	},
	brine: {
		inherit: true,
		onBasePower: function (basePower, pokemon, target) {
			if (target.hp * 2 < target.maxhp) {
				this.points(pokemon.side, 'Rarely successful', 30);
				return this.chainModify(2);
			}
		}
	},
	hex: {
		inherit: true,
		basePowerCallback: function (pokemon, target) {
			if (target.status) {
				this.points(pokemon.side, 'Rarely successful', 30);
				return 130;
			}
			return 65;
		},
	},
	smackdown: {
		inherit: true,
		onHit: function (pokemon, source) {
			var applies = false;
			if ((pokemon.hasType('Flying') && !pokemon.volatiles['roost']) || pokemon.hasAbility('levitate')) applies = true;
			if (pokemon.volatiles['fly'] || pokemon.volatiles['bounce']) {
				applies = true;
			}
			if (pokemon.volatiles['magnetrise']) {
				applies = true;
			}
			if (pokemon.volatiles['telekinesis']) {
				applies = true;
			}
			if (!applies) return false;
			this.points(source.side, 'Rarely successful', 30);
			this.add('-start', pokemon, 'Smack Down');
		}
	},
	fakeout: {
		inherit: true,
		onHit: function (target, source) {
			this.points(source.side, 'Rarely successful', 30);
		}
	},
	magnetrise: {
		inherit: true,
		effect: {
			duration: 5,
			onStart: function (target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity: function (type, pokemon) {
				if (type === 'Ground') {
					if (pokemon.volatiles['magnetrise'].duration === 5) {
						this.points(pokemon.side, 'Tactical dodge', 25);
					}
					return false;
				}
			},
			onResidualOrder: 15,
			onEnd: function (target) {
				this.add('-end', target, 'Magnet Rise');
			}
		}
	},
	selfdestruct: {
		inherit: true,
		onTryHit: function (target, pokemon) {
			this.points(pokemon.side, 'Heroic sacrifice', 20);
		}
	},
	explosion: {
		inherit: true,
		onTryHit: function (target, pokemon) {
			this.points(pokemon.side, 'Heroic sacrifice', 20);
		}
	},
	finalgambit: {
		inherit: true,
		onTryHit: function (target, pokemon) {
			this.points(pokemon.side, 'Heroic sacrifice', 20);
		}
	},
	memento: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'Heroic sacrifice', 20);
		}
	},
	uturn: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'I told you NOT to switch!', 4);
		}
	},
	voltswitch: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'I told you NOT to switch!', 4);
		}
	},
	batonpass: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'I told you NOT to switch!', 4);
		}
	},
	partingshot: {
		inherit: true,
		onHit: function (target, pokemon) {
			this.points(pokemon.side, 'I told you NOT to switch!', 4);
		}
	},
	venomdrench: {
		inherit: true,
		onHit: function (target, source, move) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.boost({atk:-1, spa:-1, spe:-1}, target, source, move);
				this.points(source.side, 'Rarely successful', 30);
			}
			return false;
		}
	},
	synchronoise: {
		inherit: true,
		onHit: function (pokemon, source) {
			this.points(source.side, 'Rarely successful', 30);
		}
	}
}
