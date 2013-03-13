exports.BattleMovedex = {
	leechseed: {
		inherit: true,
		accuracy: 100
	},
	gravity: {
		inherit: true,
		effect: {
			duration: 7,
			durationCallback: function(target, source, effect) {
				if (source && source.ability === 'persistent') {
					return 9;
				}
				return 7;
			},
			onStart: function() {
				this.add('-fieldstart', 'move: Gravity');
			},
			onAccuracy: function(accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5/3;
			},
			onModifyPokemonPriority: 100,
			onModifyPokemon: function(pokemon) {
				pokemon.negateImmunity['Ground'] = true;
				var disabledMoves = {bounce:1, fly:1, hijumpkick:1, jumpkick:1, magnetrise:1, skydrop:1, splash:1, telekinesis:1};
				for (var m in disabledMoves) {
					pokemon.disabledMoves[m] = true;
				}
				var applies = false;
				if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly') || pokemon.removeVolatile('skydrop')) {
					applies = true;
					this.cancelMove(pokemon);
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (applies) this.add('-activate', pokemon, 'Gravity');
			},
			onBeforeMove: function(pokemon, target, move) {
				var disabledMoves = {bounce:1, fly:1, hijumpkick:1, jumpkick:1, magnetrise:1, skydrop:1, splash:1, telekinesis:1};
				if (disabledMoves[move.id]) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function() {
				this.add('-fieldend', 'move: Gravity');
			}
		}
	},
	scald: {
		inherit: true,
		accuracy: 50,
		secondary: {
			chance: 100,
			status: 'brn'
		}
	},
	stealthrock: {
		inherit: true,
		effect: {
			// this is a side condition
			onStart: function(side) {
				this.add('-sidestart',side,'move: Stealth Rock');
			},
			onSwitchIn: function(pokemon) {
				var typeMod = this.getEffectiveness('Rock', pokemon);
				var factor = 16;
				if (typeMod == 1) factor = 8;
				if (typeMod >= 2) factor = 4;
				if (typeMod == -1) factor = 32;
				if (typeMod <= -2) factor = 64;
				var damage = this.damage(pokemon.maxhp/factor);
			}
		}
	},
	toxic: {
		inherit: true,
		accuracy: 100
	},
	trickrom: {
		inherit: true,
		effect: {
			duration: 7,
			durationCallback: function(target, source, effect) {
				if (source && source.ability === 'persistent') {
					return 9;
				}
				return 7;
			},
			onStart: function(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] '+source);
			},
			onModifySpePriority: -100,
			onModifySpe: function(spe) {
				// just for fun: Trick Room glitch
				if (spe < 1810) return -spe;
			},
			onResidualOrder: 23,
			onEnd: function() {
				this.add('-fieldend', 'move: Trick Room');
			}
		}
	},
	willowisp: {
		inherit: true,
		accuracy: 100
	}
};