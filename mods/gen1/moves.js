/**
 * All Gen 1 moves have to be updated due to the 1/256 bug on accuracy: 
 * Even 100% accuracy moves had a 1/256 chance of failing.
 * Some moves have had major changes, such as Bite's typing.
 * 
 * -Joim
 */
function clampIntRange(num, min, max) {
	num = Math.floor(num);
	if (num < min) num = min;
	if (typeof max !== 'undefined' && num > max) num = max;
	return num;
}
exports.BattleMovedex = {
	absorb: {
		inherit: true,
		category: "Special",
		pp: 20
	},
	acid: {
		num: 51,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Deals damage to target with a 10% chance to lower its Defense by 1 stage.",
		shortDesc: "10% chance to lower the foe's Defense by 1.",
		id: "acid",
		name: "Acid",
		pp: 30,
		priority: 0,
		secondary: {
			chance: 10,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "Poison"
	},
	acidarmor: {
		inherit: true
	},
	agility: {
		inherit: true
	},
	amnesia: {
		inherit: true,
		desc: "Raises the user's Special by 2 stages.",
		shortDesc: "Boosts the user's Special by 2.",
		boosts: {
			spd: 2,
			spa: 2
		}
	},
	aurorabeam: {
		inherit: true
	},
	barrage: {
		inherit: true
	},
	barrier: {
		inherit: true
	},
	bide: {
		inherit: true,
		desc: "The user spends two to three turns locked into this move and then, on the second turn after using this move, the user attacks the last Pokemon that hit it, inflicting double the damage in HP it lost during the two turns. If the last Pokemon that hit it is no longer on the field, the user attacks a random foe instead. If the user is prevented from moving during this move's use, the effect ends. This move ignores Accuracy and Evasion modifiers and can hit Ghost-types. Makes contact. Priority +1.",
		shortDesc: "Waits 2-3 turns; deals double the damage taken.",
		priority: 0,
		effect: {
			duration: 2,
			onLockMove: 'bide',
			onStart: function(pokemon) {
				this.effectData.totalDamage = 0;
				this.add('-start', pokemon, 'Bide');
			},
			onDamage: function(damage, target, source, move) {
				if (!move || move.effectType !== 'Move') return;
				if (!source || source.side === target.side) return;
				this.effectData.totalDamage += damage;
				this.effectData.sourcePosition = source.position;
				this.effectData.sourceSide = source.side;
			},
			onAfterSetStatus: function(status, pokemon) {
				if (status.id === 'slp') {
					pokemon.removeVolatile('bide');
				}
			},
			onBeforeMove: function(pokemon) {
				if (this.effectData.duration === 1) {
					if (!this.effectData.totalDamage) {
						this.add('-fail', pokemon);
						return false;
					}
					this.add('-end', pokemon, 'Bide');
					var target = this.effectData.sourceSide.active[this.effectData.sourcePosition];
					this.moveHit(target, pokemon, 'bide', {damage: this.effectData.totalDamage*2});
					return false;
				}
				this.add('-message', pokemon.name+' is storing energy! (placeholder)');
				return false;
			}
		},
		type: "???"
	},
	bind: {
		inherit: true,
		accuracy: 75
	},
	bite: {
		inherit: true,
		num: 44,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Deals damage to the target with a 10% chance to flinch it.",
		shortDesc: "10% chance to flinch the target.",
		id: "bite",
		name: "Bite",
		pp: 25,
		priority: 0,
		isContact: true,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		},
		target: "normal",
		type: "Normal"
	},
	blizzard: {
		num: 59,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		desc: "Deals damage to the target and has a 10% chance to freeze it.",
		shortDesc: "10% chance to freeze the foe.",
		id: "blizzard",
		isViable: true,
		name: "Blizzard",
		pp: 5,
		priority: 0,
		secondary: {
			chance: 10,
			status: 'frz'
		},
		target: "normal",
		type: "Ice"
	},
	bodyslam: {
		inherit: true
	},
	boneclub: {
		inherit: true
	},
	bonemerang: {
		inherit: true
	},
	bubble: {
		inherit: true,
		target: "normal"
	},
	bubblebeam: {
		inherit: true
	},
	clamp: {
		inherit: true,
		category: "Special",
		accuracy: 75,
		pp: 10
	},
	cometpunch: {
		inherit: true
	},
	confuseray: {
		inherit: true
	},
	confusion: {
		inherit: true
	},
	constrict: {
		inherit: true
	},
	conversion: {
		inherit: true,
		volatileStatus: 'conversion',	
		effect: {
			onStart: function(pokemon) {
				var possibleTypes = pokemon.moveset.map(function(val){
					var move = this.getMove(val.id);
					var noConversion = {conversion:1, curse:1};
					if (!noConversion[move.id] && !pokemon.hasType(move.type)) {
						return move.type;
					}
				}, this).compact();
				if (!possibleTypes.length) {
					this.add('-fail', pokemon);
					return false;
				}
				this.effectData.type = possibleTypes[this.random(possibleTypes.length)];
				this.add('-start', pokemon, 'typechange', this.effectData.type);
			},
			onRestart: function(pokemon) {
				var possibleTypes = pokemon.moveset.map(function(val){
					var move = this.getMove(val.id);
					if (move.id !== 'conversion' && !pokemon.hasType(move.type)) {
						return move.type;
					}
				}, this).compact();
				if (!possibleTypes.length) {
					this.add('-fail', pokemon);
					return false;
				}
				this.effectData.type = possibleTypes[this.random(possibleTypes.length)];
				this.add('-start', pokemon, 'typechange', this.effectData.type);
			},
			onModifyPokemon: function(pokemon) {
				pokemon.types = [this.effectData.type];
			}
		}
	},
	counter: {
		inherit: true,
		damageCallback: function(pokemon) {
			if (pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && (this.getMove(pokemon.lastAttackedBy.move).category === 'Physical' || this.getmove(pokemon.lastAttackedBy.move).id === 'hiddenpower')) {
				return 2 * pokemon.lastAttackedBy.damage;
			}
			this.add('-fail',pokemon.id);
			return false;
		}
	},
	crabhammer: {
		inherit: true,
		category: "Special",
		accuracy: 85
	},
	cut: {
		inherit: true
	},
	defensecurl: {
		inherit: true
	},
	dig: {
		inherit: true,
		desc: "Deals damage to one target. This attack charges on the first turn and strikes on the second. On the first turn, the user avoids all attacks other than Earthquake and Magnitude but takes double damage from them, and is also unaffected by Hail and Sandstorm damage. The user cannot make a move between turns. If the user is holding a Power Herb, the move completes in one turn. Makes contact. (Field: Can be used to escape a cave quickly.)",
		shortDesc: "Digs underground turn 1, strikes turn 2.",
		onTry: function(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender)) {
				this.add('-anim', attacker, move.name, defender);
				return;
			}
			attacker.addVolatile(move.id, defender);
			return null;
		},
		effect: {
			duration: 2,
			onLockMove: 'dig',
			onAccuracy: function(accuracy, target, source, move) {
				if (move.id === 'swift') return true;
				this.add('-message', 'The foe ' + target.name + ' can\'t be hit underground!');
				return null;
			},
			onDamage: function(damage, target, source, move) {
				if (!move || move.effectType !== 'Move') return;
				if (!source) return;
				if (move.id === 'earthquake') {
					this.add('-message', 'The foe ' + target.name + ' can\'t be hit underground!');
					return null;
				}
			}
		}
	},
	disable: {
		inherit: true,
		accuracy: 55,
		desc: "The target cannot choose its last move for 4-7 turns. Disable only works on one move at a time and fails if the target has not yet used a move or if its move has run out of PP. The target does nothing if it is about to use a move that becomes disabled.",
		//shortDesc: "",
		isBounceable: false,
		volatileStatus: 'disable',
		effect: {
			durationCallback: function() {
				return this.random(2,6);
			},
			noCopy: true,
			onStart: function(pokemon) {
				if (!this.willMove(pokemon)) {
					this.effectData.duration++;
				}
				if (!pokemon.lastMove) {
					return false;
				}
				var moves = pokemon.moveset;
				for (var i=0; i<moves.length; i++) {
					if (moves[i].id === pokemon.lastMove) {
						if (!moves[i].pp) {
							return false;
						} else {
							this.add('-start', pokemon, 'Disable', moves[i].move);
							this.effectData.move = pokemon.lastMove;
							return;
						}
					}
				}
				return false;
			},
			onEnd: function(pokemon) {
				this.add('-message', pokemon.name+' is no longer disabled! (placeholder)');
			},
			onBeforeMove: function(attacker, defender, move) {
				if (move.id === this.effectData.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onModifyPokemon: function(pokemon) {
				var moves = pokemon.moveset;
				for (var i=0; i<moves.length; i++) {
					if (moves[i].id === this.effectData.move) {
						moves[i].disabled = true;
					}
				}
			}
		}
	},
	dizzypunch: {
		inherit: true,
		desc: "Deals damage to the target.",
		shortDesc: "Deals damage.",
		secondary: null
	},
	doublekick: {
		inherit: true
	},
	doubleteam: {
		inherit: true
	},
	doubleedge: {
		inherit: true,
		basePower: 100,
		desc: "Deals damage to the target. If the target lost HP, the user takes recoil damage equal to 25% that HP, rounded half up, but not less than 1HP.",
		shortDesc: "Has 25% recoil.",
		recoil: [25,100]
	},
	doubleslap: {
		inherit: true,
	},
	dragonrage: {
		inherit: true,
	},
	dreameater: {
		inherit: true,
		desc: "Deals damage to one adjacent target, if it is asleep and does not have a Substitute. The user recovers half of the HP lost by the target, rounded up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		onTryHit: function(target) {
			if (target.status !== 'slp' || target.volatiles['substitute']) {
				this.add('-immune', target.id, '[msg]');
				return null;
			}
		}
	},
	drillpeck: {
		inherit: true
	},
	earthquake: {
		inherit: true
	},
	eggbomb: {
		inherit: true
	},
	ember: {
		inherit: true
	},
	explosion: {
		inherit: true,
		basePower: 340,
		target: "normal"
	},
	fireblast: {
		inherit: true,
		accuracy: 85,
		desc: "Deals damage to the target with a 30% chance to burn it.",
		shortDesc: "30% chance to burn the target.",
		secondary: {
			chance: 30,
			status: 'brn'
		}
	},
	firepunch: {
		inherit: true,
		category: "Special"
	},
	firespin: {
		inherit: true,
		accuracy: 70,
		basePower: 15
	},
	fissure: {
		inherit: true
	},
	flamethrower: {
		inherit: true
	},
	flash: {
		inherit: true,
		target: "normal"
	},
	fly: {
		inherit: true,
		desc: "Deals damage to target. This attack charges on the first turn and strikes on the second. The user cannot make a move between turns. (Field: Can be used to fly to a previously visited area.)",
		shortDesc: "Flies up on first turn, then strikes the next turn.",
		effect: {
			duration: 2,
			onLockMove: 'fly',
			onAccuracy: function(accuracy, target, source, move) {
				if (move.id === 'swift') return true;
				this.add('-message', 'The foe ' + target.name + ' can\'t be hit while flying!');
				return null;
			},
			onDamage: function(damage, target, source, move) {
				if (!move || move.effectType !== 'Move') return;
				if (!source || source.side === target.side) return;
				if (move.id === 'gust' || move.id === 'thunder') {
					this.add('-message', 'The foe ' + target.name + ' can\'t be hit while flying!');
					return null;
				}
			}
		}
	},
	focusenergy: {
		inherit: true,
		desc: "If the attack deals critical hits sometimes, then the chance of its happening is quartered. If a move has a high chance of dealing a critical hit, if the user iis currently faster than the opposing Pokemon its critical hit ratio is not decreased. If it's slower, its chances of dealing a critical hit is cut by 50%. If the user is significantly slower than the opposing Pokemon, then the user will be unable to deal critical hits to the opposing Pokemon.",
		shortDesc: "Reduces the user's chance for a critical hit.",
		id: "focusenergy",
		name: "Focus Energy",
		pp: 30,
		priority: 0,
		isSnatchable: true,
		volatileStatus: 'focusenergy',
		effect: {
			onStart: function(pokemon) {
				this.add('-start',pokemon,'move: Focus Energy');
			},
			onModifyMove: function(move) {
				move.critRatio = -3;
			}
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	furyattack: {
		inherit: true
	},
	furyswipes: {
		inherit: true
	},
	glare: {
		inherit: true,
		accuracy: 75,
		affectedByImmunities: false
	},
	growl: {
		inherit: true,
		target: "normal"
	},
	growth: {
		inherit: true,
		desc: "Raises the user's Special by 1 stage.",
		shortDesc: "Boosts the user's Special by 1.",
		onModifyMove: undefined,
		boosts: {
			spa: 1,
			spd: 1
		}
	},
	guillotine: {
		inherit: true
	},
	gust: {
		inherit: true,
		category: "Physical",
		type: "Normal"
	},
	harden: {
		inherit: true
	},
	haze: {
		inherit: true,
		desc: "Eliminates any stat stage changes and status from all active Pokemon.",
		shortDesc: "Eliminates all stat changes and status.",
		onHitField: function() {
			this.add('-clearallboost');
			for (var i=0; i<this.sides.length; i++) {
				for (var j=0; j<this.sides[i].active.length; j++) {
					this.sides[i].active[j].clearBoosts();
				}
			}
			// TODO: add status clearing
		}
	},
	headbutt: {
		inherit: true
	},
	hijumpkick: {
		inherit: true,
		basePower: 130,
		desc: "If this attack misses the target, the user takes 1 HP of damage.",
		shortDesc: "User takes 1 HP damage it would have dealt if miss.",
		pp: 20,
		onMoveFail: function(target, source, move) {
			if (target.type !== 'ghost') {
				this.damage(1, source);
			}
		}
	},
	hornattack: {
		inherit: true
	},
	horndrill: {
		inherit: true,
		desc: "Deals damage to one target equal to the target's maximum HP. Ignores accuracy and evasion modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is faster.",
		shortDesc: "OHKOs the target. Fails if user is slower than the target."
	},
	hydropump: {
		inherit: true
	},
	hyperbeam: {
		inherit: true,
		category: "Physical",
		desc: "Deals damage to a target. If this move is successful, the user must recharge on the following turn and cannot make a move, unless the opponent faints or a Substitute is destroyed.",
		shortDesc: "User cannot move next turn unless target or substitute faints.",
		id: "hyperbeam",
		name: "Hyper Beam",
		pp: 5,
		priority: 0,
		self: {
			volatileStatus: 'mustrecharge'
		}
		secondary: false,
		target: "normal",
		type: "Normal"
	},
	hyperfang: {
		inherit: true
	},
	hypnosis: {
		inherit: true,
		accuracy: 60
	},
	icebeam: {
		inherit: true
	},
	icepunch: {
		inherit: true,
		category: "Special"
	},
	jumpkick: {
		inherit: true,
		basePower: 70,
		desc: "If this attack misses the target, the user 1HP of damage.",
		shortDesc: "User takes 1 HP damage if miss.",
		pp: 25,
		onMoveFail: function(target, source, move) {
			this.damage(1, source);
		}
	},
	karatechop: {
		inherit: true,
		type: "Normal"
	},
	kinesis: {
		inherit: true
	},
	leechlife: {
		inherit: true
	},
	leechseed: {
		inherit: true,
		desc: "The Pokemon at the user's position steals 1/8 of one adjacent target's max HP, rounded down, at the end of each turn. Grass-types are unaffected.",
		shortDesc: "1/8 of target's HP is restored to user every turn.",
		id: "leechseed",
		isViable: true,
		name: "Leech Seed",
		pp: 10,
		priority: 0,
		isBounceable: true,
		volatileStatus: 'leechseed',
		affectedByImmunities: true,
		effect: {
			onStart: function(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual: function(pokemon) {
				var target = pokemon.side.foe.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				var damage = this.damage(pokemon.maxhp/8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			}
		},
		onTryHit: function(target) {
			if (target.hasType('Grass')) {
				this.add('-immune', target, '[msg]');
				return null;
			}
		},
		secondary: false,
		target: "normal",
		type: "Grass"
	},
	leer: {
		inherit: true
	},
	lick: {
		inherit: true
	},
	lightscreen: {
		inherit: true,
		desc: "For 5 turns, the user and its party members double their Special Defense. Critical hits ignore this protection. It is removed from the user's side if the user is successfully hit by Haze.",
		shortDesc: "For 5 turns, allies' Sp. Def is 2x.",
		effect: {
			duration: 5,
			onFoeBasePower: function(basePower, attacker, defender, move) {
				if (move.category === 'Special' && defender.side === this.effectData.target) {
					if (!move.crit) {
						// @TODO: Change this to double defense
						this.debug('Light Screen weaken');
						if (attacker.side.active.length > 1) return basePower*2/3;
						return basePower / 2;
					}
				}
			},
			onStart: function(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd: function(side) {
				this.add('-sideend', side, 'move: Light Screen');
			}
		}
	},
	lovelykiss: {
		inherit: true
	},
	lowkick: {
		num: 67,
		accuracy: 90,
		basePower: 50,
	},
	meditate: {
		inherit: true
	},
	megadrain: {
		inherit: true,
		pp: 10
	},
	megakick: {
		inherit: true
	},
	megapunch: {
		inherit: true
	},
	metronome: {
		inherit: true,
		onHit: function(target) {
			var moves = [];
			for (var i in exports.BattleMovedex) {
				var move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				if (move.isNonstandard) continue;
				var noMetronome = {
					metronome:1, struggle:1
				};
				if (!noMetronome[move.id] && move.num <= 165) {
					moves.push(move.id);
				}
			}
			var move = '';
			if (moves.length) move = moves[this.random(moves.length)];
			if (!move) return false;
			this.useMove(move, target);
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	mimic: {
		inherit: true
	},
	minimize: {
		inherit: true
	},
	mirrormove: {
		num: 119,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user uses the last move used by a selected adjacent target. The copied move is used against that target, if possible. Fails if the target has not yet used a move, or the last move used was Acupressure, After You, Aromatherapy, Chatter, Conversion 2, Counter, Curse, Doom Desire, Feint, Final Gambit, Focus Punch, Future Sight, Gravity, Guard Split, Hail, Haze, Heal Bell, Heal Pulse, Helping Hand, Light Screen, Lucky Chant, Me First, Mimic, Mirror Coat, Mist, Mud Sport, Nature Power, Perish Song, Power Split, Psych Up, Quick Guard, Rain Dance, Reflect, Reflect Type, Role Play, Safeguard, Sandstorm, Sketch, Spikes, Spit Up, Stealth Rock, Struggle, Sunny Day, Tailwind, Toxic Spikes, Transform, Water Sport, Wide Guard, or any move that is self-targeting.",
		shortDesc: "User uses the target's last used move against it.",
		id: "mirrormove",
		name: "Mirror Move",
		pp: 20,
		priority: 0,
		isNotProtectable: true,
		onTryHit: function(target) {
			var noMirrorMove = {acupressure:1, afteryou:1, aromatherapy:1, chatter:1, conversion2:1, curse:1, doomdesire:1, feint:1, finalgambit:1, focuspunch:1, futuresight:1, gravity:1, guardsplit:1, hail:1, haze:1, healbell:1, healpulse:1, helpinghand:1, lightscreen:1, luckychant:1, mefirst:1, mimic:1, mirrorcoat:1, mirrormove:1, mist:1, mudsport:1, naturepower:1, perishsong:1, powersplit:1, psychup:1, quickguard:1, raindance:1, reflect:1, reflecttype:1, roleplay:1, safeguard:1, sandstorm:1, sketch:1, spikes:1, spitup:1, stealthrock:1, sunnyday:1, tailwind:1, taunt:1, teeterdance:1, toxicspikes:1, transform:1, watersport:1, wideguard:1};
			if (!target.lastMove || noMirrorMove[target.lastMove] || this.getMove(target.lastMove).target === 'self') {
				return false;
			}
		},
		onHit: function(target, source) {
			this.useMove(this.lastMove, source);
		},
		secondary: false,
		target: "normal",
		type: "Flying"
	},
	mist: {
		inherit: true
	},
	nightshade: {
		inherit: true,
		affectedByImmunities: false
	},
	payday: {
		inherit: true
	},
	peck: {
		inherit: true
	},
	petaldance: {
		inherit: true,
		basePower: 120,
		pp: 20
	},
	pinmissile: {
		inherit: true
	},
	poisongas: {
		inherit: true,
		accuracy: 55,
		category: "Physical",
		target: "normal"
	},
	poisonsting: {
		inherit: true,
		secondary: {
			chance: 20,
			status: 'psn'
		}
	},
	poisonpowder: {
		inherit: true
	},
	pound: {
		inherit: true
	},
	psybeam: {
		inherit: true
	},
	psychic: {
		inherit: true,
		desc: "Deals damage to one target with a 30% chance to lower its Special by 1 stage.",
		shortDesc: "30% chance to lower the target's Special by 1.",
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
				spa: -1
			}
		}
	},
	psywave: {
		inherit: true,
		target: "normal"
	},
	quickattack: {
		inherit: true
	},
	rage: {
		inherit: true
	},
	razorleaf: {
		inherit: true,
		category: "Special",
		target: "normal"
	},
	razorwind: {
		num: 13,
		accuracy: 75,
		basePower: 80,
		category: "Physical",
		desc: "Deals damage to a foe. This attack charges on the first turn and strikes on the second. The user cannot make a move between turns.",
		shortDesc: "Charges, then hits foe turn 2.",
		id: "razorwind",
		name: "Razor Wind",
		pp: 10,
		priority: 0,
		isTwoTurnMove: true,
		onTry: function(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender)) {
				this.add('-anim', attacker, move.name, defender);
				return;
			}
			attacker.addVolatile(move.id, defender);
			return null;
		},
		effect: {
			duration: 2,
			onLockMove: 'razorwind'
		},
		secondary: false,
		target: "normal",
		type: "Normal"
	},
	recover: {
		inherit: true,
		pp: 20,
		// Fail when health is 255 or 511 less than max
		heal: null,
		onHit: function(target) {
			if (target.hp === (target.maxhp - 255) || target.hp === (target.maxhp - 511)) return false;
			target.heal = [1,2];
		}
	},
	reflect: {
		inherit: true,
		desc: "For 5 turns, the user has doubled Defense. Critical hits ignore this protection. It is removed from the user if it is successfully hit by Haze.",
		shortDesc: "For 5 turns, user's Defense is 2x.",
		effect: {
			duration: 5,
			onFoeBasePower: function(basePower, attacker, defender, move) {
				// @TODO: Make this double defense
				if (move.category === 'Physical' && defender.side === this.effectData.target) {
					if (!move.crit && attacker.ability !== 'infiltrator') {
						this.debug('Reflect weaken');
						if (attacker.side.active.length > 1) return basePower*2/3;
						return basePower/2;
					}
				}
			},
			onStart: function(side) {
				this.add('-sidestart',side,'Reflect');
			},
			onResidualOrder: 21,
			onEnd: function(side) {
				this.add('-sideend',side,'Reflect');
			}
		}
	},
	rest: {
		inherit: true,
		onHit: function(target) {
			if (target.hp >= target.maxhp) return false;
			if (!target.setStatus('slp')) return false;
			// Fail glitch when hp is 255/511 less than max
			if (target.hp === (target.maxhp - 255) || target.hp === (target.maxhp - 511)) return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp); // Aeshetic only as the healing happens after you fall asleep in-game
			this.add('-status', target, 'slp', '[from] move: Rest');
		}
	},
	roar: {
		inherit: true,
		desc: "Does nothing.",
		shortDesc: "Does nothing.",
		isViable: false,
		forceSwitch: false
	},
	rockslide: {
		inherit: true,
		desc: "Deals damage to a foe.",
		shortDesc: "Deals damage.",
		secondary: null,
		target: "normal"
	},
	rockthrow: {
		inherit: true
	},
	rollingkick: {
		inherit: true
	},
	sandattack: {
		inherit: true
	},
	scratch: {
		inherit: true
	},
	screech: {
		inherit: true,
		target: "normal"
	},
	seismictoss: {
		inherit: true,
		affectedByImmunities: false
	},
	selfdestruct: {
		inherit: true,
		basePower: 260,
		target: "normal"
	},
	sharpen: {
		inherit: true,
	},
	sing: {
		inherit: true,
		target: "normal"
	},
	skullbash: {
		inherit: true,
		effect: null
	},
	skyattack: {
		inherit: true,
		critRatio: 1
	},
	slam: {
		inherit: true,
	},
	slash: {
		inherit: true,
	},
	sleeppowder: {
		inherit: true,
	},
	sludge: {
		inherit: true,
		category: "Physical"
	},
	smog: {
		inherit: true,
		target: "normal"
	},
	smokescreen: {
		inherit: true,
		target: "normal"
	},
	softboiled: {
		inherit: true,
		// Fail when health is 255 or 511 less than max
		heal: null,
		onHit: function(target) {
			if (target.hp === (target.maxhp - 255) || target.hp === (target.maxhp - 511)) return false;
			target.heal = [1,2];
		}
	},
	solarbeam: {
		inherit: true
	},
	sonicboom: {
		inherit: true,
		category: "Physical"
	},
	spikecannon: {
		inherit: true
	},
	splash: {
		inherit: true
	},
	spore: {
		inherit: true
	},
	stomp: {
		inherit: true,
		basePowerCallback: null,
		desc: "Deals damage to one adjacent target with a 30% chance to flinch it.",
		shortDesc: "30% chance to flinch the target."
	},
	strength: {
		inherit: true
	},
	stringshot: {
		inherit: true,
		target: "normal"
	},
	struggle: {
		num: 165,
		accuracy: true,
		basePower: 50,
		category: "Physical",
		desc: "Deals typeless damage to one adjacent foe at random. If this move was successful, the user loses 1/2 of the damage dealt, rounded half up; the Ability Rock Head does not prevent this. This move can only be used if none of the user's known moves can be selected. Makes contact.",
		shortDesc: "User loses half of the damage dealt as recoil.",
		id: "struggle",
		name: "Struggle",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		isContact: true,
		beforeMoveCallback: function(pokemon) {
			this.add('-message', pokemon.name+' has no moves left! (placeholder)');
		},
		onModifyMove: function(move) {
			move.type = '???';
		},
		recoil: [1,2],
		secondary: false,
		target: "normal",
		type: "Normal"
	},
	stunspore: {
		inherit: true
	},
	submission: {
		inherit: true
	},
	substitute: {
		num: 164,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user takes 1/4 of its maximum HP, rounded down, and puts it into a substitute to take its place in battle. The substitute is removed once enough damage is inflicted on it, or if the user switches out or faints. Until the substitute is broken, it receives damage from all attacks made by other Pokemon and shields the user from poison status and some stat stage changes caused by other Pokemon. The user still takes normal damage from status effects while behind its substitute. If the substitute breaks during a multi-hit attack, the user will take damage from any remaining hits. This move fails if the user already has a substitute.",
		shortDesc: "User takes 1/4 its max HP to put in a Substitute.",
		id: "substitute",
		isViable: true,
		name: "Substitute",
		pp: 10,
		priority: 0,
		isSnatchable: true,
		volatileStatus: 'Substitute',
		onTryHit: function(target) {
			if (target.volatiles['substitute']) {
				this.add('-fail', target, 'move: Substitute');
				return null;
			}
			// We only prevent when hp is less than one quarter.
			// If you use substitute at exactly one quarter, you faint.
			if (target.hp < target.maxhp/4) {
				this.add('-fail', target, 'move: Substitute', '[weak]');
				return null;
			}
		},
		onHit: function(target) {
			// If max HP is 3 or less substitute makes no damage
			if (target.maxhp > 3) {
				this.directDamage(target.maxhp / 4, target, target);
			}
		},
		effect: {
			onStart: function(target) {
				this.add('-start', target, 'Substitute');
				this.effectData.hp = Math.floor(target.maxhp/4);
				delete target.volatiles['partiallytrapped'];
			},
			onTryHitPriority: -1,
			onTryHit: function(target, source, move) {
				if (move.category === 'Status') {
					// In gen 1 it only blocks:
					// poison, confusion, the effect of partial trapping moves, secondary effect confusion, 
					// stat reducing moves and Leech Seed.
					var SubBlocked = {
							leechseed:1, lockon:1, meanlook:1, mindreader:1, nightmare:1
					};
					if (move.status || move.boosts || move.volatileStatus === 'confusion' || SubBlocked[move.id]) {
						return false;
					}
					return;
				}
				var damage = this.getDamage(source, target, move);
				if (!damage) return null;
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) return damage;
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
					source.removeVolatile('mustrecharge');
				} else {
					this.add('-activate', target, 'Substitute', '[damage]');
				}
				if (move.recoil) {
					this.damage(Math.round(damage * move.recoil[0] / move.recoil[1]), source, target, 'recoil');
				}
				// Attacker does not heal from drain if substitute breaks
				if (move.drain && target.volatiles['substitute'].hp > 0) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return 0; // hit
			},
			onEnd: function(target) {
				this.add('-end', target, 'Substitute');
			}
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	superfang: {
		inherit: true
	},
	supersonic: {
		inherit: true,
		target: "normal"
	},
	surf: {
		inherit: true
	},
	swift: {
		inherit: true,
		category: "Physical"
	},
	swordsdance: {
		inherit: true
	},
	tackle: {
		inherit: true,
		accuracy: 95,
		basePower: 35
	},
	tailwhip: {
		inherit: true,
		target: "normal"
	},
	takedown: {
		inherit: true
	},
	teleport: {
		inherit: true
	},
	thrash: {
		inherit: true,
		basePower: 90,
		pp: 20
	},
	thunder: {
		inherit: true,
		secondary: {
			chance: 10,
			status: 'par'
		}
	},
	thunderpunch: {
		inherit: true,
		category: "Special"
	},
	thunderwave: {
		inherit: true,
		onTryHit: function(target) {
			if (target.hasType('Ground')) {
				this.add('-immune', target.id, '[msg]');
				return null;
			}
		}
	},
	thunderbolt: {
		inherit: true
	},
	thundershock: {
		inherit: true
	},
	toxic: {
		inherit: true,
		accuracy: 85
	},
	transform: {
		inherit: true
	},
	triattack: {
		inherit: true,
		category: "Physical",
		secondary: null
	},
	twineedle: {
		inherit: true
	},
	vicegrip: {
		inherit: true
	},
	vinewhip: {
		inherit: true,
		category: "Special",
		pp: 10
	},
	watergun: {
		inherit: true
	},
	waterfall: {
		inherit: true
	},
	whirlwind: {
		inherit: true,
		inherit: true,
		desc: "Does nothing.",
		shortDesc: "Does nothing.",
		isViable: false,
		forceSwitch: false
	},
	wingattack: {
		inherit: true,
		basePower: 35
	},
	withdraw: {
		inherit: true
	},
	wrap: {
		inherit: true,
		accuracy: 85
	},
	magikarpsrevenge: null
};