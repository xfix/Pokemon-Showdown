exports.BattleMovedex = {
	'fling': {
		inherit: true,
		snowball: false,
		onPrepareHit: function (target, source, move) {
			if (!source.volatiles['fling']) return false;
			var item = this.getItem(source.volatiles['fling'].item);
			this.add("-enditem", source, item.name, '[from] move: Fling');
			if (item.name === 'Snowball') {
				move.snowball = true;
			}
		},
		onAfterMove: function (source, target, move) {
			var sub = false;
			if (target.volatiles['substitute'] && target.volatiles['substitute'].hp > 0) {
				sub = true;
			}
			if (!sub && move.snowball) {
				source.side.snowballs++;
				this.add('-message', "Ding! " + source.side.name + " scored a point!");
				this.add('-message', 'Total Score: ' + source.side.name + ': ' + source.side.snowballs + ', ' + target.side.name + ': ' + target.side.snowballs);
			}
		}
	}
};
