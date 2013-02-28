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
	spikes: {
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
	magikarpsrevenge: null
};