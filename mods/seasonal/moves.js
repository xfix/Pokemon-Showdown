exports.BattleMovedex = {
	cura: {
		num: -1,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "cura",
		name: "Cura",
		pp: 16,
		priority: 0,
		flags: {heal: 1},
		onHitSide: function (side, source) {
			var targets = [];
			for (var p in side.active) {
				targets.push(side.active[p]);
			}
			if (!targets.length) return false;
			for (var i = 0; i < targets.length; i++) {
				this.heal(Math.ceil(source.maxhp * 0.2), targets[i], source);
			}
		},
		secondary: false,
		target: "allySide",
		type: "Normal"
	},
	curaga: {
		num: -2,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "curaga",
		name: "Curaga",
		pp: 16,
		priority: 0,
		flags: {heal: 1},
		onHitSide: function (side, source) {
			var targets = [];
			for (var p in side.active) {
				targets.push(side.active[p]);
			}
			if (!targets.length) return false;
			for (var i = 0; i < targets.length; i++) {
				this.heal(Math.ceil(source.maxhp * 0.33), targets[i], source);
			}
		},
		secondary: false,
		target: "allySide",
		type: "Normal"
	},
	wildgrowth: {
		num: -3,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "wildgrowth",
		name: "Wild Growth",
		pp: 16,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'wildgrowth',
		effect: {
			duration: 5,
			onStart: function (side) {
				this.add('-sidestart', side, 'Wild Growth');
			},
			onResidualOrder: 21,
			onResidual: function (pokemon) {
				this.heal(pokemon.maxhp * 0.0615);
			},
			onEnd: function (side) {
				this.add('-sideend', side, 'Wild Growth');
			}
		},
		secondary: false,
		target: "allySide",
		type: "Grass"
	},
	powershield: {
		num: -4,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "powershield",
		name: "Power Shield",
		pp: 16,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'powershield',
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Power Shield');
			},
			onDamagePriority: -10,
			onDamage: function (damage, target, source, effect) {
				this.heal(Math.ceil(damage / 4), target, target);
				target.removeVolatile('powershield');
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Power Shield');
			}
		},
		secondary: false,
		target: "any",
		type: "Fairy"
	},
	rejuvenation: {
		num: -5,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "rejuvenation",
		name: "Rejuvenation",
		pp: 16,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1},
		volatileStatus: 'rejuvenation',
		effect: {
			duration: 3,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Rejuvenation');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual: function (pokemon) {
				this.heal(pokemon.maxhp * 0.125);
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Rejuvenation');
			}
		},
		secondary: false,
		target: "any",
		type: "Grass"
	},
	fairyward: {
		num: -6,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "fairyward",
		name: "Fairy Ward",
		pp: 25,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'fairyward',
		effect: {
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
		},
		secondary: false,
		target: "allySide",
		type: "Normal"
	},
	taunt: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "taunt",
		name: "Taunt",
		pp: 20,
		priority: 3,
		flags: {},
		volatileStatus: 'taunt',
		effect: {
			duration: 4,
			onFoeRedirectTarget: function (target, source, source2, move) {
				if (this.validTarget(this.effectData.target, source, move.target)) {
					return this.effectData.target;
				}
			}
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	sacrifice: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "sacrifice",
		name: "Sacrifice",
		pp: 20,
		priority: 3,
		flags: {},
		volatileStatus: 'sacrifice',
		effect: {
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
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	cooperation: {
		num: -8,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "cooperation",
		name: "Cooperation",
		pp: 15,
		priority: 1,
		flags: {},
		onTryHit: function (target, source) {
			if (source.side.active.length === 1) return false;
			if (target.side !== source.side) return false;
		},
		onHit: function (target, source) {
			if (!target) return false;
			var newPosition = target.position;
			if (!source.side.active[newPosition]) return false;
			if (source.side.active[newPosition].fainted) return false;
			this.swapPosition(source, newPosition, '[from] move: Cooperation');
		},
		secondary: false,
		target: "any",
		type: "Psychic"
	},
	slowdown: {
		num: -9,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "slowdown",
		name: "Slow Down",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit: function (target) {
			if (target.deductPP(target.lastMove, 8)) {
				this.add("-activate", target, 'move: Slow Down', target.lastMove, 8);
				target.addVolatile('disable');
				target.volatiles.disable.effectData.duration = 2;
				return;
			}
			return false;
		},
		secondary: false,
		target: "normal",
		type: "Ghost"
	},
	healingtouch: {
		num: -10,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target restores 1/2 of its maximum HP, rounded half up. If the user has the Ability Mega Launcher, the target instead restores 3/4 of its maximum HP, rounded half down.",
		shortDesc: "Heals the target by 50% of its max HP.",
		id: "healingtouch",
		name: "Healing Touch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1},
		onTryHit: function (target, source) {
			if (target.lastMove === 'healingtouch') {
				this.add('-hint', 'You can only used Healing Touch every other turn!');
				return false;
			}
		},
		onHit: function (target, source) {
			this.heal(Math.ceil(target.maxhp * 0.6));
		},
		secondary: false,
		target: "any",
		type: "Grass"
	},
	penance: {
		num: -11,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "penance",
		name: "Penance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1},
		onHit: function (target, source) {
			this.heal(Math.ceil(target.maxhp * 0.125));
			target.addVolatile('penance');
		},
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Penance');
			},
			onDamagePriority: -10,
			onDamage: function (damage, target, source, effect) {
				this.heal(Math.ceil(damage * 0.0615), target, target);
				target.removeVolatile('penance');
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Penance');
			}
		},
		secondary: false,
		target: "any",
		type: "Grass"
	},
	stop: {
		num: -12,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "stop",
		isViable: true,
		name: "Stop",
		pp: 10,
		priority: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit: function (target, source) {
			source.addVolatile('disable');
			target.volatiles.disable.effectData.duration = 8;
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch'
		},
		target: "normal",
		type: "Psychic"
	},
	laststand: {
		num: -13,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "laststand",
		name: "Last Stand",
		pp: 10,
		priority: 4,
		flags: {},
		volatileStatus: 'laststand',
		onTryHit: function (pokemon) {
			return this.willAct();
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('disable');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Last Stand');
			},
			onDamagePriority: -10,
			onDamage: function (damage, target, source, effect) {
				damage = Math.ceil(damage / 2);
				if (damage >= target.hp) damage = target.hp - 1;
				return damage;
			}
		},
		secondary: false,
		target: "self",
		type: "Fighting"
	},
	barkskin: {
		num: -14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "barkskin",
		name: "Barkskin",
		pp: 10,
		priority: 4,
		flags: {},
		volatileStatus: 'barkskin',
		effect: {
			duration: 2,
			onStart: function (target) {
				this.add('-start', target, 'move: Barkskin');
			},
			onEnd: function (target) {
				this.add('-end', target, 'move: Barkskin');
			},
			onDamagePriority: -10,
			onDamage: function (damage, target, source, effect) {
				return Math.ceil(damage * 0.75);
			}
		},
		secondary: false,
		target: "self",
		type: "Grass"
	},
	punishment: {
		num: -15,
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			return pokemon.hp;
		},
		category: "Physical",
		id: "punishment",
		isViable: true,
		name: "Punishment",
		pp: 20,
		priority: -1,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: false,
		target: "normal",
		type: "Fighting"
	},
	firestrike: {
		num: -16,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.status === 'brn') return 60;
			return 30;
		},
		category: "Special",
		id: "firestrike",
		name: "Firestrike",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Fire"
	},
	conflagration: {
		num: -17,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "conflagration",
		name: "Conflagration",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 100, status: 'brn'},
		target: "normal",
		type: "Fire"
	},
	moonfire: {
		num: -18,
		accuracy: 100,
		basePower: 5,
		category: "Special",
		id: "moonfire",
		name: "Moonfire",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 100, volatileStatus: 'moonfire'},
		effect: {
			duration: 4,
			onStart: function (target) {
				this.add('-start', target, 'move: Moonfire');
			},
			onEnd: function (target) {
				this.add('-end', target, 'move: Moonfire');
			},
			onResidual: function (pokemon) {
				this.damage(pokemon.maxhp * 0.03);
			}
		},
		target: "normal",
		type: "Grass"
	},
	starfire: {
		num: -19,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.volatiles['moonfire']) return 50;
			return 30;
		},
		category: "Special",
		id: "starfire",
		name: "Starfire",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Grass"
	},
	corruption: {
		num: -20,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "corruption",
		name: "Corruption",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'corruption',
		effect: {
			duration: 4,
			onStart: function (target) {
				this.add('-start', target, 'move: Corruption');
			},
			onEnd: function (target) {
				this.add('-end', target, 'move: Corruption');
			},
			onResidual: function (pokemon) {
				this.damage(pokemon.maxhp * 0.1);
			}
		},
		target: "normal",
		type: "Dark"
	},
	soulleech: {
		num: -21,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "soulleech",
		name: "Soul Leech",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'soulleech',
		effect: {
			duration: 4,
			onStart: function (target) {
				this.add('-start', target, 'move: Soul Leech');
			},
			onEnd: function (target) {
				this.add('-end', target, 'move: Soul Leech');
			},
			onResidualOrder: 8,
			onResidual: function (pokemon) {
				var target = this.effectData.source.side.active[pokemon.volatiles['soulleech'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				var damage = this.damage(pokemon.maxhp * 0.06, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			}
		},
		target: "normal",
		type: "Dark"
	},
	icelance: {
		num: -22,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.volatiles['chilled']) return 60;
			return 30;
		},
		category: "Special",
		id: "icelance",
		name: "Ice Lance",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Ice"
	},
	frostbite: {
		num: -23,
		accuracy: 100,
		basePower: 10,
		category: "Special",
		id: "frostbite",
		name: "Frostbite",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 100, volatileStatus: 'chilled'},
		target: "normal",
		type: "Ice"
	},
	hurricanewinds: {
		num: -24,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		id: "hurricanewinds",
		isViable: true,
		name: "Hurricane Winds",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Flying"
	},
	storm: {
		num: -25,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		id: "storm",
		isViable: true,
		name: "Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Electric"
	},
	fury: {
		num: -26,
		accuracy: 100,
		basePower: 15,
		basePowerCallback: function (pokemon, target) {
			if (pokemon.volatiles['furycharge']) return 200;
			return 15;
		},
		category: "Physical",
		id: "fury",
		isViable: true,
		name: "Fury",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (target, source) {
			source.addVolatile('disable');
		},
		target: "normal",
		type: "Fighting"
	},
	garrote: {
		num: -27,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		id: "garrote",
		name: "Garrote",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 100, volatileStatus: 'bleed'},
		target: "normal",
		type: "Dark"
	},
	mutilate: {
		num: -28,
		accuracy: 100,
		basePower: 35,
		basePowerCallback: function (pokemon, target) {
			var bP = 35;
			if (target.volatiles['bleed']) bP += 10;
			if (target.status === 'psn') bP += 10;
			return bP;
		},
		category: "Physical",
		id: "mutilate",
		name: "Mutilate",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Dark"
	},
	envenom: {
		num: 30,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "poisongas",
		name: "Poison Gas",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'psn',
		secondary: false,
		target: "normal",
		type: "Poison"
	},
	evasion: {
		num: 31,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "evasion",
		name: "Evasion",
		pp: 8,
		priority: 5,
		flags: {},
		onHit: function (target, source) {
			source.addVolatile('disable');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				this.add('-activate', target, 'Protect');
				var lockedmove = source.getVolatile('lockedmove');
				return null;
			}
		},
		secondary: false,
		target: "normal",
		type: "Fighting"
	}
};
