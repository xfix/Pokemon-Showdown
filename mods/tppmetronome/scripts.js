exports.BattleScripts = {
	gen: 6,
	points: function (side, reason, points) {
		side.tppPoints = (side.tppPoints || 0) + points;
		this.add("-message", side.name + " received " + points + " points (" + reason + ").");
	}
};
