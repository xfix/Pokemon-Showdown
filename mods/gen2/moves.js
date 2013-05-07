/**
 * Gen 2 moves
 */
function clampIntRange(num, min, max) {
	num = Math.floor(num);
	if (num < min) num = min;
	if (typeof max !== 'undefined' && num > max) num = max;
	return num;
}
exports.BattleMovedex = {
	encore: {
		inherit: true,
		isBounceable: false,
		volatileStatus: 'encore',
		effect: {
			durationCallback: function() {
				return this.random(2,6);
			},
			onStart: function(target) {
				var noEncore = {encore:1, mimic:1, mirrormove:1, sketch:1, transform:1};
				var moveIndex = target.moves.indexOf(target.lastMove);
				if (!target.lastMove || noEncore[target.lastMove] || (target.moveset[moveIndex] && target.moveset[moveIndex].pp <= 0)) {
					// it failed
					this.add('-fail',target);
					delete target.volatiles['encore'];
					return;
				}
				this.effectData.move = target.lastMove;
				this.add('-start', target, 'Encore');
				if (!this.willMove(target)) {
					this.effectData.duration++;
				}
			},
			onOverrideDecision: function(pokemon) {
				return this.effectData.move;
			},
			onResidualOrder: 13,
			onResidual: function(target) {
				if (target.moves.indexOf(target.lastMove) >= 0 && target.moveset[target.moves.indexOf(target.lastMove)].pp <= 0) {
					// early termination if you run out of PP
					delete target.volatiles.encore;
					this.add('-end', target, 'Encore');
				}
			},
			onEnd: function(target) {
				this.add('-end', target, 'Encore');
			},
			onModifyPokemon: function(pokemon) {
				if (!this.effectData.move || !pokemon.hasMove(this.effectData.move)) {
					return;
				}
				for (var i=0; i<pokemon.moveset.length; i++) {
					if (pokemon.moveset[i].id !== this.effectData.move) {
						pokemon.moveset[i].disabled = true;
					}
				}
			}
		}
	},
	rest: {
		inherit: true,
		onHit: function(target) {
			if (target.hp >= target.maxhp) return false;
			if (!target.setStatus('slp') && target.status !== 'slp') return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp);
			this.add('-status', target, 'slp', '[from] move: Rest');
		},
		secondary: false
	},
	sleeptalk: {
		inherit: true,
			onHit: function(pokemon) {
				var moves = [];
				for (var i=0; i<pokemon.moveset.length; i++) {
					var move = pokemon.moveset[i].id;
					var NoSleepTalk = {
						bide:1, dig:1, fly:1, metronome:1, mirrormove:1, 
						skullbash:1, skyattack:1, sleeptalk:1, solarbeam:1, razorwind:1
					};
					if (move && !NoSleepTalk[move]) {
						moves.push(move);
					}
				}
				var move = '';
				if (moves.length) move = moves[this.random(moves.length)];
				if (!move) return false;
				this.useMove(move, pokemon);
			}
	},
	spikes: {
		inherit: true,
		effect: {
			// this is a side condition
			onStart: function(side) {
				if (!this.effectData.layers || this.effectData.layers === 0) {
					this.add('-sidestart', side, 'Spikes');
					this.effectData.layers = 1;
				} else {
					return false;
				}
			},
			onSwitchIn: function(pokemon) {
				var side = pokemon.side;
				if (!pokemon.runImmunity('Ground')) return;
				var damageAmounts = [0,3];
				var damage = this.damage(damageAmounts[this.effectData.layers]*pokemon.maxhp/24);
			}
		}
	},
	fakeout: null,
	rage: {
		// todo
		// Rage boosts in Gens 2-4 is for the duration of Rage only
		// Disable does not build
		inherit: true
	},
	magikarpsrevenge: null
};