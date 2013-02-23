/**
 * Gen 1 mechanics were fairly different, so we need to make a lot of changes to battle.js
 * using this.
 */
exports.BattleScripts = {
	gen: 1,
	init: function() {
		// We check for everything that didn't exist back in gen 1 and make it Illegal
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			if (template.gen > 1) template.isNonstandard = true;
			delete template.abilities['DW'];
		}
		for (var i in this.data.Movedex) {
			var move = this.getMove(i);
			if (move.gen > 1) move.isNonstandard = true;
		}
		for (var i in this.data.Abilities) {
			var ability = this.getAbility(i);
			if (ability.gen > 1) ability.isNonstandard = true;
		}
		for (var i in this.data.Items) {
			var item = this.getItem(i);
			if (item.gen > 1) item.isNonstandard = true;
		}
	},
	debug: function(activity) {
		if (this.getFormat().debug) {
			this.add('debug', activity);
		}
	},
	runMove: function(move, pokemon, target, sourceEffect) {
		move = this.getMove(move);
		if (!target) target = this.resolveTarget(pokemon, move);

		this.setActiveMove(move, pokemon, target);

		if (pokemon.movedThisTurn || !this.runEvent('BeforeMove', pokemon, target, move)) {
			this.debug(''+pokemon.id+' move interrupted; movedThisTurn: '+pokemon.movedThisTurn);
			this.clearActiveMove(true);
			return;
		}
		if (move.beforeMoveCallback) {
			if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
				this.clearActiveMove(true);
				return;
			}
		}
		pokemon.lastDamage = 0;
		var lockedMove = this.runEvent('LockMove', pokemon);
		if (lockedMove === true) lockedMove = false;
		if (!lockedMove) pokemon.deductPP(move, null, target);
		this.useMove(move, pokemon, target, sourceEffect);
		this.runEvent('AfterMove', target, pokemon, move);
		this.runEvent('AfterMoveSelf', pokemon, target, move);
		if (target.hp <= 0 && pokemon.volatiles['mustrecharge']) {
			pokemon.removeVolatile('mustrecharge');
		}
	},
	getStat: function(statName, unboosted, unmodified) {
		statName = toId(statName);
		var boost = selfP.boosts[statName];

		if (statName === 'hp') return selfP.maxhp; // please just read .maxhp directly

		// base stat
		var stat = selfP.baseStats[statName];
		stat = Math.floor(Math.floor(2*stat+selfP.set.ivs[statName]+Math.floor(selfP.set.evs[statName]/4))*selfP.level / 100 + 5);

		if (unmodified) return stat;

		// stat modifier effects
		var statTable = {atk:'Atk', def:'Def', spa:'SpA', spd:'SpD', spe:'Spe'};
		stat = this.runEvent('Modify'+statTable[statName], selfP, null, null, stat);
		stat = Math.floor(stat);

		if (unboosted) return stat;

		// stat boosts
		var boostTable = [1,1.5,2,2.5,3,3.5,4];
		if (boost > 6) boost = 6;
		if (boost < -6) boost = -6;
		if (boost >= 0) {
			stat = Math.floor(stat * boostTable[boost]);
		} else {
			stat = Math.floor(stat / boostTable[-boost]);
		}
		
		// Gen 1 caps stats at 999 and min is 1
		if (stat > 999) stat = 999;
		if (stat < 1) stat = 1;

		return stat;
	},
	getDamage: function(pokemon, target, move, suppressMessages) {
		// We get the move
		if (typeof move === 'string') move = this.getMove(move);
		if (typeof move === 'number') move = {
			basePower: move,
			type: '???',
			category: 'Physical'
		};

		// First of all, we test for immunities
		if (move.affectedByImmunities) {
			if (!target.runImmunity(move.type, true)) {
				return false;
			}
		}

		// Is it ok?
		if (move.ohko) {
			if (target.speed > pokemon.speed) {
				this.add('-failed', target);
				return false;
			}
			return target.maxhp;
		}
		
		// We edit the damage through move's damage callback
		if (move.damageCallback) {
			return move.damageCallback.call(this, pokemon, target);
		}
		
		// We take damage from damage=level moves
		if (move.damage === 'level') {
			return pokemon.level;
		}
		
		// If there's a fix move damage, we run it
		if (move.damage) {
			return move.damage;
		}
		
		// Let's check if we are in middle of a partial trap sequence
		if (pokemon.volatiles['partialtrappinglock'] && target !== pokemon) {
			return pokemon.volatiles['partialtrappinglock'].damage;
		}

		// There's no move for some reason, create it
		if (!move) {
			move = {};
		}
		
		// We check the category and typing to calculate later on the damage
		if (!move.category) move.category = 'Physical';
		if (!move.defensiveCategory) move.defensiveCategory = move.category;
		// '???' is typeless damage: used for Struggle and Confusion etc
		if (!move.type) move.type = '???';
		var type = move.type;

		// In Gen 1 category deppends on attacking type
		var specialTypes = {Fire:1, Water:1, Grass:1, Ice:1, Electric:1, Dark:1, Psychic:1, Dragon:1};
		var category = (type in specialTypes)? 'Special' : 'Physical';
		
		// We get the base power and apply basePowerCallback if necessary
		var basePower = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		this.debug(move.name + ', move of type ' + type + ' and ' + category + ' category.');
		
		// We check for Base Power
		if (!basePower) {
			if (basePower === 0) return; // Returning undefined means not dealing damage
			return basePower;
		}
		basePower = clampIntRange(basePower, 1);

		// Checking for the move's Critical Hit ratio
		// First, we check if it's a 100% crit move
		move.critRatio = clampIntRange(move.critRatio, 0, 5);
		var critMult = [0, 16, 8, 4, 3, 2];
		move.crit = move.willCrit || false;
		var critRatio = 0;
		// Otherwise, we calculate the critical hit chance
		if (typeof move.willCrit === 'undefined') {
			// In gen 1, the critical chance is based on speed
			switch (move.critRatio) {
			case 1:
				// Normal crit-rate: BaseSpeed * 100 / 512.
				critRatio = pokemon.baseStats['spe'] * 100 / 512;
				break;
			case 2:
				// High crit-rate: BaseSpeed * 100 / 64
				critRatio = pokemon.baseStats['spe'] * 100 / 64;
				break;
			case -2:
				// Crit rate destroyed by Focus Energy (dumb trainer is dumb)
				critRatio = (pokemon.baseStats['spe'] * 100 / 64) * 0.25;
				this.debug('Using ruined normal crit-rate: (pokemon.baseStats[\'spe\'] * 100 / 64) * 0.25');
				break;
			case -1:
				// High crit move ruined by Focus Energy. Deppends on speed
				if (pokemon.speed > target.speed) {
					// Critical rate not decreased if pokemon is faster than target
					critRatio = pokemon.baseStats['spe'] * 100 / 64;
					this.debug('Using ruined high crit-rate: pokemon.baseStats[\'spe\'] * 100 / 64');
				} else {
					// If you are slower, you can't crit on this moves
					this.debug('Ruined crit rate, too slow, cannnot crit');
					critRatio = false;
				}
				break;
			}
			
			// Last, we check deppending on ratio if the move hits
			if (critRatio) {
				critRatio = critRatio.floor();
				var random = Math.random() * 100;
				move.crit = (random.floor() <= critRatio);
			}
		}
		if (move.crit) {
			move.crit = this.runEvent('CriticalHit', target, null, move);
		}

		// Happens after crit calculation
		if (basePower) {
			basePower = this.runEvent('BasePower', pokemon, target, move, basePower);
			if (move.basePowerModifier) {
				basePower *= move.basePowerModifier;
			}
		}
		if (!basePower) return 0;
		basePower = clampIntRange(basePower, 1);

		// We now check for attacker and defender
		var level = pokemon.level;
		var attacker = pokemon;
		var defender = target;
		if (move.useTargetOffensive) attacker = target;
		if (move.useSourceDefensive) defender = pokemon;
		var atkType = (move.category === 'Physical')? 'atk' : 'spa';
		var defType = (move.defensiveCategory === 'Physical')? 'atk' : 'spa';
		var attack = attacker.getStat(atkType);
		var defense = defender.getStat(defType);

		if (move.crit) {
			move.ignoreNegativeOffensive = true;
			move.ignorePositiveDefensive = true;
		}
		if (move.ignoreNegativeOffensive && attack < attacker.getStat(atkType, true)) {
			move.ignoreOffensive = true;
		}
		if (move.ignoreOffensive) {
			this.debug('Negating (sp)atk boost/penalty.');
			attack = attacker.getStat(atkType, true);
		}
		if (move.ignorePositiveDefensive && defense > target.getStat(defType, true)) {
			move.ignoreDefensive = true;
		}
		if (move.ignoreDefensive) {
			this.debug('Negating (sp)def boost/penalty.');
			defense = target.getStat(defType, true);
		}

		// Gen 1 damage formula: 
		// ((((min(((((2 * L / 5 + 2)*Atk*BP)/max(1, Def))/50), 997) + 2)*Stab)*TypeEffect)/10)*Random/255
		// Where: L: user level, A: current attack, P: move power, D: opponent current defense,
		// S is the Stab modifier, T is the type effectiveness modifier, R is random between 217 and 255
		// The max damage is 999
		var baseDamage = Math.min(Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * attack * basePower / defense) / 50), 997) + 2;

		// Crit damage addition (usually doubling)
		if (move.crit) {
			if (!suppressMessages) this.add('-crit', target);
			baseDamage = this.modify(baseDamage, move.critModifier || 2);
		}
		
		// STAB damage bonus, the "???" type never gets STAB
		if (type !== '???' && pokemon.hasType(type)) {
			baseDamage = Math.floor(baseDamage * 1.5);
		}
		
		// Type effectiveness
		var totalTypeMod = this.getEffectiveness(type, target);
		// Super effective attack
		if (totalTypeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);
			baseDamage *= 2;
			if (totalTypeMod >= 2) {
				baseDamage *= 2;
			}
		}
		
		// Resisted attack
		if (totalTypeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);
			baseDamage = Math.floor(baseDamage / 2);
			if (totalTypeMod <= -2) {
				baseDamage = Math.floor(baseDamage / 2);
			}
		}

		// Randomizer, it's a number between 217 and 255
		var randFactor = Math.floor(Math.random()*39)+217;
		baseDamage *= Math.floor(randFactor * 100 / 255) / 100;
		
		// If damage is less than 1, we return 1
		if (basePower && !Math.floor(baseDamage)) {
			return 1;
		}

		// We are done, this is the final damage
		return Math.floor(baseDamage);
	},
	rollMoveHit: function(target, pokemon, move, spreadHit) {
		var boostTable = [1, 4/3, 5/3, 2, 7/3, 8/3, 3];

		// Not selfdestructs if Substitute is gonna faint
		var targetSub = target.volatiles['substitute'];
		var doSelfDestruct = true;
		var subHp = false;
		if ((typeof targetSub === 'object') && targetSub !== null) {
			var subHp = targetSub.hp;
		}
		
		// Calculate true accuracy
		var accuracy = move.accuracy;
		
		// Partial trapping moves: true accuracy while it lasts
		if (pokemon.volatiles['partialtrappinglock']) {
			accuracy = true;
			
			// We also check current target
			if (!pokemon.volatiles['partialtrappinglock'].target && (target !== pokemon)) {
				pokemon.volatiles['partialtrappinglock'].target = target;
			}
			if (pokemon.volatiles['partialtrappinglock'].target !== target && target !== pokemon) {
				// New target, we reset the move duration
				var roll = this.random(6);
				var duration = [2,2,3,3,4,5][roll];
				pokemon.volatiles['partialtrappinglock'].duration = duration;
				pokemon.volatiles['partialtrappinglock'].target = target;
				
				// TODO: ESTO NO FUNCIONA BIEN
			}
		}
		
		if (accuracy !== true) {
			if (!move.ignoreAccuracy) {
				if (pokemon.boosts.accuracy > 0) {
					accuracy *= boostTable[pokemon.boosts.accuracy];
				} else {
					accuracy /= boostTable[-pokemon.boosts.accuracy];
				}
			}
			if (!move.ignoreEvasion) {
				if (target.boosts.evasion > 0 && !move.ignorePositiveEvasion) {
					accuracy /= boostTable[target.boosts.evasion];
				} else if (target.boosts.evasion < 0) {
					accuracy *= boostTable[-target.boosts.evasion];
				}
			}
		}
		
		// Bypasses accuracy modifiers
		if (move.ohko && !target.volatiles['dig'] && !target.volatiles['fly']) {
			accuracy = 30;
		}
		
		// Bypasses ohko accuracy modifiers
		if (move.alwaysHit) accuracy = true; 
		accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
		
		// Gen 1, 1/256 chance of missing always, no matter what
		if (accuracy !== true && (this.random(100) >= accuracy || this.random(256) === 256)) {
			this.attrLastMove('[miss]');
			this.add('-miss', pokemon, target);
			return false;
		}

		if (move.affectedByImmunities && !target.runImmunity(move.type, true)) {
			return false;
		}

		var damage = 0;
		pokemon.lastDamage = 0;
		if (move.multihit) {
			var hits = move.multihit;
			if (hits.length) {
				// Yes, it's hardcoded... meh
				if (hits[0] === 2 && hits[1] === 5) {
					var roll = this.random(6);
					hits = [2, 2, 3, 3, 4, 5][roll];
				} else {
					hits = this.random(hits[0], hits[1]+1);
				}
			}
			hits = Math.floor(hits);
			// In gen 1, all the hits have the same damage for multihits move
			var moveDamage = 0;
			for (var i=0; i<hits && target.hp && pokemon.hp; i++) {
				if (i === 0) {
					// First hit, we calculate
					moveDamage = this.moveHit(target, pokemon, move);
					var firstDamage = moveDamage;
				} else {
					// We get the previous damage to make it fix damage
					move.damage = firstDamage;
					moveDamage = this.moveHit(target, pokemon, move);
				}
				if (moveDamage === false) break;
				// Damage from each hit is individually counted for the purposes of Counter
				damage = (moveDamage || 0);
			}
			move.damage = null;
			if (i === 0) return true;
			this.add('-hitcount', target, i);
		} else {
			damage = this.moveHit(target, pokemon, move);
		}

		if (move.category !== 'Status') target.gotAttacked(move, damage, pokemon);
		
		// If it's the first hit on a Normal-type partially trap move, it hits Ghosts but damage is 0
		if (move.volatileStatus === 'partiallytrapped' && target.hasType('Ghost')) {
			damage = 0;
		}

		if (!damage && damage !== 0) return false;
		
		// Checking if substitute fainted
		var currentSub = target.volatiles['substitute'];
		if (subHp && (currentSub === undefined || currentSub === null)) {
			doSelfDestruct = false;
		}
		if (move.selfdestruct && doSelfDestruct) {
			this.faint(pokemon, pokemon, move);
		}

		if (!move.negateSecondary) {
			this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
			this.runEvent('AfterMoveSecondary', target, pokemon, move);
		}
		
		// If we used a partial trapping move, we save the damage to repeat it
		if (move.volatileStatus === 'partiallytrapped' && !pokemon.volatiles['partialtrappinglock'].damage) {
			pokemon.volatiles['partialtrappinglock'].damage = damage;
		}

		return damage;
	},
	moveHit: function(target, pokemon, move, moveData, isSecondary, isSelf) {
		var damage = 0;
		move = this.getMoveCopy(move);

		if (!isSecondary && !isSelf) this.setActiveMove(move, pokemon, target);
		var hitResult = true;
		if (!moveData) moveData = move;

		if (typeof move.affectedByImmunities === 'undefined') {
			move.affectedByImmunities = (move.category !== 'Status');
		}
		
		// We get the sub to the target to see if it existed
		var targetSub = target.volatiles['substitute'];
		var targetHadSub = (targetSub !== null && targetSub !== false && (typeof targetSub !== 'undefined'));
		
		// TryHit events:
		//   STEP 1: we see if the move will succeed at all:
		//   - TryHit, TryHitSide, or TryHitField are run on the move,
		//     depending on move target
		//   == primary hit line ==
		//   Everything after this only happens on the primary hit (not on
		//   secondary or self-hits)
		//   STEP 2: we see if anything blocks the move from hitting:
		//   - TryFieldHit is run on the target
		//   STEP 3: we see if anything blocks the move from hitting the target:
		//   - If the move's target is a pokemon, TryHit is run on that pokemon

		// Note:
		//   If the move target is `foeSide`:
		//     event target = pokemon 0 on the target side
		//   If the move target is `allySide` or `all`:
		//     event target = the move user
		//
		//   This is because events can't accept actual sides or fields as
		//   targets. Choosing these event targets ensures that the correct
		//   side or field is hit.
		//
		//   It is the `TryHitField` event handler's responsibility to never
		//   use `target`.
		//   It is the `TryFieldHit` event handler's responsibility to read
		//   move.target and react accordingly.
		//   An exception is `TryHitSide`, which is passed the target side.

		// Note 2:
		//   In case you didn't notice, FieldHit and HitField mean different things.
		//     TryFieldHit - something in the field was hit
		//     TryHitField - our move has a target of 'all' i.e. the field, and hit
		//   This is a VERY important distinction: Every move triggers
		//   TryFieldHit, but only  moves with a target of "all" (e.g.
		//   Haze) trigger TryHitField.

		if (target) {
			if (move.target === 'all' && !isSelf) {
				hitResult = this.singleEvent('TryHitField', moveData, {}, target, pokemon, move);
			} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
				hitResult = this.singleEvent('TryHitSide', moveData, {}, target.side, pokemon, move);
			} else {
				hitResult = this.singleEvent('TryHit', moveData, {}, target, pokemon, move);
			}
			if (!hitResult) {
				if (hitResult === false) this.add('-fail', target);
				return false;
			}
			
			// Only run the hit events for the hit itself, not the secondary or self hits
			if (!isSelf && !isSecondary) {
				if (move.target === 'all') {
					hitResult = this.runEvent('TryHitField', target, pokemon, move);
				} else if (move.target === 'foeSide' || move.target === 'allySide') {
					hitResult = this.runEvent('TryHitSide', target, pokemon, move);
				} else {
					hitResult = this.runEvent('TryHit', target, pokemon, move);
				}
				if (!hitResult) {
					if (hitResult === false) this.add('-fail', target);
					// Special Substitute hit flag
					if (hitResult !== 0) {
						return false;
					}
				}
				if (!this.runEvent('TryFieldHit', target, pokemon, move)) {
					return false;
				}
			} else if (isSecondary && !moveData.self) {
				hitResult = this.runEvent('TrySecondaryHit', target, pokemon, moveData);
			}

			if (hitResult === 0) {
				target = null;
			} else if (!hitResult) {
				if (hitResult === false) this.add('-fail', target);
				return false;
			}
		}

		if (target) {
			var didSomething = false;

			damage = this.getDamage(pokemon, target, moveData);

			// getDamage has several possible return values:
			//
			//   a number:
			//     means that much damage is dealt (0 damage still counts as dealing
			//     damage for the purposes of things like Static)
			//   false:
			//     gives error message: "But it failed!" and move ends
			//   null:
			//     the move ends, with no message (usually, a custom fail message
			//     was already output by an event handler)
			//   undefined:
			//     means no damage is dealt and the move continues
			//
			// basically, these values have the same meanings as they do for event
			// handlers.

			if ((damage || damage === 0) && !target.fainted) {
				if (move.noFaint && damage >= target.hp) {
					damage = target.hp - 1;
				}
				damage = this.damage(damage, target, pokemon, move);
				if (!(damage || damage === 0)) return false;
				didSomething = true;
			} else if (damage === false && typeof hitResult === 'undefined') {
				this.add('-fail', target);
			}
			if (damage === false || damage === null) {
				return false;
			}
			if (moveData.boosts && !target.fainted) {
				this.boost(moveData.boosts, target, pokemon, move);
			}
			if (moveData.heal && !target.fainted) {
				var d = target.heal(Math.round(target.maxhp * moveData.heal[0] / moveData.heal[1]));
				if (!d) {
					this.add('-fail', target);
					return false;
				}
				this.add('-heal', target, target.hpChange(d));
				didSomething = true;
			}
			if (moveData.status) {
				if (!target.status) {
					target.setStatus(moveData.status, pokemon, move);
				} else if (!isSecondary) {
					if (target.status === moveData.status) {
						this.add('-fail', target, target.status);
					} else {
						this.add('-fail', target);
					}
				}
				didSomething = true;
			}
			if (moveData.forceStatus) {
				if (target.setStatus(moveData.forceStatus, pokemon, move)) {
					didSomething = true;
				}
			}
			if (moveData.volatileStatus) {
				if (target.addVolatile(moveData.volatileStatus, pokemon, move)) {
					didSomething = true;
					this.debug('Adding volatileStatus ' + moveData.volatileStatus + ' to ' + pokemon.name);
				}
			}
			if (moveData.sideCondition) {
				if (target.side.addSideCondition(moveData.sideCondition, pokemon, move)) {
					didSomething = true;
				}
			}
			if (moveData.pseudoWeather) {
				if (this.addPseudoWeather(moveData.pseudoWeather, pokemon, move)) {
					didSomething = true;
				}
			}
			// Hit events
			//   These are like the TryHit events, except we don't need a FieldHit event.
			//   Scroll up for the TryHit event documentation, and just ignore the "Try" part. ;)
			if (move.target === 'all' && !isSelf) {
				hitResult = this.singleEvent('HitField', moveData, {}, target, pokemon, move);
			} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
				hitResult = this.singleEvent('HitSide', moveData, {}, target.side, pokemon, move);
			} else {
				hitResult = this.singleEvent('Hit', moveData, {}, target, pokemon, move);
				if (!isSelf && !isSecondary) {
					this.runEvent('Hit', target, pokemon, move);
				}
			}
			if (!hitResult && !didSomething) {
				if (hitResult === false) this.add('-fail', target);
				return false;
			}
		}
		if (target) {
			var targetSub = target.getVolatile('substitute');
			if (targetSub === null) {
				var targetHasSub = false;
			} else {
				var targetHasSub = (targetSub.hp > 0);
			}
		} else {
			var targetHasSub = false;
		}
		
		var doSelf = (targetHadSub && targetHasSub) || !targetHadSub;
		if (moveData.self && doSelf) {
			this.moveHit(pokemon, pokemon, move, moveData.self, isSecondary, true);
		}
		if (moveData.secondaries) {
			var secondaryRoll;
			for (var i = 0; i < moveData.secondaries.length; i++) {
				secondaryRoll = this.random(100);
				if (typeof moveData.secondaries[i].chance === 'undefined' || secondaryRoll < moveData.secondaries[i].chance) {
					this.moveHit(target, pokemon, move, moveData.secondaries[i], true, isSelf);
				}
			}
		}
		if (move.selfSwitch && pokemon.hp) {
			pokemon.switchFlag = move.selfSwitch;
		}
		
		return damage;
	},
	useMove: function(move, pokemon, target, sourceEffect) {
		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
		move = this.getMove(move);
		baseMove = move;
		move = this.getMoveCopy(move);
		if (!target) target = this.resolveTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}
		if (sourceEffect) move.sourceEffect = sourceEffect.id;

		this.setActiveMove(move, pokemon, target);

		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		if (baseMove.target !== move.target) {
			// Target changed in ModifyMove, so we must adjust it here
			target = this.resolveTarget(pokemon, move);
		}
		move = this.runEvent('ModifyMove', pokemon, target, move, move);
		if (baseMove.target !== move.target) {
			// Check again
			target = this.resolveTarget(pokemon, move);
		}
		if (!move) return false;

		var attrs = '';
		var missed = false;
		if (pokemon.fainted) return false;

		if (move.isTwoTurnMove && !pokemon.volatiles[move.id]) {
			attrs = '|[still]'; // Suppress the default move animation
		}

		var movename = move.name;
		if (move.id === 'hiddenpower') movename = 'Hidden Power';
		if (sourceEffect) attrs += '|[from]'+this.getEffect(sourceEffect);
		this.addMove('move', pokemon, movename, target+attrs);

		if (!this.singleEvent('Try', move, null, pokemon, target, move)) {
			return true;
		}
		if (!this.runEvent('TryMove', pokemon, target, move)) {
			return true;
		}

		if (typeof move.affectedByImmunities === 'undefined') {
			move.affectedByImmunities = (move.category !== 'Status');
		}

		var damage = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.moveHit(target, pokemon, move);
		} else {
			if (target.fainted) {
				this.attrLastMove('[notarget]');
				this.add('-notarget');
				return true;
			}
			damage = this.rollMoveHit(target, pokemon, move);
		}

		if (!damage && damage !== 0) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			return true;
		}

		if (!move.negateSecondary) {
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}
		return true;
	},
	heal: function(damage, target, source, effect) {
		if (this.event) {
			if (!target) target = this.event.target;
			if (!source) source = this.event.source;
			if (!effect) effect = this.effect;
		}
		effect = this.getEffect(effect);
		if (damage && damage <= 1) damage = 1;
		damage = Math.floor(damage);
		// for things like Liquid Ooze, the Heal event still happens when nothing is healed.
		damage = this.runEvent('TryHeal', target, source, effect, damage);
		if (!damage) return 0;
		if (!target || !target.hp) return 0;
		if (target.hp >= target.maxhp) return 0;
		damage = target.heal(damage, source, effect);
		switch (effect.id) {
		case 'leechseed':
		case 'rest':
			this.add('-heal', target, target.hpChange(damage), '[silent]');
			break;
		case 'drain':
			this.add('-heal', target, target.hpChange(damage), '[from] drain', '[of] '+source);
			break;
		case 'wish':
			break;
		default:
			if (effect.effectType === 'Move') {
				this.add('-heal', target, target.hpChange(damage));
			} else if (source && source !== target) {
				this.add('-heal', target, target.hpChange(damage), '[from] '+effect.fullname, '[of] '+source);
			} else {
				this.add('-heal', target, target.hpChange(damage), '[from] '+effect.fullname);
			}
			break;
		}
		this.runEvent('Heal', target, source, effect, damage);
		return damage;
	}
};