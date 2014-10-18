exports.BattleScripts = {
	win: function win(side) {
		if (this.ended) {
			return false;
		}
		if (side === 'p1' || side === 'p2') {
			side = this[side];
		} else if (side !== this.p1 && side !== this.p2) {
			side = null;
		}

		if (side === this.p1) {
			side = this.p2;
		} else if (side == this.p2) {
			side = this.p1;
		}

		this.winner = side ? side.name : '';

		this.add('');
		if (side) {
			this.add('win', side.name);
		} else {
			this.add('tie');
		}
		this.ended = true;
		this.active = false;
		this.currentRequest = '';
		this.currentRequestDetails = '';
		return true;
	}
}
