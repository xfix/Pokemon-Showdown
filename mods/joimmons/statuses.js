function clampIntRange(num, min, max) {
	num = Math.floor(num);
	if (num < min) num = min;
	if (typeof max !== 'undefined' && num > max) num = max;
	return num;
}
exports.BattleStatuses = {
	toxicrain: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'damprock') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('toxic water boost to poison');
				return basePower * 1.5;
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'ToxicRain', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'ToxicRain');
			}
		},
		onAccuracy: function(accuracy, move) {
			if (typeof accuracy !== 'number') return;
			if (move.type === 'Poison') return 100;
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'ToxicRain', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp/16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	}
};
