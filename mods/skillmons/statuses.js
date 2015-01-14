exports.BattleStatuses = {
	par: {
		inherit: true,
		onBeforeMove: function (pokemon) {}
	},
	slp: {
		inherit: true,
		onStart: function (target) {
			this.add('-status', target, 'slp');
			this.effectData.startTime = 2;
			this.effectData.time = this.effectData.startTime;
		}
	},
	frz: {
		inherit: true,
		onHit: function (target, source, move) {
			if (move.thawsTarget || move.type in {'Fire':1, 'Rock':1, 'Fighting':1, 'Normal':1, 'Ground':1}) {
				target.cureStatus();
			}
		}
	},
	confusion: {
		// this is a volatile status
		onStart: function (target, source, sourceEffect) {
			var result = this.runEvent('TryConfusion', target, source, sourceEffect);
			if (!result) return result;
			this.add('-start', target, 'confusion');
			this.effectData.time = 4;
		},
		onEnd: function (target) {
			this.add('-end', target, 'confusion');
		},
		onModifyDamage: function (damage, source, target, move) {
			pokemon.volatiles.confusion.time--;
			if (!pokemon.volatiles.confusion.time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			this.directDamage(Math.ceil(damage / 2));
			return this.chainModify(0.5);
		}
	},
	partiallytrapped: {
		inherit: true,
		duration: 5,
		durationCallback: function (target, source) {
			if (source.hasItem('gripclaw')) return 8;
			return 5;
		}
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		duration: 2,
		inherit: true,
		onStart: function (target, source, effect) {
			this.effectData.trueDuration = 2;
			this.effectData.move = effect.id;
		},
		onRestart: function () {
			if (this.effectData.trueDuration >= 2) {
				this.effectData.duration = 2;
			}
		}
	},
	stall: {
		// Protect, Detect, Endure counter
		duration: 2,
		counterMax: 256,
		onStart: function () {
			this.effectData.counter = 3;
		},
		onStallMove: function () {
			// this.effectData.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			var counter = this.effectData.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			return (this.random(counter) === 0);
		},
		onRestart: function () {
			if (this.effectData.counter < this.effect.counterMax) {
				this.effectData.counter *= 3;
			}
			this.effectData.duration = 2;
		}
	}
};
