exports.BattleScripts = {
	gen: 6,
	points: function (side, reason, points) {
		side.tppPoints = (side.tppPoints || 0) + points;
		this.add("-message", side.name + " received " + points + " points (" + reason + ").");
	},
	win: function (side) {
		if (this.ended) {
			return false;
		}
		if (side === 'p1' || side === 'p2') {
			side = this[side];
		} else if (side !== this.p1 && side !== this.p2) {
			side = null;
		}
		this.winner = side ? side.name : '';

		this.add('');
		if (side) {
			this.add('win', side.name);
			var table = [1, 1, 1.1, 1.3, 1.5, 1.7, 2];
			this.points(side, 'teh urn', 100 * table[side.pokemonLeft]);
		} else {
			this.add('tie');
		}
		this.add("-message", this.p1.name + " finished with " + (this.p1.tppPoints || 'no') + " points.");
		this.add("-message", this.p2.name + " finished with " + (this.p2.tppPoints || 'no') + " points.");

		var self = this;
		var pg = require('pg').connect('', function (err, client, done) {
			client.query(
				'SELECT add_points($1, $2);',
				[self.p1.name, Math.round(self.p1.tppPoints) || 0],
				function () {
					client.query(
						'SELECT add_points($1, $2);',
						[self.p2.name, Math.round(self.p2.tppPoints) || 0],
						done
					);
				}
			);
		});

		this.ended = true;
		this.active = false;
		this.currentRequest = '';

		var logidx = 2; // spectator log (no exact HP)
		if (this.ended) {
			// If the battle is finished when /savereplay is used, include
			// exact HP in the replay log.
			logidx = 3;
		}
		var data = this.log.join("\n");
		var datahash = require('crypto').createHash('md5').update(data.replace(/[^(\x20-\x7F)]+/g, '')).digest('hex');

		require('../../loginserver').request('prepreplay', {
			id: this.roomid.substr(7),
			loghash: datahash,
			p1: this.p1.name,
			p2: this.p2.name,
			format: this.format
		}, function (success) {
			console.log(success);
		})
		return true;
	},
	checkFainted: function () {
		function check(a) {
			if (!a) return;
			if (a.fainted || a.volatiles['imprison']) {
				a.switchFlag = true;
			}
		}

		this.p1.active.forEach(check);
		this.p2.active.forEach(check);
	}
};
