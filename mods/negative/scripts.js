exports.BattleScripts = {
	init: function() {
		for (var i in this.data.Pokedex) {
			if (!i === 'shedinja') this.data.Pokedex[i].baseStats.hp = 160 - this.data.Pokedex[i].baseStats.hp;
			this.data.Pokedex[i].baseStats.atk = 160 - this.data.Pokedex[i].baseStats.atk;
			this.data.Pokedex[i].baseStats.def = 160 - this.data.Pokedex[i].baseStats.def;
			this.data.Pokedex[i].baseStats.spa = 160 - this.data.Pokedex[i].baseStats.spa;
			this.data.Pokedex[i].baseStats.spd = 160 - this.data.Pokedex[i].baseStats.spd;
		}
	}
};