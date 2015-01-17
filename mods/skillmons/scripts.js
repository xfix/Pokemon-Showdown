exports.BattleScripts = {
	gen: 6,
	// Init function to set things up.
	// It makes all moves to have true accuracy.
	init: function() {
		for (var i in this.data.Movedex) {
			if (typeof this.data.Movedex[i].basePower === 'number' && this.data.Movedex[i].basePower > 0) {
				var accuracy = (this.data.Movedex[i].accuracy === true) ? 100 : this.data.Movedex[i].accuracy;
				var basePower = Math.floor(this.data.Movedex[i].basePower * accuracy / 100);
				if (this.data.Movedex[i].critRatio === 2) basePower *= 1.125;
				if (this.data.Movedex[i].critRatio === 3) basePower *= 1.25;
				this.modData('Movedex', i).basePower = basePower;
			}
			this.modData('Movedex', i).accuracy = true;
		}
	},
	side: {
		points: {
			atk: 0,
			minusatk: 0,
			def: 0,
			minusdef: 0,
			spa: 0,
			minusspa: 0,
			spd: 0,
			minusspd: 0,
			spe: 0,
			minusspe: 0,
			brn: 0,
			par: 0,
			psn: 0,
			tox: 0,
			slp: 0,
			frz: 0,
			flinch: 0,
			confusion: 0
		},
		pnames: {
			atk: 'Attack boost',
			minusatk: 'Attack debuff',
			def: 'Defense boost',
			minusdef: 'Defense debuff',
			spa: 'Special Attack boost',
			minusspa: 'Special Attack debuff',
			spd: 'Special Defense boost',
			minusspd: 'Special Defense debuff',
			spe: 'Speed boost',
			minusspe: 'Speed debuff',
			brn: 'Burn',
			par: 'Paralyze',
			psn: 'Poison',
			tox: 'Badly poisoned',
			slp: 'Sleep status',
			frz: 'Frozen',
			flinch: 'Flinch',
			confusion: 'Confusion'
		}
	},
	// Edit getDamage so there is no crits and no random damage.
	getDamage: function (pokemon, target, move, suppressMessages) {
		if (typeof move === 'string') move = this.getMove(move);

		if (typeof move === 'number') move = {
			basePower: move,
			type: '???',
			category: 'Physical'
		};

		if (move.affectedByImmunities) {
			if (!target.runImmunity(move.type, true)) {
				return false;
			}
		}

		if (move.damageCallback) {
			return move.damageCallback.call(this, pokemon, target);
		}
		if (move.damage === 'level') {
			return pokemon.level;
		}
		if (move.damage) {
			return move.damage;
		}

		if (!move) {
			move = {};
		}
		if (!move.type) move.type = '???';
		var type = move.type;
		// '???' is typeless damage: used for Struggle and Confusion etc
		var category = this.getCategory(move);
		var defensiveCategory = move.defensiveCategory || category;

		var basePower = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		if (!basePower) {
			if (basePower === 0) return; // returning undefined means not dealing damage
			return basePower;
		}
		basePower = this.clampIntRange(basePower, 1);


		basePower = this.runEvent('BasePower', pokemon, target, move, basePower, true);
		if (!basePower) return 0;
		basePower = this.clampIntRange(basePower, 1);

		var level = pokemon.level;

		var attacker = pokemon;
		var defender = target;
		var attackStat = category === 'Physical' ? 'atk' : 'spa';
		var defenseStat = defensiveCategory === 'Physical' ? 'def' : 'spd';
		var statTable = {atk:'Atk', def:'Def', spa:'SpA', spd:'SpD', spe:'Spe'};
		var attack;
		var defense;

		var atkBoosts = move.useTargetOffensive ? defender.boosts[attackStat] : attacker.boosts[attackStat];
		var defBoosts = move.useSourceDefensive ? attacker.boosts[defenseStat] : defender.boosts[defenseStat];

		var ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
		var ignorePositiveDefensive = !!move.ignorePositiveDefensive;

		var ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
		var ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));

		if (ignoreOffensive) {
			this.debug('Negating (sp)atk boost/penalty.');
			atkBoosts = 0;
		}
		if (ignoreDefensive) {
			this.debug('Negating (sp)def boost/penalty.');
			defBoosts = 0;
		}

		if (move.useTargetOffensive) attack = defender.calculateStat(attackStat, atkBoosts);
		else attack = attacker.calculateStat(attackStat, atkBoosts);

		if (move.useSourceDefensive) defense = attacker.calculateStat(defenseStat, defBoosts);
		else defense = defender.calculateStat(defenseStat, defBoosts);

		// Apply Stat Modifiers
		attack = this.runEvent('Modify' + statTable[attackStat], attacker, defender, move, attack);
		defense = this.runEvent('Modify' + statTable[defenseStat], defender, attacker, move, defense);

		//int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
		var baseDamage = Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * basePower * attack / defense) / 50) + 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			var spreadModifier = move.spreadModifier || 0.75;
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}
		// weather modifier (TODO: relocate here)

		// STAB
		if (move.hasSTAB || type !== '???' && pokemon.hasType(type)) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a Missingno.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		// types
		var totalTypeMod = 0;

		if (target.negateImmunity[move.type] !== 'IgnoreEffectiveness' || this.getImmunity(move.type, target)) {
			totalTypeMod = target.runEffectiveness(move);
		}

		totalTypeMod = this.clampIntRange(totalTypeMod, -6, 6);
		if (totalTypeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (var i = 0; i < totalTypeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (totalTypeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (var i = 0; i > totalTypeMod; i--) {
				baseDamage = Math.floor(baseDamage / 2);
			}
		}

		if (basePower && !Math.floor(baseDamage)) {
			return 1;
		}

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		return Math.floor(baseDamage);
	},
	tryMoveHit: function (target, pokemon, move, spreadHit) {
		if (move.selfdestruct && spreadHit) pokemon.hp = 0;

		this.setActiveMove(move, pokemon, target);
		var hitResult = true;

		hitResult = this.singleEvent('PrepareHit', move, {}, target, pokemon, move);
		if (!hitResult) {
			if (hitResult === false) this.add('-fail', target);
			return false;
		}

		this.runEvent('PrepareHit', pokemon, target, move);

		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			if (move.target === 'all') {
				hitResult = this.runEvent('TryHitField', target, pokemon, move);
			} else {
				hitResult = this.runEvent('TryHitSide', target, pokemon, move);
			}
			if (!hitResult) {
				if (hitResult === false) this.add('-fail', target);
				return true;
			}
			return this.moveHit(target, pokemon, move);
		}

		if ((move.affectedByImmunities && !target.runImmunity(move.type, true)) || (move.isSoundBased && (pokemon !== target || this.gen <= 4) && !target.runImmunity('sound', true))) {
			return false;
		}

		if (typeof move.affectedByImmunities === 'undefined') {
			move.affectedByImmunities = (move.category !== 'Status');
		}

		hitResult = this.runEvent('TryHit', target, pokemon, move);
		if (!hitResult) {
			if (hitResult === false) this.add('-fail', target);
			return false;
		}

		var totalDamage = 0;
		var damage = 0;
		pokemon.lastDamage = 0;
		if (move.multihit) {
			var hits = move.multihit;
			hits = Math.floor(hits);
			var nullDamage = true;
			var moveDamage;
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			var isSleepUsable = move.sleepUsable || this.getMove(move.sourceEffect).sleepUsable;
			var i;
			for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
				if (pokemon.status === 'slp' && !isSleepUsable) break;

				moveDamage = this.moveHit(target, pokemon, move);
				if (moveDamage === false) break;
				if (nullDamage && (moveDamage || moveDamage === 0)) nullDamage = false;
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage = (moveDamage || 0);
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				totalDamage += damage;
				this.eachEvent('Update');
			}
			if (i === 0) return true;
			if (nullDamage) damage = false;
			this.add('-hitcount', target, i);
		} else {
			damage = this.moveHit(target, pokemon, move);
			totalDamage = damage;
		}

		if (move.recoil) {
			this.damage(this.clampIntRange(Math.round(totalDamage * move.recoil[0] / move.recoil[1]), 1), pokemon, target, 'recoil');
		}

		if (target && move.category !== 'Status') target.gotAttacked(move, damage, pokemon);

		if (!damage && damage !== 0) return damage;

		if (target && !move.negateSecondary) {
			this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
			this.runEvent('AfterMoveSecondary', target, pokemon, move);
		}
		return damage;
	},
	moveHit: function (target, pokemon, move, moveData, isSecondary, isSelf) {
		var damage;
		move = this.getMoveCopy(move);

		if (!moveData) moveData = move;
		var hitResult = true;

		if (move.target === 'all' && !isSelf) {
			hitResult = this.singleEvent('TryHitField', moveData, {}, target, pokemon, move);
		} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
			hitResult = this.singleEvent('TryHitSide', moveData, {}, target.side, pokemon, move);
		} else if (target) {
			hitResult = this.singleEvent('TryHit', moveData, {}, target, pokemon, move);
		}

		if (target && !isSecondary && !isSelf) {
			hitResult = this.runEvent('TryPrimaryHit', target, pokemon, moveData);
			if (hitResult === 0) {
				// special Substitute flag
				hitResult = true;
				target = null;
			}
		}
		if (target && isSecondary && !moveData.self) {
			hitResult = true;
		}
		if (!hitResult) {
			return false;
		}

		if (target) {
			var didSomething = false;

			damage = this.getDamage(pokemon, target, moveData);

			if ((damage || damage === 0) && !target.fainted) {
				if (move.noFaint && damage >= target.hp) {
					damage = target.hp - 1;
				}
				damage = this.damage(damage, target, pokemon, move);
				if (!(damage || damage === 0)) {
					this.debug('damage interrupted');
					return false;
				}
				didSomething = true;
			}
			if (damage === false || damage === null) {
				if (damage === false) {
					this.add('-fail', target);
				}
				this.debug('damage calculation interrupted');
				return false;
			}

			if (moveData.boosts && !target.fainted) {
				hitResult = this.boost(moveData.boosts, target, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.heal && !target.fainted) {
				var d = target.heal(Math.round(target.maxhp * moveData.heal[0] / moveData.heal[1]));
				if (!d && d !== 0) {
					this.add('-fail', target);
					this.debug('heal interrupted');
					return false;
				}
				this.add('-heal', target, target.getHealth);
				didSomething = true;
			}
			if (moveData.status) {
				if (!target.status) {
					hitResult = target.setStatus(moveData.status, pokemon, move);
					didSomething = didSomething || hitResult;
				} else if (!isSecondary) {
					if (target.status === moveData.status) {
						this.add('-fail', target, target.status);
					} else {
						this.add('-fail', target);
					}
					return false;
				}
			}
			if (moveData.forceStatus) {
				hitResult = target.setStatus(moveData.forceStatus, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.volatileStatus) {
				hitResult = target.addVolatile(moveData.volatileStatus, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.sideCondition) {
				hitResult = target.side.addSideCondition(moveData.sideCondition, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.weather) {
				hitResult = this.setWeather(moveData.weather, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.terrain) {
				hitResult = this.setTerrain(moveData.terrain, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.pseudoWeather) {
				hitResult = this.addPseudoWeather(moveData.pseudoWeather, pokemon, move);
				didSomething = didSomething || hitResult;
			}
			if (moveData.forceSwitch) {
				if (this.canSwitch(target.side)) didSomething = true; // at least defer the fail message to later
			}
			if (moveData.selfSwitch) {
				if (this.canSwitch(pokemon.side)) didSomething = true; // at least defer the fail message to later
			}
			// Hit events
			//   These are like the TryHit events, except we don't need a FieldHit event.
			//   Scroll up for the TryHit event documentation, and just ignore the "Try" part. ;)
			hitResult = null;
			if (move.target === 'all' && !isSelf) {
				if (moveData.onHitField) hitResult = this.singleEvent('HitField', moveData, {}, target, pokemon, move);
			} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
				if (moveData.onHitSide) hitResult = this.singleEvent('HitSide', moveData, {}, target.side, pokemon, move);
			} else {
				if (moveData.onHit) hitResult = this.singleEvent('Hit', moveData, {}, target, pokemon, move);
				if (!isSelf && !isSecondary) {
					this.runEvent('Hit', target, pokemon, move);
				}
				if (moveData.onAfterHit) hitResult = this.singleEvent('AfterHit', moveData, {}, target, pokemon, move);
			}

			if (!hitResult && !didSomething && !moveData.self && !moveData.selfdestruct) {
				if (!isSelf && !isSecondary) {
					if (hitResult === false || didSomething === false) this.add('-fail', target);
				}
				this.debug('move failed because it did nothing');
				return false;
			}
		}
		if (moveData.self) {
			var selfRoll;
			if (!isSecondary && moveData.self.boosts) selfRoll = this.random(100);
			// This is done solely to mimic in-game RNG behaviour. All self drops have a 100% chance of happening but still grab a random number.
			if (typeof moveData.self.chance === 'undefined' || selfRoll < moveData.self.chance) {
				this.moveHit(pokemon, pokemon, move, moveData.self, isSecondary, true);
			}
		}
		if (moveData.secondaries && this.runEvent('TrySecondaryHit', target, pokemon, moveData)) {
			// We gather the effects to apply them.
			for (var i = 0; i < moveData.secondaries.length; i++) {
				var buffDebuff = 'none';
				var points = moveData.secondaries[i].chance;
				var side = moveData.secondaries[i].self ? pokemon.side : target.side;
				var boosts = moveData.secondaries[i].self ? moveData.secondaries[i].self.boosts : moveData.secondaries[i].boosts;
				var status = moveData.secondaries[i].self ? moveData.secondaries[i].self.status : moveData.secondaries[i].status;
				var volatileStatus = moveData.secondaries[i].self ? moveData.secondaries[i].self.volatileStatus : moveData.secondaries[i].volatileStatus;
				var secTarget = moveData.secondaries[i].self ? pokemon : target;
				var messages = [];
				var buffDebuff = 'nothing';
				// If boosts, go through all of them.
				if (boosts) {
					for (var b in boosts) {
						if (b === 'atk') {
							buffDebuff = b;
							if (boosts[b] < 0) buffDebuff = 'minusatk';
							messages.push([points, buffDebuff]);
						}
						if (b === 'def') {
							buffDebuff = b;
							if (boosts[b] < 0) buffDebuff = 'minusdef';
							messages.push([points, buffDebuff]);
						}
						if (b === 'spa') {
							buffDebuff = b;
							if (boosts[b] < 0) buffDebuff = 'minusspa';
							messages.push([points, buffDebuff]);
						}
						if (b === 'spd') {
							buffDebuff = b;
							if (boosts[b] < 0) buffDebuff = 'minusspd';
							messages.push([points, buffDebuff]);
						}
						if (b === 'spe') {
							buffDebuff = b;
							if (boosts[b] < 0) buffDebuff = 'minusspe';
							messages.push([points, buffDebuff]);
						}
					}
				} else if (status) {
					messages.push([points, status]);
				} else if (volatileStatus) {
					messages.push([points, volatileStatus]);
				}

				// After having gathered the effects, add points and trigger them.
				for (var i = 0; i < messages.length; i++) {
					var buffing = messages[i][1];
					var pointsBuff = messages[i][0];
					if (!(buffing in {'par':1, 'brn':1, 'psn':1, 'tox':1, 'slp':1, 'frz':1}) || !secTarget.status) {
						side.points[buffing] += pointsBuff;
						this.add('-message', side.name + ' acquired ' + pointsBuff + ' points in ' + side.pnames[buffing] + ' [Total: ' + side.points[buffing] + ']!');
					}
					if (side.points[buffing] >= 100) {
						side.points[buffing] -= 100;
						this.add('-message', 'A secondary effect on ' + side.pnames[buffing] + ' triggered! [-100 points]');
						this.moveHit(target, pokemon, move, moveData.secondaries[i], true, isSelf);
					}
				}
			}
		}
		if (target && target.hp > 0 && pokemon.hp > 0 && moveData.forceSwitch && this.canSwitch(target.side)) {
			hitResult = this.runEvent('DragOut', target, pokemon, move);
			if (hitResult) {
				target.forceSwitchFlag = true;
			} else if (hitResult === false) {
				this.add('-fail', target);
			}
		}
		if (move.selfSwitch && pokemon.hp) {
			pokemon.switchFlag = move.selfSwitch;
		}
	}
};
