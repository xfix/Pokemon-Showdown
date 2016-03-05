"use strict";

exports.BattleMovedex = {
	// awu
	ancestorsrage: {
		num: -583,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		id: "ancestorsrage",
		isViable: true,
		name: "Ancestor's Rage",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	// bumbadadabum
	freesoftware: {
		num: -161,
		accuracy: 95,
		basePower: 110,
		category: "Special",
		id: "freesoftware",
		isViable: true,
		name: "Free Software",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 30, status: 'par'},
		onHit: function (target, source) {
			this.add('c|@bumbadadabum|I\'d just like to interject for a moment. What you\'re referring to as Linux, is in fact, GNU/Linux, or as I\'ve recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.');
			this.add('c|@bumbadadabum|Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.');
			this.add('c|@bumbadadabum|There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine\'s resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!');
		},
		target: "normal",
		type: "Electric",
	},
	// Joim
	gasterblaster: {
		num: -63,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		id: "gasterblaster",
		name: "Gaster Blaster",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ice', type);
		},
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Beam", target);
		},
		onAfterHit: function (target, source) {
			if (target.hp > 0) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	// qtrx
	keyboardsmash: {
		num: -96,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 1 stage.",
		shortDesc: "Raises the user's Attack by 1.",
		id: "keyboardsmash",
		name: "KEYBOARD SMASH",
		pp: 40,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Lock", target);
			this.add('-anim', target, "Fairy Lock", target); // DRAMATIC FLASHING
		},
		onHit: function (target, source) {
			let gibberish = '';
			let hits = 0;
			let oldspa = source.stats.spa;
			let hps = ['hiddenpowerbug', 'hiddenpowerdark', 'hiddenpowerdragon', 'hiddenpowerelectric', 'hiddenpowerfighting', 'hiddenpowerfire', 'hiddenpowerflying', 'hiddenpowerghost', 'hiddenpowergrass', 'hiddenpowerground', 'hiddenpowerice', 'hiddenpowerpoison', 'hiddenpowerpsychic', 'hiddenpowerrock', 'hiddenpowersteel', 'hiddenpowerwater'];
			let hitcount = [3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7][this.random(11)];
			this.add('c|@qtrx|/me slams face into keyboard!');
			source.isDuringAttack = true; // Prevents the user from being kicked out in the middle of using Hidden Powers.
			source.stats.spa = source.stats.atk;
			for (let i = 0; i < hitcount; i++) {
				if (target.hp !== 0) {
					let len = 16 + this.random(35);
					gibberish = '';
					for (let j = 0; j < len; j++) gibberish += String.fromCharCode(48 + this.random(79));
					this.add('-message', gibberish);
					this.useMove(hps[this.random(16)], source, target);
					hits++;
				}
			}
			this.add('-message', 'Hit ' + hits + ' times!');
			source.stats.spa = oldspa;
			source.isDuringAttack = false;
		},
		secondary: false,
		target: "normal",
		type: "Psychic",
	},
	// Crestfall
	lightofunruin: {
		num: -617,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		id: "lightofunruin",
		isViable: true,
		name: "Light of Unruin",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isUnreleased: true,
		drain: [1, 2],
		self: {boosts: {def: -1, spd: -1}},
		secondary: false,
		target: "normal",
		type: "Fairy",
	},
	// gangnam style
	motherfathergentleman: {
		num: -154,
		accuracy: 80,
		basePower: 70,
		category: "Physical",
		id: "motherfathergentleman",
		name: "Mother, Father, Gentleman",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// m00ns
	oh: {
		num: -568,
		accuracy: 100,
		category: "Status",
		id: "oh",
		name: "oh",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {atk: -1, spa: -1},
		self: {boosts: {spd: 1}},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// AM
	predator: {
		num: -228,
		accuracy: 100,
		basePower: 40,
		basePowerCallback: function (pokemon, target) {
			if (target.beingCalledBack) {
				return 120;
			}
			return 60;
		},
		category: "Physical",
		id: "predator",
		isViable: true,
		name: "Predator",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		boosts: {atk:-1, spa:-1, accuracy:-2},
		beforeTurnCallback: function (pokemon, target) {
			target.side.addSideCondition('predator', pokemon);
			if (!target.side.sideConditions['predator'].sources) {
				target.side.sideConditions['predator'].sources = [];
			}
			target.side.sideConditions['predator'].sources.push(pokemon);
		},
		onModifyMove: function (move, source, target) {
			if (target && target.beingCalledBack) move.accuracy = true;
		},
		onTryHit: function (target, pokemon) {
			target.side.removeSideCondition('predator');
		},
		effect: {
			duration: 1,
			onBeforeSwitchOut: function (pokemon) {
				this.debug('Pursuit start');
				let sources = this.effectData.sources;
				this.add('-activate', pokemon, 'move: Pursuit');
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].moveThisTurn || sources[i].fainted) continue;
					this.cancelMove(sources[i]);
					// Run through each decision in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (sources[i].canMegaEvo) {
						for (let j = 0; j < this.queue.length; j++) {
							if (this.queue[j].pokemon === sources[i] && this.queue[j].choice === 'megaEvo') {
								this.runMegaEvo(sources[i]);
								break;
							}
						}
					}
					this.runMove('predator', sources[i], pokemon);
				}
			},
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// Quite Quiet
	retreat: {
		num: -521,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		id: "retreat",
		isViable: true,
		name: "Retreat",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type, move) {
			return 1;
		},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	// Jasmine
	reversetransform: {
		num: -144,
		accuracy: true,
		category: "Status",
		id: "reversetransform",
		name: "Reverse Transform",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onHit: function (target, source) {
			if (!target.transformInto(source, target)) {
				return false;
			}
			target.canMegaEvo = false;
		},
		target: "nomral",
		type: "Normal",
	},
	// Trickster
	sacredspearexplosion: {
		num: -605,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
		id: "sacredspearexplosion",
		isViable: true,
		name: "Sacred Spear Explosion",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Megahorn", target);
			this.add('-anim', target, "Explosion", source);
			this.add('-formechange', target, target.species, ''); //resets sprite after explosion
		},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Steel', type);
		},
		secondary: {chance: 30, status: 'brn'},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	// Legitimate Username
	shellfortress: {
		num: -504,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "shellfortress",
		isViable: true,
		name: "Shell Fortress",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {def:2, spd:2, atk:-4, spa:-4, spe:-4},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// The Immortal
	sleepwalk: {
		num: -214,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "sleepwalk",
		isViable: true,
		name: "Sleep Walk",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Healing Wish", target);
		},
		onHit: function (pokemon) {
			if (pokemon.status !== 'slp') {
				if (pokemon.hp >= pokemon.maxhp) return false;
				if (!pokemon.setStatus('slp')) return false;
				pokemon.statusData.time = 3;
				pokemon.statusData.startTime = 3;
				this.heal(pokemon.maxhp);
				this.add('-status', pokemon, 'slp', '[from] move: Rest');
			}
			let moves = [];
			for (let i = 0; i < pokemon.moveset.length; i++) {
				let move = pokemon.moveset[i].id;
				if (move && move !== 'sleeptalk') moves.push(move);
			}
			let move = '';
			if (moves.length) move = moves[this.random(moves.length)];
			if (!move) return false;
			this.useMove(move, pokemon);
			let activate = false;
			let boosts = {};
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					activate = true;
					boosts[i] = 0;
				}
			}
			if (activate) pokemon.setBoost(boosts);
			if (!pokemon.informed) {
				this.add('c|~The Immortal|I don\'t really sleep walk...');
				pokemon.informed = true;
			}
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// Bummer
	speedpaint: {
		num: -381,
		accuracy: true,
		category: "Status",
		id: "speedpaint",
		name: "Speedpaint",
		pp: 10,
		priority: 1,
		flags: {protect: 1, authentic: 1},
		onTryHit: function (target, pokemon) {
			let decision = this.willMove(target);
			if (decision) {
				let noMeFirst = {
					chatter:1, counter:1, covet:1, focuspunch:1, mefirst:1, metalburst:1, mirrorcoat:1, struggle:1, thief:1, speedpaint: 1,
				};
				let move = this.getMoveCopy(decision.move.id);
				if (!noMeFirst[move]) {
					pokemon.addVolatile('mefirst');
					this.useMove(move, pokemon, target);
					return null;
				}
			}
			return false;
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 4,
			onBasePower: function (basePower) {
				return this.chainModify(1);
			},
		},
		secondary: false,
		pressureTarget: "foeSide",
		target: "normal",
		type: "Normal",
	},
	// Lacuna
	standingfull: {
		num: -223,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		id: "standingfull",
		name: "Standing Full",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onHit: function (target, source) {
			if (target.lastDamage > 0 && source.lastAttackedBy && source.lastAttackedBy.thisTurn && source.lastAttackedBy.pokemon === target) {
				if (this.random(100) < 30) {
					target.addVolatile('confusion');
				}
			} else {
				target.addVolatile('confusion');
			}
		},
		target: "normal",
		type: "Fighting",
	},
	// Solaris Fox
	wonderbark: {
		num: -289,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "wonderbark",
		name: "Wonder Bark",
		pp: 1,
		noPPBoosts: true,
		priority: 3,
		flags: {reflectable: 1, sound: 1},
		volatileStatus: 'flinch',
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", source);
		},
		onHit: function (pokemon, source) {
			this.add('-message', 'You hear a sound echo across the universe. Things seem different now.');
			let newMoves = ['hyperbeam', 'flamethrower', 'freezedry', 'thunderbolt', 'scald', 'gigadrain', 'bugbuzz',
				'darkpulse', 'psychic', 'shadowball', 'flashcannon', 'dragonpulse', 'moonblast', 'focusblast', 'aeroblast',
				'earthpower', 'sludgebomb', 'paleowave', 'bodyslam', 'flareblitz', 'iciclecrash', 'volttackle', 'waterfall',
				'leafblade', 'xscissor', 'knockoff', 'shadowforce', 'ironhead', 'outrage', 'playrough', 'closecombat',
				'bravebird', 'earthquake', 'stoneedge', 'extremespeed', 'stealthrock', 'spikes', 'stickyweb', 'quiverdance',
				'shellsmash', 'dragondance', 'recover', 'toxic', 'willowisp',
			].randomize();
			for (let i = 0; i < pokemon.moveset.length; i++) {
				let moveData = Tools.getMove(newMoves[i]);
				let moveBuffer = {
					move: moveData.name,
					id: moveData.id,
					pp: moveData.pp,
					maxpp: moveData.pp,
					target: moveData.target,
					disabled: false,
					used: false,
				};
				pokemon.moveset[i] = moveBuffer;
				pokemon.baseMoveset[i] = moveBuffer;
				pokemon.moves[i] = toId(moveData.name);
			}
			source.side.hasUsedWonderBark = true;
		},
		onAfterMove: function (pokemon) {
			pokemon.deductPP('wonderbark', 99);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
};
