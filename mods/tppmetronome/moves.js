exports.BattleMovedex = {
	aerialace: {
		inherit: true,
		onTryHit: function (target, pokemon) {
			this.points(pokemon.side, 'AERIAL ACE Kreygasm', 10);
		}
	}
}
