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
			this.points(side, 'teh urn', 100 * table[side.pokemonLeft];
		} else {
			this.add('tie');
		}
		this.add("-message", this.p1.name + " received " + this.p1.tppPoints + " points.");
		this.add("-message", this.p2.name + " received " + this.p2.tppPoints + " points.");
		this.ended = true;
		this.active = false;
		this.currentRequest = '';
		return true;
	}
};
