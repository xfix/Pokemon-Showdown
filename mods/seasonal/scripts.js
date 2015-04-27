exports.BattleScripts = {
	randomSeasonalMay2015: function (side) {
		var team = [];
		// Teams on this seasonal have: A tank. A healer. A dps. A support. An off-tank. Another dps.
		// We have a pool of them, depending on the team, and give them.
		// If the other team has been chosen, we get its opposing force.
		if (this.seasonal && this.seasonal.side) {
			side = (this.seasonal.side === 'heroes' ? 'evil' : 'heroes');
		} else {
			// First team being generated, pick a side at random.
			side = (Math.random() > 0.5 ? 'heroes' : 'evil');
			this.seasonal = {'side': side};
		}

		if (side === 'heroes') {
			var healers = [].randomize();
			var tanks = [].randomize();
			var supports = [].randomize();
			var dps = [].randomize();
		} else {
			var healers = [].randomize();
			var tanks = [].randomize();
			var supports = [].randomize();
			var dps = [].randomize();
		}

		return team;
	}
};
