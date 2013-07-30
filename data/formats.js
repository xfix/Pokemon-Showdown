exports.BattleFormats = {

	// Standard Metagames
	///////////////////////////////////////////////////////////////////

	ou: {
		name: "OU",
		section: "Standard Metagames",

		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Soul Dew']
	},
	ubers: {
		name: "Ubers",
		section: "Standard Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: []
	},
	uu: {
		name: "UU",
		section: "Standard Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream']
	},
	ru: {
		name: "RU",
		section: "Standard Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass']
	},
	nu: {
		name: "NU",
		section: "Standard Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['RU'],
		banlist: ['RU','BL3']
	},
	lc: {
		name: "LC",
		section: "Standard Metagames",

		effectType: 'Format',
		maxLevel: 5,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Sonicboom', 'Dragon Rage', 'Berry Juice', 'Carvanha', 'Meditite', 'Gligar', 'Scyther', 'Sneasel', 'Tangela', 'Vulpix', 'Yanma', 'Soul Dew']
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	'1v1': {
		name: "1v1",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		onBegin: function() {
			this.p1.pokemon = this.p1.pokemon.slice(0,1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0,1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Focus Sash', 'Soul Dew', 'Memento', 'Explosion', 'Perish Song', 'Destiny Bond', 'Healing Wish', 'Selfdestruct', 'Lunar Dance', 'Final Gambit',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Blaziken', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Darkrai', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Reshiram', 'Zekrom', 'Landorus', 'Kyurem-White'
		]
	},
	'2013globalshowdown': {
		name: "2013 Global Showdown",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		onBegin: function() {
			this.p1.pokemon = this.p1.pokemon.slice(0,3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0,3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Species Clause', 'Item Clause', 'Team Preview GBU'],
		banlist: ['Unreleased', 'Illegal', 'Chatot', 'Sky Drop', 'Dark Void', 'Soul Dew']
	},
	'6movebattlingou': {
		name: "6 Move Battling (OU)",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Six Moves', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Soul Dew']
	},
	abilityexchange: {
		name: "Ability Exchange",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Ability Exchange Pokemon', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Ignore Illegal Abilities', 'Drizzle ++ Swift Swim', 'Soul Dew', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Blaziken', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Manaphy', 'Darkrai', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Excadrill', 'Tornadus-Therian', 'Thundurus', 'Reshiram', 'Zekrom', 'Landorus', 'Kyurem-White', 'Genesect', 'Slaking', 'Regigigas'
		]
	},
	balancedhackmons: {
		name: "Balanced Hackmons",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'OHKO Clause', 'HP Percentage Mod'],
		banlist: ['Wonder Guard', 'Pure Power', 'Huge Power', 'Shadow Tag', 'Arena Trap']
	},
	cap: {
		name: "CAP",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
	 	searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['CAP Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Soul Dew']
	},
	challengecup: {
		name: "Challenge Cup",
		section: "Other Metagames",

		effectType: 'Format',
		team: 'randomCC',
		canUseRandomTeam: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},
	challengecup1v1: {
		name: "Challenge Cup 1v1",
		section: "Other Metagames",

		effectType: 'Format',
		team: 'randomCC',
		canUseRandomTeam: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		ruleset: ['Pokemon', 'Team Preview 1v1', 'HP Percentage Mod'],
		onBegin: function() {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	clearskiesou: {
		name: "Clear Skies (OU)",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU'],
		banlist: ['Drizzle', 'Drought', 'Sand Stream', 'Snow Warning']
	},
	colorchangemeta: {
		name: "Color Change Meta",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		validateSet: function(set) {
			set.ability = 'Color Change';
		},
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Darkrai', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Tornadus-Therian', 'Thundurus', 'Reshiram', 'Zekrom', 'Kyurem-White', 'Genesect'
		]
	},
	customgame: {
		name: "Custom Game",
		section: "Other Metagames",

		effectType: 'Format',
		challengeShow: true,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 1000,
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod']
	},
	customgamepreview: {
		name: "Custom Game (Preview)",
		section: "Other Metagames",

		effectType: 'Format',
		challengeShow: true,
		ruleset: ['Pokemon', 'Team Preview', 'HP Percentage Mod']
	},
	doublescustomgame: {
		name: "Doubles Custom Game",
		section: "Other Metagames",

		effectType: 'Format',
		gameType: 'doubles',
		challengeShow: true,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 1000,
		defaultLevel: 100,
		ruleset: []
	},
	gbusingles: {
		name: "GBU Singles",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		onBegin: function() {
			this.p1.pokemon = this.p1.pokemon.slice(0,3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0,3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Species Clause', 'Item Clause', 'Team Preview GBU'],
		banlist: ['Unreleased', 'Illegal', 'Sky Drop', 'Dark Void', 'Soul Dew',
			'Mewtwo', 'Mew', 'Lugia', 'Ho-Oh', 'Celebi', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Deoxys-Defense',
			'Chatot', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Keldeo', 'Keldeo-Resolute', 'Meloetta', 'Genesect'
		]
	},
	glitchmons: {
		name: "Glitchmons",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Team Preview', 'HP Percentage Mod'],
		banlist: ['Unreleased', 'Illegal'],
		mimicGlitch: true
	},
	gscmodern: {
		name: "GSC Modern",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['GSC Modern Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Mewtwo', 'Lugia', 'Ho-Oh', 'Venusaur', 'Drizzle ++ Swift Swim']
	},
	joimmons: {
		name: "Joimmons",
		section: "Other Metagames",

		mod: 'joimmons',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['CAP Pokemon', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'HP Percentage Mod'],
		banlist: ['Uber', 'Soul Dew']
	},
	lcuu: {
		name: "LC UU",
		section: "Other Metagames",

		effectType: 'Format',
		maxLevel: 5,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Archen', 'Axew', 'Bronzor', 'Chinchou', 'Clamperl', 'Cottonee', 'Cranidos', 'Croagunk', 'Diglett', 'Drifloon', 'Drilbur', 'Dwebble', 'Ferroseed', 'Foongus', 'Frillish', 'Gastly', 'Hippopotas', 'Houndour', 'Koffing', 'Larvesta', 'Lileep', 'Machop', 'Magnemite', 'Mienfoo', 'Misdreavus', 'Munchlax', 'Murkrow', 'Pawniard', 'Ponyta', 'Porygon', 'Riolu', 'Sandshrew', 'Scraggy', 'Shellder', 'Shroomish', 'Slowpoke', 'Snover', 'Staryu', 'Tentacool', 'Timburr', 'Tirtouga']
	},
	monotypeou: {
		name: "Monotype (OU)",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU', 'Same Type Clause'],
		banlist: []
	},
	negativemetagame: {
		name: "Negative Metagame",
		section: "Other Metagames",

		mod: 'negative',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU'],
		banlist: ['Smeargle']
	},
	offstatmetagame: {
		name: "Offstat Metagame",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		rated: true,
		isTeambuilderFormat: true,
		ruleset: ['OU', 'Offstat Pokemon'],
		banlist: ['Stealth Rock', 'Spikes', 'Toxic Spikes', 'Kyurem-Black']
	},
	pu: {
		name: "PU",
		section: "Other Metagames",

		effectType: 'Format',
		challengeShow: true,
		isTeambuilderFormat: true,
		ruleset: ['NU'],
		banlist: ['Charizard', 'Wartortle', 'Kadabra', 'Golem', 'Haunter', 'Exeggutor', 'Weezing', 'Kangaskhan', 'Pinsir', 'Lapras', 'Ampharos', 'Misdreavus', 'Piloswine', 'Miltank', 'Ludicolo', 'Swellow', 'Gardevoir', 'Ninjask', 'Torkoal', 'Cacturne', 'Altaria', 'Armaldo', 'Gorebyss', 'Regirock', 'Regice', 'Bastiodon', 'Floatzel', 'Drifblim', 'Skuntank', 'Lickilicky', 'Probopass', 'Rotom-Fan', 'Samurott', 'Musharna', 'Gurdurr', 'Sawk', 'Carracosta', 'Garbodor', 'Sawsbuck', 'Alomomola', 'Golurk', 'Braviary', 'Electabuzz', 'Electrode', 'Liepard', 'Tangela', 'Eelektross', 'Ditto', 'Seismitoad', 'Zangoose', 'Roselia', 'Serperior', 'Metang', 'Tauros', 'Cradily', 'Primeape', 'Scolipede', 'Jynx', 'Basculin', 'Gigalith', 'Camerupt', 'Golbat']
	},
	purehackmons: {
		name: "Pure Hackmons",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'HP Percentage Mod'],
		banlist: []
	},
	randombattle: {
		name: "Random Battle",
		section: "Other Metagames",

		effectType: 'Format',
		team: 'random',
		canUseRandomTeam: true,
		searchDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	skybattles: {
		name: "Sky Battles",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		validateSet: function(set) {
			var template = this.getTemplate(set.species || set.name);
			if (template.types.indexOf('Flying') === -1 && set.ability !== 'Levitate') {
				return [set.species+" is not a Flying type and does not have the ability Levitate."];
			}
		},
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Drizzle ++ Swift Swim', 'Soul Dew', 'Iron Ball', 'Gravity', 'Smack Down', 'Skill Swap', 'Entrainment', 'Gastro Acid', 'Simple Beam', 'Worry Seed',
			'Lugia', 'Ho-Oh', 'Rayquaza', 'Giratina', 'Giratina-Origin', 'Shaymin-Sky', 'Arceus-Flying', 'Thundurus'
		]
	},
	slowmons: {
		name: "Slowmons",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		onModifySpe: function(spe) {
			return -spe;
		},
		onModifyMove: function(move) {
			if (move.id === 'trickroom') {
				move.effect = {
					duration: 5,
					onStart: function(target, source) {
						this.add('-fieldstart', 'move: Trick Room', '[of] '+source);
					},
					onModifySpePriority: -100,
					onModifySpe: function(spe) {
						return spe;
					},
					onResidualOrder: 23,
					onEnd: function() {
						this.add('-fieldend', 'move: Trick Room');
					}
				};
			}
		},
		ruleset: ['Pokemon', 'Slowmons Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Manaphy', 'Darkrai', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Tornadus-Therian', 'Thundurus', 'Reshiram', 'Zekrom', 'Landorus', 'Kyurem-White', 'Genesect'
		]
	},
	smogondoubles: {
		name: "Smogon Doubles",
		section: "Other Metagames",

		effectType: 'Format',
		gameType: 'doubles',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'HP Percentage Mod'],
		banlist: ['Illegal', 'Sky Drop', 'Dark Void', 'Soul Dew',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Reshiram', 'Zekrom', 'Kyurem-White'
		]
	},
	stabmons: {
		name: "STABmons",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Drizzle ++ Swift Swim', 'Soul Dew',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Blaziken', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Manaphy', 'Darkrai', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Reshiram', 'Zekrom', 'Kyurem-White', 'Genesect'
		]
	},
	statexchange: {
		name: "Stat Exchange",
		section: "Other Metagames",

		mod: 'statexchange',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU'],
		banlist: []
	},
	suicidecup: {
		name: "Suicide Cup",
		section: "Other Metagames",

		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		rated: true,
		isTeambuilderFormat: true,
		ruleset: ['OU', 'Suicide Pokemon'],
		banlist: ['Shedinja', 'Self-Destruct', 'Explosion', 'Memento', 'Final Gambit', 'Healing Wish', 'Heal Pulse', 'Lunar Dance', 'Dream Eater', 'Snore', 'Frustration', 'Return', 'Fake Out', 'Natural Gift', 'Magic Room']
	},
	technicimons: {
		name: "TechniciMons",
		section: "Other Metagames",

		mod: 'technicimons',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'TechniciMons Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Drizzle ++ Swift Swim', 'Soul Dew', 'Heat Crash', 'Heavy Slam',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Darkrai', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Reshiram', 'Zekrom', 'Kyurem-White'
		]
	},
	tiershift: {
		name: "Tier Shift",
		section: "Other Metagames",

		mod: 'tiershift',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU'],
		banlist: []
	},
	triplesdev: {
		name: "Triples (Dev)",
		section: "Other Metagames",
		
		effectType: 'Format',
		gameType: 'triples',
		rated: true,
		challengeShow: true,
		//searchShow: true,
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Sky Drop', 'Dark Void', 'Soul Dew',
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Reshiram', 'Zekrom', 'Kyurem-White'
		]
	},
	typechartswap: {
		name: "Type Chart Swap",
		section: "Other Metagames",

		mod: 'typechartswap',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU'],
		banlist: []
	},
	vgc2013doubles: {
		name: "VGC 2013 (Doubles)",
		section: "Other Metagames",

		effectType: 'Format',
		gameType: 'doubles',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		onBegin: function() {
			this.p1.pokemon = this.p1.pokemon.slice(0,4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0,4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Team Preview VGC', 'Species Clause', 'Item Clause'],
		banlist: ['Illegal', 'Sky Drop', 'Dark Void', 'Soul Dew',
			'Mewtwo', 'Mew', 'Lugia', 'Ho-Oh', 'Celebi', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Deoxys-Defense',
			'Chatot', 'Dialga', 'Palkia', 'Giratina', 'Giratina-Origin', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Shaymin-Sky',
			'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Keldeo', 'Keldeo-Resolute', 'Meloetta', 'Genesect'
		]
	},
	wonkymons: {
		name: "Wonkymons",
		section: "Other Metagames",

		mod: 'wonkymons',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['OU'],
		banlist: ['Elekid ++ Wonder Guard']
	},

	// Seasonals
	///////////////////////////////////////////////////////////////////

	seasonsgreetings: {
		name: "Season's Greetings",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonal',
		canUseRandomTeam: true,
		challengeShow: true,
		ruleset: ['Random Battle']
	},
	winterwonderland: {
		name: "Winter Wonderland",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonalWW',
		canUseRandomTeam: true,
		challengeShow: true,
		onBegin: function() {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyMove: function(move) {
			if (move.id === 'present') {
				move.category = 'Status';
				move.basePower = 0;
				delete move.heal;
				move.accuracy = 100;
				switch (this.random(20)) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					move.onTryHit = function() {
						this.add('-message', 'The present was a bomb!');
					};
					move.category = 'Physical';
					move.basePower = 200;
					break;
				case 5:
					move.onTryHit = function() {
						this.add('-message', 'The present was confusion!');
					};
					move.volatileStatus = 'confusion';
					break;
				case 6:
					move.onTryHit = function() {
						this.add('-message', 'The present was Disable!');
					};
					move.volatileStatus = 'disable';
					break;
				case 7:
					move.onTryHit = function() {
						this.add('-message', 'The present was a taunt!');
					};
					move.volatileStatus = 'taunt';
					break;
				case 8:
					move.onTryHit = function() {
						this.add('-message', 'The present was some seeds!');
					};
					move.volatileStatus = 'leechseed';
					break;
				case 9:
					move.onTryHit = function() {
						this.add('-message', 'The present was an embargo!');
					};
					move.volatileStatus = 'embargo';
					break;
				case 10:
					move.onTryHit = function() {
						this.add('-message', 'The present was a music box!');
					};
					move.volatileStatus = 'perishsong';
					break;
				case 11:
					move.onTryHit = function() {
						this.add('-message', 'The present was a curse!');
					};
					move.volatileStatus = 'curse';
					break;
				case 12:
					move.onTryHit = function() {
						this.add('-message', 'The present was Torment!');
					};
					move.volatileStatus = 'torment';
					break;
				case 13:
					move.onTryHit = function() {
						this.add('-message', 'The present was a trap!');
					};
					move.volatileStatus = 'partiallytrapped';
					break;
				case 14:
					move.onTryHit = function() {
						this.add('-message', 'The present was a root!');
					};
					move.volatileStatus = 'ingrain';
					break;
				case 15:
				case 16:
				case 17:
					move.onTryHit = function() {
						this.add('-message', 'The present was a makeover!');
					};
					var boosts = {};
					var possibleBoosts = ['atk','def','spa','spd','spe','accuracy'].randomize();
					boosts[possibleBoosts[0]] = 1;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
					move.boosts = boosts;
					break;
				case 18:
					move.onTryHit = function() {
						this.add('-message', 'The present was psychic powers!');
					};
					move.volatileStatus = 'telekinesis';
					break;
				case 19:
					move.onTryHit = function() {
						this.add('-message', 'The present was fatigue!');
					};
					move.volatileStatus = 'mustrecharge';
					break;
				}
			}
		},
		ruleset: ['Random Battle']
	},
	valentineventure: {
		name: "Valentine Venture",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonalVV',
		gameType: 'Doubles',
		canUseRandomTeam: true,
		challengeShow: true,
		ruleset: ['Random Battle']
	},
	springforward: {
		name: "Spring Forward",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonalSF',
		canUseRandomTeam: true,
		challengeShow: true,
		onBegin: function() {
			if (this.random(100) < 75) {
				this.add('-message', 'March and April showers bring May flowers...');
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
			}
			this.p1.pokemon = this.p1.pokemon.slice(0,3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0,3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		onSwitchIn: function(pokemon) {
			var greenPokemon = {
				bulbasaur:1, ivysaur:1, venusaur:1, caterpie:1, metapod:1, bellsprout:1, weepinbell:1, victreebel:1, scyther:1,
				chikorita:1, bayleef:1, meganium:1, spinarak:1, natu:1, xatu:1, bellossom:1, politoed:1, skiploom:1, lavitar:1, 
				tyranitar:1, celebi:1, treecko:1, grovyle:1, sceptile:1, dustox:1, lotad:1, lombre:1, ludicolo:1, breloom:1, 
				electrike:1, roselia:1, gulpin:1, vibrava:1, flygon:1, cacnea:1, cacturne:1, cradily:1, keckleon:1, tropius:1, 
				rayquaza:1, turtwig:1, grotle:1, torterra:1, budew:1, roserade:1, carnivine:1, yanmega:1, leafeon:1, shaymin:1, 
				shayminsky:1, snivy:1, servine:1, serperior:1, pansage:1, simisage:1, swadloon:1, cottonee:1, whimsicott:1, 
				petilil:1, lilligant:1, basculin:1, maractus:1, trubbish:1, garbodor:1, solosis:1, duosion:1, reuniclus:1, 
				axew:1, fraxure:1, golett:1, golurk:1, virizion:1, tornadus:1, tornadustherian:1, burmy:1, 
				kakuna:1, beedrill:1, sandshrew:1, nidoqueen:1, zubat:1, golbat:1, oddish:1, gloom:1, mankey:1, poliwrath:1, 
				machoke:1, machamp:1, doduo:1, dodrio:1, grimer:1, muk:1, kingler:1, cubone:1, marowak:1, hitmonlee:1, tangela:1, 
				mrmime:1, tauros:1, kabuto:1, dragonite:1, mewtwo:1, marill:1, hoppip:1, espeon:1, teddiursa:1, ursaring:1, 
				cascoon:1, taillow:1, swellow:1, pelipper:1, masquerain:1, azurill:1, minun:1, carvanha:1, huntail:1, bagon:1, 
				shelgon:1, salamence:1, latios:1, tangrowth:1, seismitoad:1, jellicent:1, elektross:1, druddigon:1, 
				bronzor:1, bronzong:1, gallade:1
			};
			if (pokemon.template.id in greenPokemon) {
				this.add('-message', pokemon.name + ' drank way too much!');
				pokemon.addVolatile('confusion');
				pokemon.statusData.time = 0;
			}
		},
		onModifyMove: function(move) {
			if (move.id === 'barrage') {
				move.category = 'Special';
				move.type = 'Grass';
				move.basePower = 35;
				move.critRatio = 2;
				move.accuracy = 100;
				move.multihit = [3,5],
				move.onBeforeMove = function() {
					this.add('-message', 'You found a little chocolate egg!');
				};
				move.onHit = function (target, source) {
					this.heal(Math.ceil(source.maxhp / 40), source);
				};
			} else if (move.id === 'eggbomb') {
				move.category = 'Special';
				move.type = 'Grass';
				move.basePower = 100;
				move.willCrit = true;
				move.accuracy = 100;
				move.onHit = function (target, source) {
					this.add('-message', source.name + ' ate a big chocolate egg!');
					this.heal(source.maxhp / 8, source);
				};
				move.self = {boosts: {spe: -2, spa: -1}};
			} else if (move.id === 'softboiled') {
				move.heal = [3,4];
				move.onHit = function(target) {
					this.add('-message', target.name + ' ate a delicious chocolate egg!');
				};
			} else {
				move.critRatio = 2;
			}
		},
		ruleset: ['Random Battle']
	},
	foolsfestival: {
		name: "Fools Festival",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonalFF',
		canUseRandomTeam: true,
		challengeShow: true,
		onBegin: function() {
			var dice = this.random(100);
			if (dice < 65) {
				this.add('-message', 'April showers bring May flowers...');
				this.setWeather('Rain Dance');
			} else if (dice < 95) {
				this.add('-message', "What a wonderful spring day! Let's go picnic!");
				this.setWeather('Sunny Day');
			} else {
				this.add('-message', "Bollocks, it's hailing?! In april?! Curse you, spring!!");
				this.setWeather('Hail');
			}
			delete this.weatherData.duration;
		},
		onSwitchIn: function(pokemon) {
			var name = (pokemon.ability === 'illusion' && pokemon.illusion)? pokemon.illusion.toString().substr(4, pokemon.illusion.toString().length) : pokemon.name;
			var stonedPokemon = {Koffing:1, Weezing:1, Slowpoke:1, Slowbro:1, Slowking:1, Psyduck:1, Spinda:1};
			var stonerQuotes = ['your face is green!', 'I just realised that Arceus fainted for our sins', 'I can, you know, feel the colors', 
			"you're my bro", "I'm imaginining a new color!", "I'm smelling the things I see!", 'hehe, hehe, funny', "I'm hungry!" , 'we are pokemanz', 
			'Did you know that Eevee backwards is eevee?! AMAZING', 'aaaam gonna be the verrrry best like no one evar wasss', 
			"I feel like someone is watching us through a screen!", "come at me bro"];
			if (name in stonedPokemon) {
				var random = this.random(stonerQuotes.length);
				this.add('-message', name + ": Duuuuuude, " + stonerQuotes[random]);
				this.boost({spe:-1, def:1, spd:1}, pokemon, pokemon, {fullname:'high'});
			}
			var msg = '';
			switch (name) {
			case 'Ludicolo':
				msg = "¡Ay, ay, ay! ¡Vámonos de fiesta, ya llegó Ludicolo!";
				break;
			case 'Missingno':
				msg = "Hide yo items, hide yo data, missingno is here!";
				break;
			case 'Slowpoke': case 'Slowbro':
				var didYouHear = ['Black & White are coming out soon!', 'Genesect has been banned to Ubers!',
				'Smogon is moving to Pokemon Showdown!', "We're having a new thing called Seasonal Ladder!", 'Deoxys is getting Nasty Plot!'];
				didYouHear = didYouHear.randomize();
				msg = 'Did you hear? ' + didYouHear[0];
				break;
			case 'Spinda':
				msg = "LOOK AT ME I'M USING SPINDA";
				break;
			case 'Whimsicott':
				msg = 'Oh dear lord, not SubSeed again!';
				break;
			case 'Liepard':
				msg = '#yoloswag';
				break;
			case 'Tornadus':
				msg = "It's HURRICANE time!";
				break;
			case 'Riolu':
				msg = 'Have you ever raged so hard that you smashed your keyboard? Let me show you.';
				break;
			case 'Gastly': case 'Haunter': case 'Gengar':
				msg = 'Welcome to Trolledville, population: you';
				break;
			case 'Amoonguss':
				msg = 'How do you feel about three sleep turns?';
				break;
			case 'Shaymin-Sky':
				msg = 'Do you know what paraflinch is? huehue';
				break;
			case 'Ferrothorn':
				msg = 'inb4 Stealth Rock';
				break;
			}
			if (msg !== '') {
				this.add('-message', msg);
			}
		},
		onModifyMove: function(move) {
			var dice = this.random(100);
			if (dice < 40) {
				var type = '';
				switch (move.type.toLowerCase()){
				case 'rock':
				case 'ground':
					type = 'Grass';
					break;
				case 'fire':
				case 'bug':
					type = 'Water';
					break;
				case 'water':
				case 'grass':
					type = 'Fire';
					break;
				case 'flying':
					type = 'Fighting';
					break;
				case 'fighting':
					type = 'Flying';
					break;
				case 'dark':
					type = 'Bug';
					break;
				case 'dragon':
				case 'electric':
					type = 'Ice';
					break;
				case 'ghost':
					type = 'Normal';
					break;
				case 'ice':
					type = 'Electric';
					break;
				case 'normal':
				case 'poison':
					type = 'Ghost';
					break;
				case 'psychic':
					type = 'Dark';
					break;
				case 'steel':
					type = 'Poison';
					break;
				}

				move.type = type;
				this.add('-message', 'lol trolled, I changed yo move type');
			}

			if (move.id === 'bulkup') {
				move.onHit = function (target, source, move) {
					var name = (target.ability === 'illusion' && target.illusion)? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					this.add('-message', name + ': Do you even lift, bro?!');
				};
			} else if (move.id === 'charm' || move.id === 'sweetkiss' || move.id === 'attract') {
				var malePickUpLines = ['have you been to Fukushima recently? Because you are glowing tonight!', 
				'did it hurt when you fell to the earth? Because you must be an angel!', 'can I buy you a drink?',
				'roses are red / lemons are sour / spread your legs / and give me an hour', 
				"roses are red / violets are red / I'm not good with colors", "Let's go watch cherry bossoms together (´･ω･`)",
				"Will you be my Denko? (´･ω･`)"];
				malePickUpLines = malePickUpLines.randomize();
				var femalePickUpLines = ['Do you go to the gym? You are buff!', "Guy, you make me hotter than July.",
				"While I stare at you I feel like I just peed myself", "Let's go to my apartment to have midnight coffee", 
				"Marry me, I wanna have 10 kids of you!", "Go out with me or I'll twist your neck!", "Man, you have some nice abs, can I touch them?"];
				femalePickUpLines = femalePickUpLines.randomize();
				move.onTryHit = function (target, source, move) {
					var pickUpLine = '';
					if (source.gender === 'M') {
						pickUpLine = malePickUpLines[0];
					} else if (source.gender === 'F') {
						pickUpLine = femalePickUpLines[0];
					} else {
						return;
					}
					var name = (source.ability === 'illusion' && source.illusion)? source.illusion.toString().substr(4, source.illusion.toString().length) : source.name;
					var targetName = (target.ability === 'illusion' && target.illusion)? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					this.add('-message', name + ': Hey, ' + targetName + ', ' + pickUpLine);
				};
				move.onMoveFail = function(target, source, move) {
					var femaleRejectLines = ['Uuuh... how about no', "gtfo I'm taken", 'I have to water the plants. On Easter Island. For a year. Bye',
					'GO AWAY CREEP', 'Do you smell like rotten eggs?', "I wouldn't date you even if you were the last Pokemon on earth."];
					femaleRejectLines = femaleRejectLines.randomize();
					var maleRejectLines = ["I'd rather get it on with a dirty daycare Ditto", "I'm not realy sure you're clean", 
					"Ew, you're disgusting!", "It's not me, it's you. Go away, ugly duckling.", "Not really interested *cough*weirdo*cough*"];
					maleRejectLines = maleRejectLines.randomize();
					var answer = '';
					if (target.gender === 'M') {
						answer = maleRejectLines[0];
					} else if (target.gender === 'F') {
						answer = femaleRejectLines[0];
					} else {
						return;
					}
					var targetName = (target.ability === 'illusion' && target.illusion)? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					if (!target.volatiles['attract']) {
						this.add('-message', targetName + ': ' + answer);
					}
				};
			}
		},
		onFaint: function (pokemon) {
			var haikus = ["You suck a lot / You are a bad trainer / let a mon faint", "they see me driving / round town with the girl i love / and I'm like, haikou",
			"Ain't no Pokemon tough enough / ain't no bulk decent enough / ain't no recovery good enough / to keep me from fainting you, babe",
			"Roses are red / violets are blue / you must be on some med / 'coz as a trainer you suck",
			"You're gonna be the very worst / like no one ever was / to lose all the battles is your test / to faint them all is your cause",
			'Twinkle twinkle little star / fuck you that was my best sweeper', "I'm wheezy and I'm sleezy / but as a trainer you're measly", 
			"You're sharp as a rock / you're bright as a hole / you're one to mock / you could be beaten by a maimed mole",
			"Alas, poor trainer! I knew him, your Pokémon, a fellow of infinite jest, of most excellent fancy."];
			haikus = haikus.randomize();
			this.add('-message', haikus[0]);
		},
		ruleset: ['Random Battle']
	},
	maymayhem: {
		name: "May Mayhem",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonalMM',
		canUseRandomTeam: true,
		challengeShow: true,
		onBegin: function() {
			var date = Date();
			date = date.split(' ');
			if (parseInt(date[2]) === 12) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Treecko!!');
			}
			if (parseInt(date[2]) === 16) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Joim!!');
			}
		},
		onSwitchIn: function(pokemon) {
			var dice = this.random(100);
			if (dice < 25) {
				this.add('-message', 'Never gonna give you up, never gonna let you down');
			}
		},
		ruleset: ['Random Battle']
	},
	junejubilee: {
		name: "June Jubilee",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonalJJ',
		canUseRandomTeam: true,
		challengeShow: true,
		turn: 0,
		onBegin: function() {
			this.add('-message', "Greetings, trainer! Delibird needs your help! It's lost on the US and it needs to find its way back to the arctic before summer starts! Help your Delibird while travelling north, but you must defeat the opponent before he reaches there first!");
		},
		onBeforeMove: function(pokemon, target, move) {
			if (pokemon.template.speciesid === 'reshiram' && pokemon.side.battle.turn < 15) {
				var weatherMsg = '';
				var dice = this.random(100);
				if (dice < 25) {
					this.setWeather('Rain Dance');
					weatherMsg = 'a Drizzle';
				} else if (dice < 50) {
					this.setWeather('Sunny Day');
					weatherMsg = 'a Sunny Day';
				} else if (dice < 75) {
					this.setWeather('Hail');
					weatherMsg = 'Hail';
				} else {
					this.setWeather('Sandstorm');
					weatherMsg = 'a Sandstorm';
				}
				this.add('-message', "Reshiram caused " + weatherMsg + " with its tail!");
				delete this.weatherData.duration;
			}
		},
		onBeforeMove: function(pokemon) {
			if (!pokemon.side.battle.seasonal) pokemon.side.battle.seasonal = {'none':false, 'drizzle':false, 'hail':false};
			if (pokemon.side.battle.turn >= 4 && pokemon.side.battle.seasonal.none === false) {
				this.add('-message', "You are travelling north and you have arrived to North Dakota! It isn't as sunny here...");
				this.clearWeather();
				pokemon.side.battle.seasonal.none = true;
			}
			if (pokemon.side.battle.turn >= 8 && pokemon.side.battle.seasonal.drizzle === false) {
				this.add('-message', "You are travelling further north and you have arrived to Edmonton! It started raining a lot... and it's effing cold.");
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
				pokemon.side.battle.seasonal.drizzle = true;
			}
			if (pokemon.side.battle.turn >= 12 && pokemon.side.battle.seasonal.hail === false) {
				this.add('-message', "You have arrived to the arctic! Defeat the other trainer so Delibird can be free!");
				this.setWeather('Hail');
				delete this.weatherData.duration;
				pokemon.side.battle.seasonal.hail = true;
			}
		},
		onFaint: function(pokemon) {
			if (pokemon.template.id === 'delibird') {
				var name = pokemon.side.name;
				var winner = '';
				if (pokemon.side.id === 'p1') {
					winner = 'p2';
				} else {
					winner = 'p1';
				}
				this.add('-message', "No!! You let Delibird down. He trusted you. You lost the battle, " + name + ". But you lost something else: your Pokémon's trust.");
				pokemon.battle.win(winner);
			}
		},
		ruleset: ['Random Battle']
	},
	jollyjuly: {
		name: "Jolly July",
		section: "Seasonals",

		effectType: 'Format',
		team: 'randomSeasonalJuly',
		canUseRandomTeam: true,
		challengeShow: true,
		onBegin: function() {
			this.add('-message', 'You and your faithful favourite Pokémon are travelling around the world, and you will fight this trainer in many places until either win or finish the travel!');
			var date = Date();
			date = date.split(' ');
			switch (parseInt(date[2])) {
			case 4:
				this.add('-message', "FUCK YEAH 'MURICA!");
				break;
			case 5:
				this.add('-message', '¡Libertad para Venezuela o muerte!');
				break;
			case 9:
				this.add('-message', '¡Che, viteh que somos libres!');
				break;
				this.add('-message', 'Free the beaches!');
				break;
			case 20:
				this.add('-message', '¡Independencia para Colombia!');
				break;
			case 28:
				this.add('-message', '¡Perú libre!');
				break;
			}
		},
		onBeforeMove: function(pokemon) {
			var dice = this.random(100);
			if (!pokemon.side.battle.cities) {
				pokemon.side.battle.cities = {
					'N': [
						'Madrid', 'Paris', 'London', 'Ghent', 'Amsterdam', 'Gdansk',
						'Munich', 'Rome', 'Rabat', 'Stockholm', 'Moscow', 'Beijing',
						'Tokyo', 'Dubai', 'New York', 'Vancouver', 'Los Angeles',
						'Edmonton', 'Houston', 'Mexico DF', 'Barcelona', 'Blanes'
					],
					'S': [
						'Buenos Aires', 'Lima', 'Johanesburg', 'Sydney', 'Melbourne',
						'Santiago de Chile', 'Bogota', 'Lima', 'Montevideo',
						'Wellington', 'Canberra', 'Jakarta', 'Kampala', 'Mumbai',
						'Auckland', 'Pretoria', 'Cape Town'
					]
				};
				pokemon.side.battle.currentPlace = {'hemisphere':'N', 'city':'Townsville'};
				pokemon.side.battle.cities.N = pokemon.side.battle.cities.N.randomize();
				pokemon.side.battle.cities.S = pokemon.side.battle.cities.S.randomize();
				pokemon.side.battle.indexes = {'N':0, 'S':0};
				if (dice < 50) pokemon.side.battle.currentPlace.hemisphere = 'S';
				pokemon.side.battle.currentPlace.city = pokemon.side.battle.cities[pokemon.side.battle.currentPlace.hemisphere][0];
				pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]++;
			}

			var diceTwo = this.random(100);
			if (diceTwo > 75) {
				var comments = [
					"I've heard your mom is also travelling around the world catchin' em all, if you get what I mean, %s.",
					"You fight like a Miltank!", "I'm your Stealth Rock to your Charizard, %s!", 
					"I bet I could beat you with a Spinda. Or an Unown.", "I'm rubber, you're glue!", 
					"I've seen Slowpokes with more training prowess, %s.", "You are no match for me, %s!",
					'%s, have you learned how to battle from Bianca?'
				];
				comments = comments.randomize();
				var otherTrainer = (pokemon.side.id === 'p1')? 'p2' : 'p1';
				this.add('-message', pokemon.side.name + ': ' + comments[0].replace('%s', pokemon.side.battle[otherTrainer].name));
			}
			delete diceTwo;

			if (!pokemon.side.battle.lastMoveTurn) pokemon.side.battle.lastMoveTurn = 0;
			if (pokemon.side.battle.lastMoveTurn !== pokemon.side.battle.turn) {
				var nextChange = this.random(2, 4);
				if (pokemon.side.battle.lastMoveTurn === 0 || pokemon.side.battle.lastMoveTurn + nextChange <= pokemon.side.battle.turn) {
					pokemon.side.battle.lastMoveTurn = pokemon.side.battle.turn;
					if (dice < 50) {
						if (pokemon.side.battle.currentPlace.hemisphere === 'N') {
							pokemon.side.battle.currentPlace.hemisphere = 'S';
							this.add('-fieldstart', 'move: Wonder Room', '[of] Seasonal');
						} else {
							pokemon.side.battle.currentPlace.hemisphere = 'N';
							this.add('-fieldend', 'move: Wonder Room', '[of] Seasonal');
						}
					}

					if (pokemon.side.battle.indexes.N === pokemon.side.battle.cities['N'].length - 1 
					&& pokemon.side.battle.indexes.S === pokemon.side.battle.cities['S'].length - 1) {
						this.add('-message', 'You have travelled all around the world, ' + pokemon.side.name + '! You won!');
						pokemon.battle.win(pokemon.side.id);
						return false;
					}
					pokemon.side.battle.currentPlace.city = pokemon.side.battle.cities[pokemon.side.battle.currentPlace.hemisphere][pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]];
					pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]++;
					var hemispheres = {'N':'northern', 'S':'southern'};
					pokemon.side.battle.add('-message', 'Travelling around the world, you have arrived to a new city in the ' + hemispheres[pokemon.side.battle.currentPlace.hemisphere] + ' hemisphere, ' + pokemon.side.battle.currentPlace.city + '!');
				}
			}
		},
		onModifyMove: function(move) {
			if (move.id === 'fireblast') move.name = 'July 4th Fireworks';
		},
		ruleset: ['Random Battle']
	},
	averageaugust: {
		name: "Average August",
		section: "Seasonals",

		effectType: 'Format',
		gameType: 'doubles',
		team: 'randomSeasonalAA',
		canUseRandomTeam: true,
		challengeShow: true,
		onBegin: function() {
			// What does player 1 lead with?
			var p1Where = 'boat';
			var p2Where = 'boat';
			if (this.p1.pokemon[0].name === 'Kyogre') p1Where = 'pirates';
			if (this.p2.pokemon[0].name === 'Kyogre') p2Where = 'pirates';
			var shipNames = [
				'Zarelrules', 'Joimawesome', 'Treeckonoob', 'MJailBait', 'mikelpuns', 'TTTtttttt', 'Frazzle Dazzle', 
				'TIbot', 'CDXCIV', 'Srs Bsns Trts', 'Leemz', 'Eggymad', 'Snoffles', 'bmelted', 'Poopes', 'Hugonedugen', 
				'Il Haunter', 'chaospwns', 'WaterBro', 'niggie', 'DOOM', 'qhore', 'Jizzmine', 'Aldarown'
			].randomize();
			var whereAreThey = (p1Where === 'boat' && p2Where === 'boat')? 'You both were aboard the fantastic ship S. S. ' + shipNames[0] : 
			((p1Where === 'pirates' && p2Where === 'pirates')? 'You are two pirate gangs on a summer sea storm about to raze the ship S. S. ' +  shipNames[0] : 
			((p1Where === 'pirates')? this.p1.name : this.p2.name) + ' leads a pirate boat to raze the ship S. S. ' + shipNames[0] 
			+ ' where ' + ((p1Where === 'pirates')? this.p2.name : this.p1.name)) + ' is enjoying a sea travel,';
			
			this.add('-message', 
				'Alas, poor trainers! ' + whereAreThey + " when a sudden summer Hurricane made a Wailord hit your transport, and now it's sinking! "
				+ "There are not enough life boats for everyone nor trainers ain't sharing their Water-type friends, "
				+ "so you'll have to fight to access a life boat! Good luck! You have to be fast to not to be hit by the Hurricane!"
			);
		},
		onSwitchIn: function(pokemon) {
			if (pokemon.battle.turn > 0) {
				var result = true;
				for (var i=0; i<pokemon.battle.sides.length; i++) {
					for (var j=0; j<pokemon.battle.sides[i].active.length; j++) {
						if (pokemon.battle.sides[i].active[j] && !pokemon.battle.sides[i].active[j].volatiles['perishsong']) {
							result = false;
						}
						if (pokemon.battle.sides[i].active[j] && pokemon.battle.sides[i].active[j].ability !== 'soundproof') {
							pokemon.battle.sides[i].active[j].addVolatile('perishsong');
						} else {
							this.add('-immune', pokemon.battle.sides[i].active[j], '[msg]');
							this.add('-end', pokemon.battle.sides[i].active[j], 'Perish Song');
						}
					}
				}
				if (result) return false;
				this.add('-fieldactivate', 'move: Perish Song');
			}
		}
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	gen4ou: {
		name: "[Gen 4] OU",
		section: "Past Generations",

		mod: 'gen4',
		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	gen4ubers: {
		name: "[Gen 4] Ubers",
		section: "Past Generations",

		mod: 'gen4',
		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: []
	},
	gen4uu: {
		name: "[Gen 4] UU",
		section: "Past Generations",

		mod: 'gen4',
		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL']
	},
	gen4nu: {
		name: "[Gen 4] NU",
		section: "Past Generations",

		mod: 'gen4',
		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL', 'UU']
	},
	gen4customgame: {
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		effectType: 'Format',
		challengeShow: true,
		canUseRandomTeam: true,
		debug: true,
		ruleset: ['HP Percentage Mod']
	},
	gen3ou: {
		name: "[Gen 3] OU",
		section: "Past Generations",

		mod: 'gen3',
		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	gen3ubers: {
		name: "[Gen 3] Ubers",
		section: "Past Generations",

		mod: 'gen3',
		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: []
	},
	gen3customgame: {
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		effectType: 'Format',
		challengeShow: true,
		canUseRandomTeam: true,
		debug: true,
		ruleset: ['HP Percentage Mod']
	},
	gen2ou: {
		name: "[Gen 2] OU",
		section: "Past Generations",

		mod: 'gen2',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	gen1ou: {
		name: "[Gen 1] OU",
		section: "Past Generations",

		mod: 'gen1',
		effectType: 'Format',
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Wrap', 'Fire Spin', 'Clamp', 'Bind']
	},
	gen1ubers: {
		name: "[Gen 1] Ubers",
		section: "Past Generations",

		mod: 'gen1',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'HP Percentage Mod'],
		banlist: ['Illegal']
	},
	gen1uu: {
		name: "[Gen 1] UU",
		section: "Past Generations",

		mod: 'gen1',
		effectType: 'Format',
		rated: true,
		challengeShow: true,
		searchShow: true,
		debug: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Clause', 'Freeze Clause', 'HP Percentage Mod'],
		banlist: ['Uber', 'OU', 'Illegal']
	},
	gen1lc: {
		name: "[Gen 1] LC",
		section: "Past Generations",

		mod: 'gen1',
		effectType: 'Format',
		maxLevel: 5,
		rated: true,
		challengeShow: true,
		debug: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'Little Cup', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Clause', 'Freeze Clause', 'HP Percentage Mod'],
		banlist: ['Uber', 'OU', 'UU', 'Illegal', 'Sonicboom', 'Dragon Rage']
	},
	gen1customgame: {
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		effectType: 'Format',
		challengeShow: true,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},

	// Rulesets
	///////////////////////////////////////////////////////////////////

	standard: {
		effectType: 'Banlist',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'HP Percentage Mod'],
		banlist: ['Unreleased', 'Illegal']
	},
	standardubers: {
		effectType: 'Banlist',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'HP Percentage Mod'],
		banlist: ['Unreleased', 'Illegal']
	},
	pokemon: {
		effectType: 'Banlist',
		validateSet: function(set, format) {
			var item = this.getItem(set.item);
			var template = this.getTemplate(set.species);
			var problems = [];

			if (set.species === set.name) delete set.name;
			if (template.gen > this.gen) {
				problems.push(set.species+' does not exist in gen '+this.gen+'.');
			} else if (template.isNonstandard) {
				problems.push(set.species+' is not a real Pokemon.');
			}
			if (set.ability) {
				var ability = this.getAbility(set.ability);
				if (ability.gen > this.gen) {
					problems.push(ability.name+' does not exist in gen '+this.gen+'.');
				} else if (ability.isNonstandard) {
					problems.push(ability.name+' is not a real ability.');
				}
			}
			if (set.moves) for (var i=0; i<set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.gen > this.gen) {
					problems.push(move.name+' does not exist in gen '+this.gen+'.');
				} else if (move.isNonstandard) {
					problems.push(move.name+' is not a real move.');
				}
			}
			if (item) {
				if (item.gen > this.gen) {
					problems.push(item.name+' does not exist in gen '+this.gen+'.');
				} else if (item.isNonstandard) {
					problems.push(item.name + ' is not a real item.');
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name||set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name||set.species) + ' is higher than level 100.');
			}

			// ----------- legality line ------------------------------------------
			if (!format.banlistTable || !format.banlistTable['illegal']) return problems;
			// everything after this line only happens if we're doing legality enforcement

			// limit one of each move
			var moves = [];
			if (set.moves) {
				var hasMove = {};
				for (var i=0; i<set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					var moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			if (template.num == 351) { // Castform
				set.species = 'Castform';
			}
			if (template.num == 421) { // Cherrim
				set.species = 'Cherrim';
			}
			if (template.num == 493) { // Arceus
				if (set.ability === 'Multitype' && item.onPlate) {
					set.species = 'Arceus-'+item.onPlate;
				} else {
					set.species = 'Arceus';
				}
			}
			if (template.num == 555) { // Darmanitan
				set.species = 'Darmanitan';
			}
			if (template.num == 487) { // Giratina
				if (item.id === 'griseousorb') {
					set.species = 'Giratina-Origin';
					set.ability = 'Levitate';
				} else {
					set.species = 'Giratina';
					set.ability = 'Pressure';
				}
			}
			if (template.num == 647) { // Keldeo
				if (set.species === 'Keldeo-Resolution' && set.moves.indexOf('Secret Sword') < 0) {
					set.species = 'Keldeo';
				}
			}
			if (template.num == 648) { // Meloetta
				set.species = 'Meloetta';
			}
			return problems;
		}
	},
	cappokemon: {
		effectType: 'Rule',
		validateSet: function(set, format) {
			// don't return
			this.getEffect('Pokemon').validateSet.call(this, set, format);

			// limit one of each move
			var moves = [];
			if (set.moves) {
				var hasMove = {};
				for (var i=0; i<set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					var moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;
		}
	},
	abilityexchangepokemon: {
		effectType: 'Banlist',
		validateTeam: function(team, format) {
			var selectedAbilities = [];
			var defaultAbilities = [];
			var bannedAbilities = {adaptability:1, arenatrap:1, contrary:1, hugepower:1, imposter:1, purepower:1, prankster:1, serenegrace:1, shadowtag:1, simple:1, speedboost:1, tintedlens:1, wonderguard:1};
			var problems = [];
			for (var i=0; i<team.length; i++) {
				var template = this.getTemplate(team[i].species);
				var ability = this.getAbility(team[i].ability);
				var abilities = Object.extended(template.abilities).values();
				if (ability.id in bannedAbilities && abilities.indexOf(ability.name) === -1) {
					problems.push(ability.name+' is banned on Pokemon that do not legally have it.');
				}
				selectedAbilities.push(ability.name);
				defaultAbilities.push(abilities);
			}
			if (problems.length) return problems;
			if (!this.checkAbilities(selectedAbilities, defaultAbilities)) {
				return ['That is not a valid Ability Exchange team.'];
			}
		}
	},
	gscmodernpokemon: {
		effectType: 'Banlist',
		validateSet: function(set, format) {
			var problems = [];
			var template = this.getTemplate(set.species);
			if (template.gen > 2) problems.push(set.species + ' must come from Gen 1 or Gen 2.');
			return problems;
		}
	},
	offstatpokemon: {
		effectType: 'Banlist',
		validateSet: function(set, format) {
			var problems = [];
			var template = this.getTemplate(set.species);
			var attackingStat = '';
			var badStat = '';
			if (template.baseStats['atk'] > template.baseStats['spa']) {
				attackingStat = 'atk';
				badStat = 'spa';
			} else {
				attackingStat = 'spa';
				badStat = 'atk';
			}
			if (template.baseStats[attackingStat] - template.baseStats[badStat] < 50) {
				problems.push(set.species + ' is not allowed in Offstat since its main stat is not at least 50 points higher.');
			}
			if (set.moves) for (var i=0; i<set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if ((move.category === 'Special' && badStat !== 'spa') || (move.category === 'Physical' && badStat !== 'atk')) {
					problems.push(move.name + ' is not allowed since it uses the highest attacking stat of ' + set.species + '.');
				}
			}
			return problems;
		}
	},
	slowmonspokemon: {
		effectType: 'Banlist',
		validateSet: function(set, format) {
			var problems = [];
			if (set.level < 100) problems.push(set.species + ' must be level 100.');
			return problems;
		}
	},
	suicidepokemon: {
		effectType: 'Banlist',
		validateTeam: function(team, format) {
			if (team.length < 6) return ["You need 6 Pokemon on your team."];
		},
		validateSet: function(set, format) {
			var problems = [];
			var template = this.getTemplate(set.species);
			if (set.level < 100) problems.push(set.species + ' must be level 100.');
			if (!set.moves || set.moves.length < 4) {
				problems.push(set.species + ' must have four moves.');
			} else {
				var hasOneAttack = false;
				for (var i=0; i<4; i++) {
					var move = this.getMove(set.moves[i]);
					hasOneAttack = (move.category === 'Special' || move.category === 'Physical');
					if (hasOneAttack) break;
				}
				if (!hasOneAttack) problems.push(set.species + ' must have an attacking move.');
			}
			return problems;
		}
	},
	technicimonspokemon: {
		validateSet: function(set, format) {
			var noTechnician = {Slaking:1, Regigigas:1};
			if (!noTechnician[set.species]) set.ability = 'Technician';
			var problems = [];
			if (set.moves) for (var i=0; i<set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.basePower >= 100) {
					problems.push(move.name+' is banned because its base power is 100 or higher.');
				}
			}
			return problems;
		}
	},
	legal: {
		effectType: 'Banlist',
		banlist: ['Crobat+BraveBird+Hypnosis']
	},
	potd: {
		effectType: 'Rule',
		onPotD: '',
		onStart: function() {
			if (this.effect.onPotD) {
				this.add('rule', 'Pokemon of the Day: '+this.effect.onPotD);
			}
		}
	},
	teampreviewvgc: {
		onStartPriority: -10,
		onStart: function() {
			this.add('clearpoke');
			for (var i=0; i<this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
			for (var i=0; i<this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
		},
		onTeamPreview: function() {
			this.makeRequest('teampreview', 4);
		}
	},
	teampreview1v1: {
		onStartPriority: -10,
		onStart: function() {
			this.add('clearpoke');
			for (var i=0; i<this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
			for (var i=0; i<this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
		},
		onTeamPreview: function() {
			this.makeRequest('teampreview', 1);
		}
	},
	teampreview: {
		onStartPriority: -10,
		onStart: function() {
			this.add('clearpoke');
			for (var i=0; i<this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
			for (var i=0; i<this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
		},
		onTeamPreview: function() {
			this.makeRequest('teampreview');
		}
	},
	teampreviewgbu: {
		onStartPriority: -10,
		onStart: function() {
			this.add('clearpoke');
			for (var i=0; i<this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
			for (var i=0; i<this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/Arceus(\-[a-zA-Z\?]+)?/, 'Arceus-*'));
			}
		},
		onTeamPreview: function() {
			this.makeRequest('teampreview', 3);
		}
	},
	littlecup: {
		effectType: 'Rule',
		validateSet: function(set) {
			var template = this.getTemplate(set.species || set.name);
			if (template.prevo) {
				return [set.species+" isn't the first in its evolution family."];
			}
			if (!template.nfe) {
				return [set.species+" doesn't have an evolution family."];
			}
		}
	},
	sixmoves: {
		effectType: 'Banlist',
		validateSet: function(set, format) {
			var item = this.getItem(set.item);
			var template = this.getTemplate(set.species);
			var problems = [];

			if (set.species === set.name) delete set.name;
			if (template.num == 493) {
				if (set.ability === 'Multitype' && item.onPlate) {
					set.species = 'Arceus-'+item.onPlate;
				} else {
					set.species = 'Arceus';
				}
			}
			if (template.num == 487) {
				if (item.id === 'griseousorb') {
					set.species = 'Giratina-Origin';
				} else {
					set.species = 'Giratina';
				}
			}
			if (template.num == 555) set.species = 'Darmanitan';
			if (template.num == 648) set.species = 'Meloetta';
			if (template.num == 351) set.species = 'Castform';
			if (template.num == 421) set.species = 'Cherrim';
			if (template.num == 647) {
				if (set.species === 'Keldeo-Resolution' && set.moves.indexOf('Secret Sword') < 0) set.species = 'Keldeo';
			}
			if (template.isNonstandard) problems.push(set.species+' is not a real Pokemon.');
			if (set.moves) for (var i=0; i<set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.isNonstandard) problems.push(move.name+' is not a real move.');
			}
			if (set.moves && set.moves.length > 6) problems.push((set.name||set.species) + ' has more than six moves.');
			return problems;
		}
	},
	speciesclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Species Clause: Limit one of each Pokemon');
		},
		validateTeam: function(team, format) {
			var speciesTable = {};
			for (var i=0; i<team.length; i++) {
				var template = this.getTemplate(team[i].species);
				if (speciesTable[template.num]) {
					return ['You are limited to one of each pokemon by Species Clause.','(You have more than one '+template.name+')'];
				}
				speciesTable[template.num] = true;
			}
		}
	},
	itemclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Item Clause: Limit one of each item');
		},
		validateTeam: function(team, format) {
			var itemTable = {};
			for (var i=0; i<team.length; i++) {
				var item = toId(team[i].item);
				if (!item) continue;
				if (itemTable[item]) {
					return ['You are limited to one of each item by Item Clause.','(You have more than one '+this.getItem(item).name+')'];
				}
				itemTable[item] = true;
			}
		}
	},
	ohkoclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'OHKO Clause: OHKO moves are banned');
		},
		validateSet: function(set) {
			var problems = [];
			if (set.moves) {
				for (var i in set.moves) {
					var move = this.getMove(set.moves[i]);
					if (move.ohko) problems.push(move.name+' is banned by OHKO Clause.');
				}
			}
			return problems;
		}
	},
	evasionabilitiesclause: {
		effectType: 'Banlist',
		name: 'Evasion Abilities Clause',
		banlist: ['Sand Veil', 'Snow Cloak'],
		onStart: function() {
			this.add('rule', 'Evasion Abilities Clause: Evasion abilities are banned');
		}
	},
	evasionmovesclause: {
		effectType: 'Banlist',
		name: 'Evasion Moves Clause',
		banlist: ['Minimize', 'Double Team'],
		onStart: function() {
			this.add('rule', 'Evasion Moves Clause: Evasion moves are banned');
		}
	},
	moodyclause: {
		effectType: 'Banlist',
		name: 'Moody Clause',
		banlist: ['Moody'],
		onStart: function() {
			this.add('rule', 'Moody Clause: Moody is banned');
		}
	},
	hppercentagemod: {
		effectType: 'Rule',
		name: 'HP Percentage Mod',
		onStart: function() {
			this.add('rule', 'HP Percentage Mod: HP is reported as percentages');
			this.reportPercentages = true;
		}
	},
	sleepclausemod: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Sleep Clause Mod: Limit one foe put to sleep');
		},
		onSetStatus: function(status, target, source) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'slp') {
				for (var i=0; i<target.side.pokemon.length; i++) {
					var pokemon = target.side.pokemon[i];
					if (pokemon.status === 'slp') {
						if (!pokemon.statusData.source ||
							pokemon.statusData.source.side !== pokemon.side) {
							this.add('-message', 'Sleep Clause Mod activated.');
							return false;
						}
					}
				}
			}
		}
	},
	freezeclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Freeze Clause: Limit one foe frozen');
		},
		onSetStatus: function(status, target, source) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'frz') {
				for (var i=0; i<target.side.pokemon.length; i++) {
					var pokemon = target.side.pokemon[i];
					if (pokemon.status === 'frz') {
						this.add('-message', 'Freeze Clause activated.');
						return false;
					}
				}
			}
		}
	},
	sametypeclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Same Type Clause: Pokemon in a team must share a type');
		},
		validateTeam: function(team, format) {
			var typeTable = {};
			for (var i=0; i<team.length; i++) {
				var template = this.getTemplate(team[i].species);
				if (!template.types) continue;

				// first type
				var type = template.types[0];
				typeTable[type] = (typeTable[type]||0) + 1;

				// second type
				type = template.types[1];
				if (type) typeTable[type] = (typeTable[type]||0) + 1;
			}
			for (var type in typeTable) {
				if (typeTable[type] >= team.length) {
					return;
				}
			}
			return ['Your team must share a type.'];
		}
	}
};
