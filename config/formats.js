// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// XY Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Battle",
		section: "XY Singles",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Unrated Random Battle",
		section: "XY Singles",

		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['Random Battle']
	},
	{
		name: "OU",
		section: "XY Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite']
	},
	{
		name: "OU (suspect test)",
		section: "XY Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite']
	},
	{
		name: "Ubers",
		section: "XY Singles",

		searchShow: false,
		ruleset: ['Pokemon', 'Standard Ubers', 'Swagger Clause', 'Team Preview'],
		banlist: []
	},
	{
		name: "Ubers (suspect test)",
		section: "XY Singles",

		challengeShow: false,
		ruleset: ['Pokemon', 'Standard Ubers', 'Swagger Clause', 'Team Preview'],
		banlist: []
	},
	{
		name: "UU",
		section: "XY Singles",

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Alakazite', 'Heracronite', 'Gardevoirite', 'Medichamite', 'Drizzle', 'Drought', 'Shadow Tag']
	},
	{
		name: "RU",
		section: "XY Singles",

		searchShow: false,
		ruleset: ['UU'],
		banlist: ['UU', 'BL2']
	},
	{
		name: "RU (suspect test)",
		section: "XY Singles",

		challengeShow: false,
		ruleset: ['UU'],
		banlist: ['UU', 'BL2']
	},
	{
		name: "NU",
		section: "XY Singles",

		ruleset: ['RU'],
		banlist: ['RU', 'BL3']
	},
	{
		name: "LC",
		section: "XY Singles",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Dragon Rage', 'Sonic Boom', 'Swagger', 'LC Uber', 'Gligar', 'Misdreavus']
	},
	{
		name: "LC UU",
		section: "XY Singles",

		searchShow: false,
		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Archen', 'Bellsprout', 'Bunnelby', 'Carvanha', 'Chinchou', 'Clamperl', 'Cottonee', 'Cranidos',
			'Croagunk', 'Diglett', 'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus', 'Gastly', 'Honedge',
			'Houndour', 'Magnemite', 'Meditite', 'Mienfoo', 'Misdreavus', 'Omanyte', 'Onix', 'Pawniard', 'Ponyta', 'Porygon',
			'Riolu', 'Scraggy', 'Shellder', 'Slowpoke', 'Snubbull', 'Spritzee', 'Staryu', 'Taillow', 'Timburr', 'Tirtouga',
			'Trubbish', 'Vullaby', 'Vulpix', 'Zigzagoon'
		]
	},
	{
		name: "XY Battle Spot Singles",
		section: "XY Singles",

		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		banlist: [], // The necessary bans are in Standard GBU
		validateTeam: function (team, format) {
			if (team.length < 3) return ['You must bring at least three Pokémon.'];
		}
	},
	{
		name: "XY Battle Spot Special 5",
		section: "XY Singles",

		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		validateTeam: function (team, format) {
			if (team.length < 6) return ['You must have six Pokémon.'];
			for (var i = 0; i < team.length; i++) {
				var item = toId(team[i].item);
				if (item) return ["Pokémon cannot hold items for the Special format of this season."];
			}
		}
	},
	/*{
		name: "CAP Volkraken Playtest",
		section: "XY Singles",

		ruleset: ['CAP Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Tomohawk', 'Necturna', 'Mollux', 'Aurumoth', 'Malaconda', 'Cawmodore', 'Syclant', 'Revenankh', 'Pyroak', 'Fidgit', 'Stratagem', 'Arghonaut', 'Kitsunoh', 'Cyclohm', 'Colossoil', 'Krilowatt', 'Voodoom']
	},*/
	{
		name: "Custom Game",
		section: "XY Singles",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview']
	},

	// XY Doubles
	///////////////////////////////////////////////////////////////////


	{
		name: "Random Doubles Battle",
		section: "XY Doubles",

		gameType: 'doubles',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Smogon Doubles",
		section: "XY Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Soul Dew', 'Dark Void',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin',
			'Arceus', 'Reshiram', 'Zekrom', 'Kyurem-White', 'Xerneas', 'Yveltal'
		]
	},
	{
		name: "Smogon Doubles Ubers",
		section: "XY Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void']
	},
	{
		name: "Smogon Doubles UU",
		section: "XY Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Smogon Doubles'],
		banlist: ['Abomasnow', 'Aegislash', 'Aerodactyl', 'Amoonguss', 'Aromatisse', 'Azumarill', 'Bisharp', 'Breloom', 'Chandelure', 'Charizard',
			'Conkeldurr', 'Cresselia', 'Dragonite', 'Dusclops', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gardevoir', 'Genesect', 'Gengar',
			'Greninja', 'Gyarados', 'Heatran', 'Hitmontop', 'Infernape', 'Kangaskhan', 'Klefki', 'Kyurem-Black', 'Landorus-Therian', 'Latios',
			'Lucario', 'Mamoswine', 'Manectric', 'Mawile', 'Meowstic', 'Politoed', 'Rotom-Wash', 'Salamence', 'Scizor', 'Scrafty',
			'Shaymin-Sky', 'Sylveon', 'Talonflame', 'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcarona', 'Whimsicott', 'Zapdos'
		]
	},
	{
		name: "XY Battle Spot Doubles",
		section: "XY Doubles",

		gameType: 'doubles',
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
		}
	},
	{
		name: "VGC 2014",
		section: "XY Doubles",

		gameType: 'doubles',
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC', 'Kalos Pokedex'],
		requirePentagon: true,
		banlist: [], // The necessary bans are in Standard GBU
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
		}
	},
	{
		name: "Doubles Challenge Cup",
		section: 'XY Doubles',

		gameType: 'doubles',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},
	{
		name: "Doubles Custom Game",
		section: "XY Doubles",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview']
	},

	// XY Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Triples Battle",
		section: "XY Triples",

		gameType: 'triples',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Smogon Triples",
		section: "XY Triples",

		gameType: 'triples',
		searchShow: false,
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Soul Dew', 'Dark Void',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin',
			'Arceus', 'Reshiram', 'Zekrom', 'Kyurem-White', 'Xerneas', 'Yveltal'
		]
	},
	{
		name: "XY Battle Spot Triples",
		section: "XY Triples",

		gameType: 'triples',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		validateTeam: function (team, format) {
			if (team.length < 6) return ['You must have six Pokémon.'];
		}
	},
	{
		name: "Pikachu Tournamentchu",
		section: "XY Triples",

		gameType: 'triples',
		maxForcedLevel: 30,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview', 'Kalos Pokedex'],
		requirePentagon: true,
		banlist: ['Eviolite'],
		validateTeam: function (team, format) {
			for (var i = 0; i < team.length; i++) {
				if (Tools.getTemplate(team[i]).species === 'Pikachu') return;
			}
			return ['Your team must have Pikachu.'];
		},
		validateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if (!template.evos || template.evos.length === 0) {
				return [set.species + " is banned as it cannot evolve."];
			}
		}
	},
	{
		name: "Triples Challenge Cup",
		section: "XY Triples",

		gameType: 'triples',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},
	{
		name: "Triples Custom Game",
		section: "XY Triples",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview']
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "Metagamiate",
		section: "OM of the Month",
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Gengarite', 'Kangaskhanite', 'Lucarionite', 'Soul Dew',
			'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Kyogre', 'Ho-Oh', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram',
			'Shaymin-Sky', 'Kyurem-White', 'Xerneas', 'Yveltal', 'Zekrom'
		],
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'hiddenpower' && !pokemon.hasAbility(['aerilate', 'pixilate', 'refrigerate'])) {
				var types = pokemon.getTypes();
				if (!types[0] || types[0] === '???') return;
				move.type = types[0];
				move.isMetagamiate = true;
			}
		},
		onBasePowerPriority: 9,
		onBasePower: function(basePower, attacker, defender, move) {
			if (!move.isMetagamiate) return;
			return this.chainModify([0x14CD, 0x1000]);
		}
	},
	{
		name: "[Gen 4] STABmons",
		section: "OM of the Month",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Ignore STAB Moves', 'BrightPowder', 'Soul Dew', 'Belly Drum',
			'Arceus', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Garchomp', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Shaymin-Sky', 'Wobbuffet', 'Wynaut'
		]
	},
	{
		name: "CAP",
		section: "Other Metagames",
		column: 2,

		ruleset: ['CAP Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite']
	},
	{
		name: "Challenge Cup",
		section: "Other Metagames",

		team: 'randomCC',
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},
	{
		name: "Challenge Cup 1-vs-1",
		section: "Other Metagames",

		team: 'randomCC',
		ruleset: ['Pokemon', 'Team Preview 1v1', 'HP Percentage Mod'],
		onBegin: function () {
			this.debug('Cutting down to 1');
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Balanced Hackmons",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'OHKO Clause', 'HP Percentage Mod', 'Ability Clause'],
		banlist: ['Wonder Guard', 'Shadow Tag', 'Arena Trap', 'Pure Power', 'Huge Power', 'Parental Bond']
	},
	{
		name: "1v1",
		section: 'Other Metagames',

		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview 1v1'],
		banlist: ['Focus Sash', 'Kangaskhanite', 'Soul Dew',
			'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom'
		],
		validateTeam: function (team, format) {
			if (team.length > 3) return ['You may only bring up to three Pokémon.'];
		}
	},
	{
		name: "OU Monotype",
		section: "Other Metagames",

		ruleset: ['OU', 'Same Type Clause'],
		banlist: ['Talonflame']
	},
	{
		name: "Tier Shift",
		section: "Other Metagames",

		mod: 'tiershift',
		ruleset: ['OU']
	},
	{
		name: "Almost Any Ability",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities', 'Uber', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Soul Dew',
			'Archeops', 'Kyurem-Black', 'Regigigas', 'Slaking', 'Shedinja + Sturdy', 'Smeargle + Prankster'
		],
		validateSet: function(set) {
			var bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				var template = this.getTemplate(set.species || set.name);
				var legalAbility = false;
				for (var i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pokémon that do not naturally have it.'];
			}
		}
	},
	{
		name: "STABmons",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore STAB Moves', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Soul Dew',
			'Arceus', 'Blaziken', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Porygon-Z', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Sylveon', 'Kyurem-White',
			'Xerneas', 'Yveltal', 'Zekrom']
	},
	{
		name: "Sky Battles",
		section: "Other Metagames",

		validateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if (template.types.indexOf('Flying') === -1 && set.ability !== 'Levitate') {
				return [set.species + " is not a Flying type and does not have the ability Levitate."];
			}
		},
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Iron Ball', 'Pinsirite', 'Soul Dew',
			'Body Slam', 'Bulldoze', 'Dig', 'Dive', 'Earth Power', 'Earthquake', 'Electric Terrain', 'Fire Pledge', 'Fissure', 'Flying Press',
			'Frenzy Plant', 'Geomancy', 'Grass Knot', 'Grass Pledge', 'Grassy Terrain', 'Gravity', 'Heat Crash', 'Heavy Slam', 'Ingrain', "Land's Wrath",
			'Magnitude', 'Mat Block', 'Misty Terrain', 'Mud Sport', 'Muddy Water', 'Rototiller', 'Seismic Toss', 'Slam', 'Smack Down', 'Spikes',
			'Stomp', 'Substitute', 'Surf', 'Toxic Spikes', 'Water Pledge', 'Water Sport',
			'Archen', 'Chatot', 'Delibird', 'Dodrio', 'Doduo', 'Ducklett', "Farfetch'd", 'Fletchling', 'Gastly', 'Gengar',
			'Hawlucha', 'Hoothoot', 'Murkrow', 'Natu', 'Pidgey', 'Pidove', 'Rufflet', 'Shaymin-Sky', 'Spearow', 'Starly',
			'Taillow', 'Vullaby'
		]
	},
	{
		name: "Inverse Battle",
		section: "Other Metagames",

		mod: 'inverse',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Baton Pass Clause', 'Team Preview'],
		banlist: ['Gengarite', 'Kangaskhanite', 'Soul Dew',
			'Arceus', 'Darkrai', 'Deoxys-Attack', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Lugia',
			'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Kyurem-White', 'Xerneas', 'Yveltal', 'Zekrom'
		]
	},
	{
		name: "Hackmons",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'HP Percentage Mod']
	},
	{
		name: "Alphabet Cup",
		section: "Other Metagames",

		searchShow: false,
		ruleset: ['OU'],
		banlist: ['Swoobat'],
		validateTeam: function (team, format) {
			var letters = {};
			var letter = '';
			for (var i = 0; i < team.length; i++) {
				letter = Tools.getTemplate(team[i]).species.slice(0, 1).toUpperCase();
				if (letter in letters) return ['Your team cannot have more that one Pokémon starting with the letter "' + letter + '".'];
				letters[letter] = 1;
			}
		}
	},
	{
		name: "Averagemons",
		section: "Other Metagames",

		mod: 'averagemons',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Baton Pass Clause', 'Team Preview'],
		banlist: ['DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Light Ball', 'Mawilite', 'Medichamite', 'Soul Dew', 'Thick Club', 'Huge Power', 'Pure Power', 'Shedinja', 'Smeargle']
	},
	{
		name: "Middle Cup",
		section: "Other Metagames",

		searchShow: false,
		maxLevel: 50,
		defaultLevel: 50,
		validateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if (!template.evos || template.evos.length === 0 || !template.prevo) {
				return [set.species + " is not the middle Pokémon in an evolution chain."];
			}
		},
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Eviolite']
	},
	{
		name: "[Gen 5] Glitchmons",
		section: "Other Metagames",

		mod: 'gen5',
		searchShow: false,
		mimicGlitch: true,
		ruleset: ['Pokemon', 'Team Preview', 'HP Percentage Mod'],
		banlist: ['Illegal', 'Unreleased']
	},
	{
		name: "Gen-NEXT OU",
		section: "Other Metagames",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber']
	},
	{
		name: "TPP Metronome Normal",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'HP Percentage Mod', 'Species Clause'],
		banlist: ['Wonder Guard', 'Moody', 'Imposter', 'Pickpocket', 'Magician', 'Unnerve'],
		allowNoMoves: true,
		validateSet: function (set) {
			var issues = [];
			var tppMons = {
				// List #1: No Brainers
				// Charmander Line (Abby, Amberzard)
				"Charmander": true, "Charmeleon": true, "Charizard": true,
				// Squirtle Line (Shellock)
				"Squirtle": true, "Wartortle": true, "Blastoise": true,
				// Pidgey Line (Bird Jesus, Brian)
				"Pidgey": true, "Pidgeotto": true, "Pidgeot": true,
				// Rattata Line (Jay Leno, Digrat, Ace)
				"Rattata": true, "Raticate": true,
				// Ekans Line (Diamondback, Xalrons)
				"Ekans": true, "Arbok": true,
				// Sandshrew Line (Flameslash, Shrewgia, Crabslash)
				"Sandshrew": true, "Sandslash": true,
				// Nidoran M Line (King Fonz)
				"Nidoran-M": true, "Nidorino": true, "Nidoking": true,
				// Jigglypuff Line (Isaac)
				"Igglybuff": true, "Jigglypuff": true, "Wigglytuff": true,
				// Zubat Line (Moonbat, Happybat, Master Ball Bat)
				"Zubat": true, "Golbat": true, "Crobat": true,
				// Oddish Line (XCabbage, Cabbage the White)
				"Oddish": true, "Gloom": true, "Vileplume": true, "Bellossom": true,
				// Diglett Line (Diglight)
				"Diglett": true, "Dugtrio": true,
				// Abra Line (Alpha Junky, Domealakazam)
				"Abra": true, "Kadabra": true, "Alakazam": true,
				// Machop Line (Hijinx)
				"Machop": true, "Machoke": true, "Machamp": true,
				// Tentacool Line (Cruella)
				"Tentacool": true, "Tentacruel": true,
				// Goldeen Line (Master Goldeen)
				"Goldeen": true, "Seaking": true,
				// Geodude Line (5'7", Shiny Geodude, Master Geodude)
				"Geodude": true, "Graveler": true, "Golem": true,
				// Farfetch'd (Dux)
				"Farfetch'd": true,
				// Gastly Line (Rick Gastly)
				"Gastly": true, "Haunter": true, "Gengar": true,
				// Onix Line (Solid Snake)
				"Onix": true, "Steelix": true,
				// Drowzee Line (The Keeper, Colonel N)
				"Drowzee": true, "Hypno": true,
				// Hitmonlee (C3KO)
				"Tyrogue": true, "Hitmonlee": true, "Hitmonchan": true, "Hitmontop": true,
				// Smoochum Line (Duke Smoochum/Nikki Minaj, Elsa)
				"Smoochum": true, "Jynx": true,
				// Lapras (Air Jordan)
				"Lapras": true,
				// Eevee Line (ALL EVOLUTIONS OK)
				"Eevee": true, "Vaporeon": true, "Jolteon": true, "Flareon": true, "Espeon": true,
				"Umbreon": true, "Leafeon": true, "Glaceon": true, "Sylveon": true,
				// Omanyte Line (Something about a Helix)
				"Omanyte": true, "Omastar": true,
				// Kabuto Line (Something about a Dome)
				"Kabuto": true, "Kabutops": true,
				// Aerodactyl (Something about Amber)
				"Aerodactyl": true,
				// Zapdos (AA-j)
				"Zapdos": true,
				// Dratini Line (KT)
				"Dratini": true, "Dragonair": true, "Dragonite": true,
				// Mew (Karl Marc)
				"Mew": true,
				// Totodile Line (Lazor Gator)
				"Totodile": true, "Croconaw": true, "Feraligatr": true,
				// Sentret Line (Admiral)
				"Sentret": true, "Furret": true,
				// Hoothoot Line (Dr. Hoot, Shuckie)
				"Hoothoot": true, "Noctowl": true,
				// Spinarak Line (Ariadome)
				"Spinarak": true, "Ariados": true,
				// Togepi Line (Prince Omelette, K.K. Roy)
				"Togepi": true, "Togetic": true, "Togekiss": true,
				// Natu Line (Xarm, The Oracle)
				"Natu": true, "Xatu": true,
				// Marill Line (M4)
				"Azurill": true, "Marill": true, "Azumarill": true,
				// Bonsly Line (Treesus)
				"Bonsly": true, "Sudowoodo": true,
				// Wooper Line (Swagsire, The Wooper Army)
				"Wooper": true, "Quagsire": true,
				// Unown (THE VOICES)
				"Unown": true,
				// Shuckle (Shuck Norris)
				"Shuckle": true,
				// Suicune (Suicune)
				"Suicune": true,
				// Larvitar Line (3G)
				"Larvitar": true, "Pupitar": true, "Tyranitar": true,
				// Treecko Line (President Treecko, AEEEEOPM.J)
				"Treecko": true, "Grovyle": true, "Sceptile": true,
				// Torchic Line (Zexy)
				"Torchic": true, "Combusken": true, "Blaziken": true,
				// Poochyena Line (Mighty Doge)
				"Poochyena": true, "Mightyena": true,
				// Zigzagoon Line (Bill's Zigzagoon)
				"Zigzagoon": true, "Linoone": true,
				// Wurmple Line (G-Man, Mewtifly)
				"Wurmple": true, "Silcoon": true, "Beautifly": true, "Cascoon": true, "Dustox": true,
				// Wingull Line (Bird Cop, X-Wing, Master Wingull)
				"Wingull": true, "Pelipper": true,
				// Surskit Line (Hyperbug)
				"Surskit": true, "Masquerain": true,
				// Slakoth Line (DJ Stalinking, Amberking)
				"Slakoth": true, "Vigoroth": true, "Slaking": true,
				// Nincada Line (Dottie, Zexinja, Digbug)
				"Nincada": true, "Ninjask": true, "Shedinja": true,
				// Makuhita Line (Annie)
				"Makuhita": true, "Hariyama": true,
				// Skitty Line (Meow Zedong/Chairman Meow)
				"Skitty": true, "Delcatty": true,
				// Minun (C3)
				"Minun": true,
				// Absol (Moondoge)
				"Absol": true,
				// Budew Line (Queen Sunbrella)
				"Budew": true, "Roselia": true, "Roserade": true,
				// Trapinch Line (Trumpinch, Trupmrava)
				"Trapinch": true, "Vibrava": true, "Flygon": true,
				// Swablu Line (Altareon)
				"Swablu": true, "Altaria": true,
				// Lileep Line (Lord Root)
				"Lileep": true, "Cradily": true,
				// Anorith Line (Lord Claw)
				"Anorith": true, "Armaldo": true,
				// Groudon (Kenya)
				"Groudon": true,
				// Chimchar Line (Chim-Chan)
				"Chimchar": true, "Monferno": true, "Infernape": true,
				// Bidoof Line (Oreo, Satandoof, Nappaw, Agent 006)
				"Bidoof": true, "Bibarel": true,
				// Shinx Line (Sparkles)
				"Shinx": true, "Luxio": true, "Luxray": true,
				// Riolu Line
				"Riolu": true, "Lucario": true,
				// Shieldon Line (Lord Armor)
				"Shieldon": true, "Bastiodon": true,
				// Cranidos Line (Lord Skull)
				"Cranidos": true, "Rampardos": true,
				// Bronzor Line (Steve, Bronzongers, Suizor)
				"Bronzor": true, "Bronzong": true,
				// Tepig Line (Commander Bacon, Some Pig)
				"Tepig": true, "Pignite": true, "Emboar": true,
				// Purrloin Line (J-Voon, Sidney)
				"Purrloin": true, "Liepard": true,
				// Pansage Line (BBQ)
				"Pansage": true, "Simisage": true,
				// Petilil Line (Lillil)
				"Petilil": true, "Lilligant": true,
				// Pidove Line
				"Pidove": true, "Tranquill": true, "Unfezant": true,
				// Sewaddle Line
				"Sewaddle": true, "Swadloon": true, "Leavanny": true,
				// Blitzle Line
				"Blitzle": true, "Zebstrika": true,
				// Tympole Line
				"Tympole": true, "Palpitoad": true, "Seismitoad": true,
				// Tirtouga Line (Lord Cover)
				"Tirtouga": true, "Carracosta": true,
				// Archen Line (Lord Plume?)
				"Archen": true, "Archeops": true,
				// Deerling Line (Fives)
				"Deerling": true, "Sawsbuck": true,
				// Joltik Line
				"Joltik": true, "Galvantula": true,
				// Druddigon (Dru)
				"Druddigon": true,
				// Zorua Line
				"Zorua": true, "Zoroark": true,
				// Chespin Line (Weskers)
				"Chespin": true, "Quilladin": true, "Chesnaught": true,
				// Hawlucha
				"Hawlucha": true,
				// Honedge Line (Oi!oiswhhve!)
				"Honedge": true, "Doublade": true, "Aegislash": true,

				// List #2: Fringe mons
				// Caterpie Line (Oxxy Ozzworm)
				"Caterpie": true, "Metapod": true, "Butterfree": true,
				// Pikachu Line (Apostrachu, Shiny Pikachu)
				"Pichu": true, "Pikachu": true, "Raichu": true,
				// Poliwag Line (Poliwhirl Kenya Murderer)
				"Poliwag": true, "Poliwhirl": true, "Poliwrath": true, "Politoed": true,
				// Chinchou Line (Shiny Chinchou)
				"Chinchou": true, "Lanturn": true,
				// Qwilfish (Helix Qwilfish)
				"Qwilfish": true,
				// Entei (Entei)
				"Entei": true,
				// Feebas Line (Wallace's Milotic, Cynthia's Milotic)
				"Feebas": true, "Milotic": true,
				// Beldum Line (Lloyd)
				"Beldum": true, "Metang": true, "Metagross": true,
				// Kricketot Line (DELELELELE WHOOOOOOOOP)
				"Kricketot": true, "Kricketune": true,
				// Croagunk Line (Cropatra)
				"Croagunk": true, "Toxicroak": true,
				// Rotom All Forms (Master Rotom)
				"Rotom": true,
				// Giratina (Master of Discord)
				"Giratina": true,
				// Phione (Z33k33's iPhone)
				"Phione": true,
				// Patrat Line
				"Patrat": true, "Watchog": true,
				// Lillipup Line
				"Lillipup": true, "Herdier": true, "Stoutland": true,
				// Venipede Line (GRRRRRR)
				"Venipede": true, "Whirlipede": true, "Scolipede": true,
				// Vullaby Line (Master Vullaby)
				"Vullaby": true, "Mandibuzz": true,
				// Meloetta (all forms)
				"Meloetta": true,
				// Zekrom (Z33krom)
				"Zekrom": true,

				// List #3: Controversial
				// Bulbasaur Line (Bulbasaur's Cry)
				"Bulbasaur": true, "Ivysaur": true, "Venusaur": true,
				// Weedle Line (Worms)
				"Weedle": true, "Kakuna": true, "Beedrill": true,
				// Ponyta Line (AAAAAAAAA)
				"Ponyta": true, "Rapidash": true,
				// Seel Line (Dewgong in the PC)
				"Seel": true, "Dewgong": true,
				// Koffing Line (Weezus)
				"Koffing": true, "Weezing": true,
				// Mareep Line (50 Volts, .' % @ - PVG)
				"Mareep": true, "Flaaffy": true, "Ampharos": true,
				// Hoppip Line (Hitmonpluff)
				"Hoppip": true, "Skiploom": true, "Jumpluff": true,
				// Sneasel Line (Stare Sneasel, bringer of the paradox, Prophet of Claw)
				"Sneasel": true, "Weavile": true,
				// Slugma Line (Aunt Bueno)
				"Slugma": true, "Magcargo": true,
				// Celebi (Celebiq On)
				"Celebi": true,
				// Mudkip Line (Oscar)
				"Mudkip": true, "Marshtomp": true, "Swampert": true,
				// Lotad Line (Wallace's Ludicolo/Ludictrollo)
				"Lotad": true, "Lombre": true, "Ludicolo": true,
				// Seedot Line (Sidney's Shiftroll)
				"Seedot": true, "Nuzleaf": true, "Shiftry": true,
				// Ralts Line (John Ralts, GET KIRLIA, Conquest Gallade)
				"Ralts": true, "Kirlia": true, "Gardevoir": true, "Gallade": true,
				// Shuppet Line (Released Bannettes)
				"Shuppet": true, "Banette": true,
				// Snorunt Line (Glalie Snorlax, Glacia's Glalies)
				"Snorunt": true, "Glalie": true, "Froslass": true,
				// Rayquaza (Where's Rayquaza?, Black Rayquaza)
				"Rayquaza": true,
				// Uxie (Doll + Uxie)
				"Uxie": true,
				// Reshiram (0000M)
				"Reshiram": true,
				// Genesect (Lord Drive)
				"Genesect": true,
				// Dialga (DQ 3 XY K, Dairy Queen)
				"Dialga": true,
				// Basculin (Shiny)
				"Basculin": true,
				// Zygarde (3DS Streamer-senpai)
				"Zygarde": true,

				// List #4: Arceus
				// Arceus (Streamer-senpai)
				"Arceus": true,
				// Xerneas (X-Deer)
				"Xerneas": true
			};
			if (!tppMons[set.species]) {
				issues.push(set.species + " is not TPP-related");
			}
			if (set.item && set.item !== 'Leppa Berry') {
				issues.push(set.species + " doesn't hold Leppa Berry.");
			}
			// Make sure the item is Leppa Berry
			set.item = 'Leppa Berry';
			var metronomeFound = false;
			var recycleFound = false;
			var i;
			var movesLength = set.moves.length;
			for (i = 0; i < movesLength; i++) {
				var move = set.moves[i];
				switch (move) {
				case 'Metronome':
					if (metronomeFound) {
						issues.push(set.species + " cannot have more than one Metronome.");
					}
					metronomeFound = true;
					break;
				case 'Recycle':
					if (recycleFound) {
						issues.push(set.species + " cannot have more than one Recycle.");
					}
					recycleFound = true;
					break;
				default:
					issues.push(set.species + " cannot have " + move);
					break;
				}
			}
			if (!metronomeFound) {
				set.moves.push("Metronome");
			}
			if (!recycleFound) {
				set.moves.push("Recycle");
			}
			var totalEV = 0;
			for (var k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				issues.push(set.species + " has more than 510 total EVs.");
			}
			var template = Tools.getTemplate(set.species);
			var totalBST = 0;
			for (var k in template.baseStats) {
				totalBST += template.baseStats[k];
			}
			if (totalBST > 300) {
				issues.push(set.species + " has more than 300 BST.");
			}
			return issues;
		}
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] OU",
		section: "BW2 Singles",
		column: 3,

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Soul Dew']
	},
	{
		name: "[Gen 5] Ubers",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: []
	},
	{
		name: "[Gen 5] UU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning']
	},
	{
		name: "[Gen 5] RU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning']
	},
	{
		name: "[Gen 5] NU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist']
	},
	{
		name: "[Gen 5] LC",
		section: "BW2 Singles",

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Scyther', 'Sneasel', 'Tangela']
	},
	{
		name: "[Gen 5] GBU Singles",
		section: "BW2 Singles",

		mod: 'gen5',
		validateSet: function (set) {
			if (!set.level || set.level >= 50) set.forcedLevel = 50;
			return [];
		},
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		banlist: ['Sky Drop', 'Dark Void']
	},
	{
		name: "[Gen 5] Custom Game",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview']
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] Smogon Doubles",
		section: 'BW2 Doubles',
		column: 3,

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void', 'Soul Dew', 'Sky Drop',
			'Mewtwo',
			'Lugia',
			'Ho-Oh',
			'Kyogre',
			'Groudon',
			'Rayquaza',
			'Dialga',
			'Palkia',
			'Giratina', 'Giratina-Origin',
			'Arceus',
			'Reshiram',
			'Zekrom',
			'Kyurem-White'
		]
	},
	{
		name: "[Gen 5] GBU Doubles",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Sky Drop', 'Dark Void']
	},
	{
		name: "[Gen 5] Doubles Custom Game",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview']
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 4] OU",
		section: "Past Generations",
		column: 3,

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 4] Ubers",
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus']
	},
	{
		name: "[Gen 4] UU",
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL']
	},
	{
		name: "[Gen 4] LC",
		section: "Past Generations",

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma']
	},
	{
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: []
	},
	{
		name: "[Gen 3] OU (beta)",
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain']
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},
	{
		name: "[Gen 2] OU (beta)",
		section: "Past Generations",

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber',
			'Hypnosis + Perish Song + Mean Look',
			'Hypnosis + Perish Song + Spider Web',
			'Lovely Kiss + Perish Song + Mean Look',
			'Lovely Kiss + Perish Song + Spider Web',
			'Sing + Perish Song + Mean Look',
			'Sing + Perish Song + Spider Web',
			'Sleep Powder + Perish Song + Mean Look',
			'Sleep Powder + Perish Song + Spider Web',
			'Spore + Perish Song + Mean Look',
			'Spore + Perish Song + Spider Web'
		]
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},
	{
		name: "[Gen 1] OU (beta)",
		section: "Past Generations",

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber',
			'Kakuna + Poison Sting + Harden', 'Kakuna + String Shot + Harden',
			'Beedrill + Poison Sting + Harden', 'Beedrill + String Shot + Harden',
			'Nidoking + Fury Attack + Thrash',
			'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp', 'Exeggutor + Stun Spore + Stomp',
			'Eevee + Tackle + Growl',
			'Vaporeon + Tackle + Growl',
			'Jolteon + Tackle + Growl', 'Jolteon + Focus Energy + Thunder Shock',
			'Flareon + Tackle + Growl', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod']
	}

];
