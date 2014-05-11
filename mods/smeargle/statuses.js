function residual(pokemon) {
	var original = pokemon.moveset.original || pokemon.moveset;
	pokemon.moveset = [];
	pokemon.moveset.original = original;
	var moves = [];
	for (var i in this.data.Movedex) {
		var move = this.data.Movedex[i];
		if (i !== move.id) continue;
		if (move.isNonstandard) continue;
		var noMetronome = {
			afteryou:1, assist:1, bestow:1, chatter:1, copycat:1, counter:1, covet:1, destinybond:1, detect:1, endure:1, feint:1, focuspunch:1, followme:1, freezeshock:1, helpinghand:1, iceburn:1, mefirst:1, metronome:1, mimic:1, mirrorcoat:1, mirrormove:1, naturepower:1, protect:1, quash:1, quickguard:1, ragepowder:1, relicsong:1, secretsword:1, sketch:1, sleeptalk:1, snatch:1, snarl:1, snore:1, struggle:1, switcheroo:1, technoblast:1, thief:1, transform:1, trick:1, vcreate:1, wideguard:1, diamondstorm:1, steameruption:1, hyperspacehole:1, thousandarrows:1, thousandwaves:1
		};
		if (!noMetronome[move.id]) {
			moves.push(move);
		}
	}
	for (i = 0; i < 4; i++) {
		var random = this.random(moves.length);
		var move = Object.create(moves[random]);
		moves.splice(random, 1);
		move.maxpp = original[0].maxpp;
		move.pp = original[0].pp;
		move.move = move.name;
		pokemon.moveset.push(move);
	}
}

exports.BattleStatuses = {
	smeargle: {
		onSwitchIn: residual,
		onResidual: residual,
		onModifyMove: function (move, pokemon) {
			var pokemonMoves = pokemon.moveset;
			var original = pokemonMoves.original || pokemonMoves;
			if (original[0].pp === 0) {
				original[0].pp -= 1;
			}
			residual.call(this, pokemon);
		},
		onSwitch: function (pokemon) {
			if (pokemon.moveset.original) {
				pokemon.moveset = pokemon.moveset.original;
			}
		}
	}
};
