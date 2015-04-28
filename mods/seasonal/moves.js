exports.BattleMovedex = {
	// Cura
	recover: {
		num: -1,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "recover",
		name: "Recover",
		pp: 16,
		priority: 0,
		flags: {heal: 1},
		onHitSide: function (side, source) {
			this.add('-message', source.name + "'s Cura heals its team!");
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
	// Curaga
	softboiled: {
		num: -2,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "softboiled",
		name: "Softboiled",
		pp: 16,
		priority: 0,
		flags: {heal: 1},
		onHitSide: function (side, source) {
			this.add('-message', source.name + "'s Curaga greatly heals its team!");
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
	// Wild Growth
	reflect: {
		num: -3,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "reflect",
		name: "Reflect",
		pp: 16,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'wildgrowth',
		secondary: false,
		target: "allySide",
		type: "Grass"
	},
	// Power Shield
	acupressure: {
		num: -4,
		accuracy: 100,
		basePower: 0,
		category: "acupressure",
		id: "acupressure",
		name: "Acupressure",
		pp: 16,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'powershield',
		secondary: false,
		target: "adjacentAllyOrSelf",
		type: "Fairy"
	},
	// Rejuvenation
	holdhands: {
		num: -5,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "holdhands",
		name: "Hold Hands",
		pp: 16,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1},
		volatileStatus: 'rejuvenation',
		secondary: false,
		target: "adjacentAlly",
		type: "Grass"
	},
	// Fairy Ward
	luckychant: {
		num: -6,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "luckychant",
		name: "Lucky Chant",
		pp: 25,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'fairyward',
		secondary: false,
		target: "allySide",
		type: "Normal"
	},
	// Taunt
	followe: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "followe",
		name: "Follow Me",
		pp: 20,
		priority: 3,
		flags: {},
		volatileStatus: 'taunting',
		secondary: false,
		target: "self",
		type: "Normal"
	},
	// Sacrifice
	meditate: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "meditate",
		name: "meditate",
		pp: 20,
		priority: 3,
		flags: {},
		volatileStatus: 'sacrifice',
		secondary: false,
		target: "self",
		type: "Normal"
	},
	// Cooperation
	helpinghand: {
		num: -8,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "helpinghand",
		name: "Helping Hand",
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
		target: "adjacentAlly",
		type: "Psychic"
	},
	// Slow Down
	spite: {
		num: -9,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "spite",
		name: "Spite",
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
	// Healing Touch
	aromaticmist: {
		num: -10,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "aromaticmist",
		name: "Aromatic Mist",
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
		target: "adjacentAlly",
		type: "Grass"
	},
	// Penance
	healbell: {
		num: -11,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "healbell",
		name: "Heal Bell",
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
				var d = Math.ceil(damage * 0.0615);
				this.heal(d, target, target);
				this.add('-message', target.name + "'s Penance healed it for " + d + "!");
				target.removeVolatile('penance');
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Penance');
			}
		},
		secondary: false,
		target: "allyTeam",
		type: "Grass"
	},
	// Stop
	fakeout: {
		num: -12,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "fakeout",
		name: "Fake Out",
		pp: 10,
		priority: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit: function (target, source) {
			source.addVolatile('disable');
			source.volatiles.disable.effectData.duration = 8;
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch'
		},
		target: "normal",
		type: "Psychic"
	},
	// Last Stand
	endure: {
		num: -13,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "endure",
		name: "Endure",
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
			onDamage: function (damage, target, source, effect) {
				var originalDamage = damage;
				damage = Math.ceil(damage / 2);
				if (damage >= target.hp) damage = target.hp - 1;
				this.add('-message', target.name + "'s Last Stand made it take " + (originalDamage-damage) + " damage less!");
				return damage;
			}
		},
		secondary: false,
		target: "self",
		type: "Fighting"
	},
	// Barkskin
	withdraw: {
		num: -14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "withdraw",
		name: "Withdraw",
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
			onDamage: function (damage, target, source, effect) {
				this.add('-message', target.name + "'s Barkskin reduced the damage!");
				return Math.ceil(damage * 0.75);
			}
		},
		secondary: false,
		target: "self",
		type: "Grass"
	},
	// Punishment
	seismictoss: {
		num: -15,
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			return pokemon.hp / 2;
		},
		category: "Physical",
		id: "seismictoss",
		isViable: true,
		name: "Seismic Toss",
		pp: 20,
		priority: -1,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: false,
		target: "normal",
		type: "Fighting"
	},
	// Flamestrike
	flamethrower: {
		num: -16,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.status === 'brn') return 60;
			return 30;
		},
		category: "Special",
		id: "flamethrower",
		name: "Flamethrower",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "any",
		type: "Fire"
	},
	// Conflagration
	fireblast: {
		num: -17,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "fireblast",
		name: "Fire Blast",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 100, status: 'brn'},
		target: "any",
		type: "Fire"
	},
	// Moonfire
	thunderbolt: {
		num: -18,
		accuracy: 100,
		basePower: 5,
		category: "Special",
		id: "thunderbolt",
		name: "Thunderbolt",
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
		target: "any",
		type: "Grass"
	},
	// Starfire
	thunder: {
		num: -19,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.volatiles['moonfire']) return 50;
			return 30;
		},
		category: "Special",
		id: "thunder",
		name: "Thunder",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "any",
		type: "Grass"
	},
	// Corruption
	toxic: {
		num: -20,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "toxic",
		name: "Toxic",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'corruption',
		target: "any",
		type: "Dark"
	},
	// Soul Leech
	leechseed: {
		num: -21,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "leechseed",
		name: "Leech Seed",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'leechseed',
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
				var target = this.effectData.source.side.active[pokemon.volatiles['leechseed'].sourcePosition];
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
		target: "any",
		type: "Dark"
	},
	// Ice Lance
	icebeam: {
		num: -22,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.volatiles['chilled']) return 60;
			return 30;
		},
		category: "Special",
		id: "icebeam",
		name: "Ice Beam",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Ice"
	},
	// Frostbite
	freezeshock: {
		num: -23,
		accuracy: 100,
		basePower: 10,
		category: "Special",
		id: "freezeshock",
		name: "Freeze Shock",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 100, volatileStatus: 'chilled'},
		target: "normal",
		type: "Ice"
	},
	// Hurricane
	aircutter: {
		num: -24,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		id: "aircutter",
		isViable: true,
		name: "Air Cutter",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Flying"
	},
	// Storm
	muddywater: {
		num: -25,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		id: "muddywater",
		isViable: true,
		name: "Muddy water",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Electric"
	},
	// Fury
	furyswipes: {
		num: -26,
		accuracy: 100,
		basePower: 15,
		basePowerCallback: function (pokemon, target) {
			if (pokemon.volatiles['furycharge']) return 200;
			return 15;
		},
		category: "Physical",
		id: "furyswipes",
		isViable: true,
		name: "Fury Swipes",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (target, source) {
			source.addVolatile('disable');
		},
		target: "normal",
		type: "Fighting"
	},
	// Garrote
	scratch: {
		num: -27,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		id: "scratch",
		name: "Scratch",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 100, volatileStatus: 'bleed'},
		target: "normal",
		type: "Dark"
	},
	// Mutilate
	slash: {
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
		id: "slash",
		name: "Slash",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Dark"
	},
	// Poison Gas
	smog: {
		num: 30,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "smog",
		name: "Smog",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'psn',
		secondary: false,
		target: "normal",
		type: "Poison"
	},
	// Evasion
	protect: {
		num: 31,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "protect",
		name: "Protect",
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
