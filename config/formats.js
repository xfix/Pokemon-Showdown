'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// XY Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],
		section: "ORAS Singles",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Unrated Random Battle",
		section: "ORAS Singles",

		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3521201/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3553516/\">OU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: [],
	},
	{
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557948/\">np: UU Stage 6</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541343/\">UU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought'],
	},
	{
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557997/\">np: RU Stage 13</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3538036/\">RU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557854/\">np: NU Stage 10</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545276/\">NU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['RU'],
		banlist: ['RU', 'BL3'],
	},
	{
		name: "PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560703/\">np: PU Stage 6</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Chatter'],
	},
	{
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3490462/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],
		section: "ORAS Singles",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	},
	{
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>",
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal'],
	},
	/*{
		name: "CAP Naviathan Playtest",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Allow CAP', 'Syclant', 'Revenankh', 'Pyroak', 'Fidgit', 'Stratagem', 'Arghonaut', 'Kitsunoh', 'Cyclohm', 'Colossoil', 'Krilowatt', 'Voodoom',
			'Tomohawk', 'Necturna', 'Mollux', 'Aurumoth', 'Malaconda', 'Cawmodore', 'Volkraken', 'Plasmanta',
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Genesect',
			'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew'
		]
	},*/
	{
		name: "Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527960/\">Battle Spot Singles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554616/\">Battle Spot Singles Viability Ranking</a>",
		],
		section: "ORAS Singles",

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "Custom Game",
		section: "ORAS Singles",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// XY Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Doubles Battle",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545903/\">np: Doubles OU Stage 3</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>",
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Salamence-Mega', 'Salamencite', 'Soul Dew', 'Dark Void',
			'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore',
		],
	},
	{
		name: "Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void'],
	},
	{
		name: "Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: ['Aegislash', 'Amoonguss', 'Azumarill', 'Bisharp', 'Blaziken', 'Breloom', 'Chandelure', 'Charizard', 'Conkeldurr',
			'Cresselia', 'Diancie', 'Dragonite', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gardevoir', 'Gengar', 'Greninja',
			'Gyarados', 'Heatran', 'Hoopa-Unbound', 'Hydreigon', 'Jellicent', 'Jirachi', 'Kangaskhan', 'Keldeo', 'Kyurem-Black',
			'Landorus', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Mawile', 'Metagross', 'Politoed', 'Rotom-Wash', 'Sableye',
			'Scizor', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Swampert', 'Sylveon', 'Talonflame', 'Terrakion',
			'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcarona', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	},
	{
		name: "Doubles NU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Doubles UU'],
		banlist: ['Abomasnow', 'Aerodactyl', 'Altaria', 'Ampharos', 'Arcanine', 'Aromatisse', 'Aurorus', 'Banette', 'Blastoise',
			'Bronzong', 'Camerupt', 'Clawitzer', 'Cobalion', 'Cofagrigus', 'Cradily', 'Crawdaunt', 'Crobat', 'Doublade',
			'Dusclops', 'Electivire', 'Empoleon', 'Espeon', 'Florges', 'Forretress', 'Galvantula', 'Gastrodon', 'Genesect',
			'Hariyama', 'Hitmontop', 'Honchkrow', 'Hoopa', 'Infernape', 'Jolteon', 'Kingdra', 'Kingler', 'Klefki',
			'Krookodile', 'Kyurem', 'Liepard', 'Lopunny', 'Lucario', 'Machamp', 'Mamoswine', 'Manaphy', 'Medicham',
			'Mew', 'Mienshao', 'Milotic', 'Murkrow', 'Nidoking', 'Ninetales', 'Noivern', 'Pachirisu', 'Pangoro',
			'Porygon2', 'Reuniclus', 'Rhyperior', 'Roserade', 'Rotom-Heat', 'Salamence', 'Sceptile', 'Serperior', 'Slowking',
			'Snorlax', 'Thundurus-Therian', 'Togetic', 'Tornadus', 'Vaporeon',
		],
	},
	{
		name: "VGC 2016",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558332/\">VGC 2016 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558929/\">VGC 2016 Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3500650/\">VGC Learning Resources</a>",
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy',
			'Darkrai', 'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Soul Dew',
		],
		requirePentagon: true,
		onValidateTeam: function (team) {
			const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1, 'Yveltal':1, 'Zygarde':1};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	},
	{
		name: "Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3524352/\">VGC 2015 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3530547/\">VGC 2015 Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526666/\">Sample Teams for VGC 2015</a>",
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "Battle Spot Special 13",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3555571/\">Battle Spot Special Season 13</a>"],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
		onValidateSet: function (set) {
			if (set.item) {
				const item = this.getItem(set.item);
				if (item.megaStone) return ["Mega Stones are not permitted."];
			}
		},
	},
	{
		name: "Doubles Hackmons Cup",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Doubles Custom Game",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// XY Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Triples Battle",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Smogon Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3511522/\">Smogon Triples</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540390/\">Smogon Triples Viability Ranking</a>",
		],
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Perish Song',
		],
	},
	{
		name: "Smogon Triples Ubers",
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void', 'Perish Song'],
	},
	{
		name: "Battle Spot Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533914/\">Battle Spot Triples Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3549201/\">Battle Spot Triples Viability Ranking</a>",
		],
		section: "ORAS Triples",

		gameType: 'triples',
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "Uber Triples",
		desc: [
			"Uber Triples",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3511522/\">Like Smogon Triples but no Uber bans.</a>",
		],
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Mega Rayquaza Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void', 'Perish Song'],
	},
	{
		name: "Triples Hackmons Cup",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Triples Custom Game",
		section: "ORAS Triples",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "Acid Rain",
		section: "OM of the Week",
		column: 2,

		mod: 'acidrain',
		onBegin: function () {
			this.setWeather('raindance');
			delete this.weatherData.duration;
			this.add('-message', "Eh, close enough.");
		},
		ruleset: ['OU'],
		banlist: ['Weather Ball', 'Castform'],
	},
	{
		name: "Old School Machops",
		section: "OM of the Week",

		ruleset: ['Ubers'],
		banlist: [],
		onValidateSet: function (set) {
			let moves = set.moves;
			let problems = [];
			let name = set.name || set.species;
			for (let i = 0; i < moves.length; i++) {
				let move = this.getMove(moves[i]);
				if (move.gen !== 1 && move.id !== 'hiddenpower') {
					problems.push(name + "'s move " + set.moves[i] + " is banned.");
				}
			}
			return problems;
		},
	},
	{
		name: "5 Star Battalion",
		section: "OM of the Week",

		ruleset: ['Ubers'],
		banlist: ['Allow More Moves'],
		onValidateSet: function (set) {
			if (set.moves && set.moves.length > 5) {
				return [(set.name || set.species) + ' has more than five moves.'];
			}
		},
	},

	{
		name: "Gods and Followers",
		desc: [
			"The Pok&eacute;mon in the first slot is the God; the Followers must share a type with the God. If the God Pok&eacute;mon faints, the Followers are inflicted with Curse.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545230/\">Gods and Followers</a>",
		],
		section: "OM of the Month",
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Baton Pass Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: [],
		onValidateTeam: function (team) {
			if (!team[0]) return;
			let template = this.getTemplate(team[0].species);
			let typeTable = template.types;
			for (let i = 1; i < team.length; i++) {
				template = this.getTemplate(team[i].species);
				if (template.tier === 'Uber') return [template.species + " is only allowed as the God."];
				if (!template.types || !typeTable.intersect(template.types).length) return ["Followers must share a type with the God."];
				let item = toId(team[i].item);
				if (item && item in {gengarite:1, kangaskhanite:1, lucarionite:1, mawilite:1, salamencite:1, souldew:1}) return [team[i].item + " is only allowed on the God."];
				if (toId(team[i].ability) === 'shadowtag') return [team[i].ability + " is only allowed on the God."];
			}
		},
		onBegin: function () {
			for (let i = 0; i < this.sides.length; i++) {
				this.sides[i].god = this.sides[i].pokemon[0];
			}
		},
		onFaint: function (pokemon) {
			if (pokemon.side.pokemonLeft > 1 && pokemon.side.god === pokemon) {
				this.add('-message', pokemon.name + " has fallen! " + pokemon.side.name + "'s team has been Cursed!");
			}
		},
		onSwitchIn: function (pokemon) {
			if (pokemon.side.god.hp === 0) {
				pokemon.addVolatile('curse', pokemon);
			}
		},
	},
	{
		name: "Monogen",
		desc: [
			"All Pok&eacute;mon on a team must be from the same generation.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3516475/\">Monogen</a>",
		],
		section: "OM of the Month",

		ruleset: ['OU'],
		banlist: [],
		onValidateTeam: function (team) {
			if (!team[0]) return;
			let gen = this.getTemplate(team[0].species).gen;
			if (!gen) return ["Your team must be from the same generation."];
			for (let i = 1; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				if (template.gen !== gen) return ["Your team must be from the same generation."];
			}
		},
	},
	{
		name: "[Seasonal] Polar Opposites",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "OM of the Month",
		team: 'randomSeasonalPolar',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onNegateImmunity: function (pokemon, type) {
			if (type in this.data.TypeChart && this.runEvent('Immunity', pokemon, null, null, type)) return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	{
		name: "CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/cap/\">CAP Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>",
		],
		section: "Other Metagames",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Allow CAP'],
	},
	{
		name: "Battle Factory",
		section: "Other Metagames",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "Challenge Cup 1v1",
		section: "Other Metagames",

		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	},
	{
		name: "Balanced Hackmons",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3489849/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3515725/\">Balanced Hackmons Suspect Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547823/\">Balanced Hackmons Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Kyogre-Primal', 'Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter'],
	},
	{
		name: "1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3496773/\">1v1</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536109/\">1v1 Viability Ranking</a>",
		],
		section: 'Other Metagames',

		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky',
			'Xerneas', 'Yveltal', 'Zekrom', 'Focus Sash', 'Kangaskhanite', 'Soul Dew', 'Perish Song',
		],
	},
	{
		name: "Monotype",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550310/\">Monotype Resources</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite', 'Charizardite X', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew',
		],
	},
	{
		name: "Tier Shift",
		desc: [
			"Pok&eacute;mon below OU/BL get all their stats boosted. UU/BL2 get +5, RU/BL3 get +10, NU/BL4 get +15, and PU or lower get +20.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554765/\">Tier Shift</a>",
		],
		section: "Other Metagames",

		mod: 'tiershift',
		ruleset: ['OU'],
		banlist: ['Swift Swim'],
	},
	{
		name: "OU (no Mega)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3536150/\">OU (no Mega) Viability Ranking</a>"],
		section: "Other Metagames",

		ruleset: ['OU'],
		onBegin: function () {
			for (let i = 0; i < this.p1.pokemon.length; i++) {
				this.p1.pokemon[i].canMegaEvo = false;
			}
			for (let i = 0; i < this.p2.pokemon.length; i++) {
				this.p2.pokemon[i].canMegaEvo = false;
			}
		},
	},
	{
		name: "Inverse Battle",
		desc: [
			"Battle with an inverted type chart.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3518146/\">Inverse Battle</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526371/\">Inverse Battle Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Diggersby', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Serperior',
			'Shaymin-Sky', 'Snorlax', 'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew', 'Shadow Tag',
		],
		onNegateImmunity: function (pokemon, type) {
			if (type in this.data.TypeChart && this.runEvent('Immunity', pokemon, null, null, type)) return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	{
		name: "Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528058/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551063/\">Almost Any Ability Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Arceus', 'Archeops', 'Bisharp', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja', 'Slaking', 'Smeargle', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal',
			'Zekrom',
			'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew', 'Illusion', 'Shadow Tag', 'Chatter',
		],
		onValidateSet: function (set) {
			let bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
	},
	{
		name: "STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547279/\">STABmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558034/\">STABmons Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['OU'],
		banlist: ['Ignore STAB Moves', 'Aerodactylite', "King's Rock", 'Metagrossite', 'Razor Fang'],
	},
	{
		name: "LC UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3523929/\">LC UU</a>"],
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Anorith', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Corphish', 'Cottonee',
			'Croagunk', 'Diglett', 'Drifloon', 'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus',
			'Gastly', 'Gothita', 'Houndour', 'Larvesta', 'Magnemite', 'Mienfoo', 'Munchlax', 'Omanyte', 'Onix', 'Pancham',
			'Pawniard', 'Ponyta', 'Porygon', 'Pumpkaboo-Super', 'Scraggy', 'Shellder', 'Skrelp', 'Snivy', 'Snubbull',
			'Spritzee', 'Staryu', 'Stunky', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby', 'Vulpix', 'Zigzagoon',
			'Shell Smash',
		],
	},
	{
		name: "Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],
		section: "Other Metagames",

		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "2v2 Doubles",
		desc: [
			"Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547040/\">2v2 Doubles</a>",
		],
		section: "Other Metagames",

		gameType: 'doubles',
		searchShow: false,
		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['Doubles OU'],
		banlist: ['Perish Song'],
	},
	{
		name: "Averagemons",
		desc: [
			"Every Pok&eacute;mon has a stat spread of 100/100/100/100/100/100.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526481/\">Averagemons</a>",
		],
		section: "Other Metagames",

		searchShow: false,
		mod: 'averagemons',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Sableye + Prankster', 'Shedinja', 'Smeargle', 'Venomoth',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Gengarite', 'Kangaskhanite', 'Light Ball', 'Mawilite', 'Medichamite', 'Soul Dew', 'Thick Club',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
	},
	{
		name: "Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3516349/\">Hidden Type</a>",
		],
		section: "Other Metagames",

		searchShow: false,
		mod: 'hiddentype',
		ruleset: ['OU'],
	},
	{
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],
		section: "Other Metagames",

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU'],
	},
	{
		name: "Gen-NEXT OU",
		section: "Other Metagames",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},
	{
		name: "Monotype Random Battle",
		section: "Other Metagames",

		team: 'randomMonotype',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},

	{
		name: "Mix and Mega",
		section: "Other Metagames",
		column: 2,

		mod: 'mixandmega',
		ruleset: ['Ubers'],
		banlist: ['Gengarite', 'Shadow Tag', 'Dynamic Punch', 'Zap Cannon', 'Electrify'],
		onValidateTeam: function (team, format) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (itemTable[item] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.tools.getItem(item).name + ")"];
				if (itemTable[item] && (item.id === 'redorb' || item.id === 'blueorb')) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.tools.getItem(item).name + ")"];
				itemTable[item] = true;
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (item.id === 'redorb' && template.baseSpecies === 'Groudon') || (item.id === 'blueorb' && template.baseSpecies === 'Kyogre')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			if (template.tier === 'Uber') return ["" + template.species + " is not allowed to hold " + item.name + " because it's in the Uber tier."];
			if (template.species === 'Shuckle' && ['abomasite', 'aggronite', 'audinite', 'cameruptite', 'charizarditex', 'charizarditey', 'galladite', 'gyaradosite', 'heracronite', 'houndoominite', 'latiasite', 'mewtwonitey', 'sablenite', 'salamencite', 'scizorite', 'sharpedonite', 'slowbronite', 'steelixite', 'tyranitarite', 'venusaurite'].indexOf(item.id) >= 0) {
				return ["" + template.species + " is not allowed to hold " + item.name + "."];
			}
			let bannedMons = {'Cresselia':1, 'Dragonite':1, 'Kyurem-Black':1, 'Lucario':1, 'Slaking':1, 'Smeargle':1, 'Regigigas':1};
			if (template.species in bannedMons) {
				return ["" + template.species + " is not allowed to hold a Mega Stone."];
			}
			if (item.id === 'beedrillite' || item.id === 'kangaskhanite') {
				return ["" + item.name + " can only allowed be held by " + item.megaEvolves + "."];
			}
			switch (item.id) {
			case 'blazikenite':
				if (!template.abilities.hasOwnProperty('Speed Boost')) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mawilite': case 'medichamite':
				let powerAbilities = {'Huge Power':1, 'Pure Power':1};
				if (powerAbilities.hasOwnProperty(set.ability)) break;
				if (!template.otherFormes) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				let allowedPower = false;
				for (let i = 0; i < template.otherFormes.length; i++) {
					let altTemplate = this.getTemplate(template.otherFormes[i]);
					if ((altTemplate.isMega || altTemplate.isPrimal) && powerAbilities.hasOwnProperty(altTemplate.abilities['0'])) {
						allowedPower = true;
						break;
					}
				}
				if (!allowedPower) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'slowbronite':
				if (template.species === 'Regirock' || template.species === 'Steelix') return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mewtwonitey':
				if (template.baseStats.def <= 20) return ["" + template.species + " does not have enough Defense to hold " + item.name + "."];
				break;
			case 'diancite':
				if (template.baseStats.def <= 40 || template.baseStats.spd <= 40) return ["" + template.species + " does not have enough Def. or Sp. Def. to hold " + item.name + "."];
				break;
			case 'ampharosite': case 'garchompite': case 'heracronite':
				if (template.baseStats.spe <= 10) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			case 'cameruptite':
				if (template.baseStats.spe <= 20) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			case 'abomasite': case 'sablenite':
				if (template.baseStats.spe <= 30) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			}
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchInPriority: -6,
		onSwitchIn: function (pokemon) {
			let item = pokemon.getItem();
			if (pokemon.isActive && !pokemon.template.isMega && !pokemon.template.isPrimal && (item.id === 'redorb' || item.id === 'blueorb') && pokemon.baseTemplate.tier !== 'Uber' && !pokemon.template.evos.length) {
				// Primal Reversion
				let bannedMons = {'Cresselia':1, 'Dragonite':1, 'Kyurem-Black':1, 'Lucario':1, 'Regigigas':1, 'Slaking':1, 'Smeargle':1};
				if (!(pokemon.baseTemplate.baseSpecies in bannedMons)) {
					let template = this.getMixedTemplate(pokemon.originalSpecies, item.id === 'redorb' ? 'Groudon-Primal' : 'Kyogre-Primal');
					pokemon.formeChange(template);
					pokemon.baseTemplate = template;

					// Do we have a proper sprite for it?
					if (pokemon.originalSpecies === (item.id === 'redorb' ? 'Groudon' : 'Kyogre')) {
						pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						this.add('detailschange', pokemon, pokemon.details);
					} else {
						let oTemplate = this.getTemplate(pokemon.originalSpecies);
						this.add('-formechange', pokemon, oTemplate.species, template.requiredItem);
						this.add('-start', pokemon, this.getTemplate(template.originalMega).requiredItem, '[silent]');
						if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
							this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
						}
					}
					this.add('message', pokemon.name + "'s " + pokemon.getItem().name + " activated!");
					this.add('message', pokemon.name + "'s Primal Reversion! It reverted to its primal form!");
					pokemon.setAbility(template.abilities['0']);
					pokemon.baseAbility = pokemon.ability;
					pokemon.canMegaEvo = false;
				}
			} else {
				let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
				if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
					let oTemplate = this.getTemplate(pokemon.originalSpecies);
					if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
					}
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},

	{
		name: "Type Omelette",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'typeomelette',
		//Since this metagame uses custom types, let's make the types known to the players.
		onSwitchIn: function (pokemon) {
			let typeStr = pokemon.types[0];
			if (pokemon.types[1]) typeStr += '/' + pokemon.types[1];
			this.add('-start', pokemon, 'typechange', typeStr);
		},
	},

	{
		name: "Accessorize",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3546902/\">Accessorize</a>"],
		section: "Other Metagames",

		mod: 'accessorize',
		ruleset: ['Ubers'],
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			switch (item.id) {
			case 'charcoal': case 'spelltag': case 'magnet': case 'sharpbeak': case 'dragonfang': case 'nevermeltice':
				if (template.baseStats.def <= 5 || template.baseStats.spd <= 5) return ["" + template.species + " does not have enough Def. or Sp. Def. to hold " + item.name + "."];
				break;
			case 'mysticwater': case 'hardstone': case 'cherishball': case 'metalcoat': case 'miracleseed': case 'poisonbarb':
				if (template.baseStats.spe <= 10) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			case 'twistedspoon': case 'silkscarf': case 'blackglasses':
				if (template.baseStats.def <= 10) return ["" + template.species + " does not have enough Defense to hold " + item.name + "."];
				break;
			case 'silverpowder': case 'softsand': case 'blackbelt':
				if (template.baseStats.spd <= 10) return ["" + template.species + " does not have enough Special Defense to hold " + item.name + "."];
				break;
			}
		},
	},
	{
		name: "Protean Palace",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		onBeforeMove: function (pokemon, target, move) {
			if (!move) return;
			let moveType = '';
			if (move.id === 'hiddenpower') {
				moveType = pokemon.hpType;
			} else if (move.type === 'Normal' && (pokemon.ignore ? !pokemon.ignore['Ability'] : true)) {
				switch (pokemon.ability) {
				case 'aerilate':
					moveType = 'Flying';
					break;
				case 'pixilate':
					moveType = 'Fairy';
					break;
				case 'refrigerate':
					moveType = 'Ice';
					break;
				default:
					moveType = 'Normal';
				}
			} else {
				moveType = move.type;
			}
			if (pokemon.getTypes().join() !== moveType) {
				this.add('-start', pokemon, 'typechange', moveType);
				pokemon.setType(moveType);
			}
		},
	},
	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",
		column: 3,

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},
	{
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: [],
	},
	{
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	},
	{
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	},
	{
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	},
	{
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela'],
	},
	{
		name: "[Gen 5] GBU Singles",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Random Battle",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		challengeShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
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
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] Doubles OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3485044/\">BW2 Doubles Viability Ranking</a>"],
		section: 'BW2 Doubles',
		column: 3,

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop',
		],
	},
	{
		name: "[Gen 5] GBU Doubles",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
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
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],
		section: "Past Generations",
		column: 3,

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	},
	{
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	},
	{
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma'],
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
		ruleset: ['Cancel Mod'],
	},
	{
		name: "[Gen 4] Doubles Custom Game",
		section: 'Past Generations',

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},
	{
		name: "[Gen 3] OU",
		section: "Past Generations",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Random Battle",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: [],
	},
	{
		name: "[Gen 1] OU (tradeback)",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Random Battle",
		section: "Past Generations",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Challenge Cup",
		section: "Past Generations",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Stadium",
		section: "Past Generations",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},

	// TPP League exclusives
	{
		name: "TPPLA",
		section: "TPP",
		mod: 'tppla',
		column: 4,

		ruleset: ['Custom Game', 'Sleep Clause Mod', 'HP Percentage Mod'],
	},
	{
		name: "TPPLA Doubles",
		section: "TPP",
		mod: 'tppla',

		gameType: 'doubles',
		ruleset: ['Custom Game', 'Sleep Clause Mod', 'HP Percentage Mod'],
	},
	{
		name: "TPPLA Triples",
		section: "TPP",
		mod: 'tppla',

		gameType: 'triples',
		ruleset: ['Custom Game', 'Sleep Clause Mod', 'HP Percentage Mod'],
	},
	{
		name: "Super TPPL Bros.",
		section: "STPPLB",
		column: 4,

		mod: 'stpplb',
		searchShow: true,
		team: 'randomtpplb',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onUpdate: function (pokemon) { // called whenever a pokemon changes
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) { // some foolery to give megas their proper ability
				if (name === 'darkfiregamer' && pokemon.getAbility().id === 'solarpower') {
					pokemon.setAbility('darkaura');
				}
				if (name === 'dictatormantis' && pokemon.getAbility().id === 'technician') {
					pokemon.setAbility('Technicality');
				}
				if (name === 'hazorex' && pokemon.getAbility().id !== 'physicalakazam') {
					pokemon.setAbility('Physicalakazam');
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (pokemon.template.isMega) { // more hackery for mega abilities.
				if (name === 'darkfiregamer' && pokemon.getAbility().id === 'solarpower') {
					pokemon.setAbility('darkaura');
				}
				if (name === 'dictatormantis' && pokemon.getAbility().id === 'technician') {
					pokemon.setAbility('Technicality');
				}
				if (name === 'hazorex' && pokemon.getAbility().id !== 'physicalakazam') {
					pokemon.setAbility('Physicalakazam');
				}
			} else {
				pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
			}
			if (name === 'somasghost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.typesData = [
					{type: 'Normal', suppressed: false,  isAdded: false},
					{type: 'Ghost', suppressed: false,  isAdded: false},
				];
			}
			if (name === 'pikalaxalt') {
				this.boost({def:1, spd:1}, pokemon);
			}
			if (name === 'xfix') {
				this.add("c|xfix|YayBot will be updated soon, okay?");
			} else if (name === 'azum4roll') {
				this.add("c|azum4roll|What? I'm just a normal Azumarill.");
			} else if (name === 'lasszeowx') {
				this.add("c|Lass zeowx|Oh, a new challenger?");
			} else if (name === 'kapnkooma') {
				this.add("c|Kap'n Kooma|Hoist the black flag lads!");
			} else if (name === 'kooma9') {
				this.add("c|Kooma9|ello");
			} else if (name === 'best') {
				this.add("raw|<big>GO AWAY</big>");
			} else if (name === 'poomph') {
				this.add("c|Poomph|I'm sure I'll win this time!");
			} else if (name === 'tadpole_0f_doom') {
				this.add("c|Tadpole_0f_Doom|I'm not racist. I own Pokemon Black. TriHard");
			} else if (name === 'trollkitten') {
				this.add("c|TrollKitten|Have time to listen to my lore?");
			} else if (name === 'bigfatmantis') {
				this.add("c|BigFatMantis|gldhf");
			} else if (name === 'nofunmantis') {
				this.add("c|NoFunMantis|gldhf");
			} else if (name === 'dictatormantis') {
				this.add("c|DictatorMantis|Do you even have enough yays to be battling?");
			} else if (name === 'xinc') {
				this.add("c|Xinc|Iwa took Gengar. DansGame");
			} else if (name === 'natsugan') {
				this.add('c|Natsugan|Flygonite when');
			} else if (name === 'pikalaxalt') {
				this.add('c|PikalaxALT|ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ');
			} else if (name === 'colewalski') {
				this.add('c|ColeWalski|Allons-y and GERONIMOOO!');
			} else if (name === 'liria10') {
				this.add("c|Liria_10|let's draw all night!");
			} else if (name === 'speedypokson') {
				this.add("c|Speedy Pokson|YOU'RE TOO SLOW!");
			} else {
				this.add('c|' + (pokemon.illusion ? pokemon.illusion.name : pokemon.name) + '|PLACEHOLDER MESSAGE PLEASE CONTACT TIESOUL');
			}
			let item = pokemon.getItem();
			if (pokemon.isActive && !pokemon.template.isMega && !pokemon.template.isPrimal && (item.id === 'redorb' || item.id === 'blueorb') && pokemon.baseTemplate.tier !== 'Uber' && !pokemon.template.evos.length) {
				// Primal Reversion
				let bannedMons = {'Kyurem-Black':1, 'Slaking':1, 'Regigigas':1, 'Cresselia':1, 'Shuckle':1};
				if (!(pokemon.baseTemplate.baseSpecies in bannedMons)) {
					let template = this.getMixedTemplate(pokemon.originalSpecies, item.id === 'redorb' ? 'Groudon-Primal' : 'Kyogre-Primal');
					pokemon.formeChange(template);
					pokemon.baseTemplate = template;

					// Do we have a proper sprite for it?
					if (pokemon.originalSpecies === (item.id === 'redorb' ? 'Groudon' : 'Kyogre')) {
						pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						this.add('detailschange', pokemon, pokemon.details);
					} else {
						let oTemplate = this.getTemplate(pokemon.originalSpecies);
						this.add('-formechange', pokemon, oTemplate.species, template.requiredItem);
						this.add('-start', pokemon, this.getTemplate(template.originalMega).requiredItem, '[silent]');
						if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
							this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
						}
					}
					this.add('message', pokemon.name + "'s " + pokemon.getItem().name + " activated!");
					this.add('message', pokemon.name + "'s Primal Reversion! It reverted to its primal form!");
					pokemon.setAbility(template.abilities['0']);
					pokemon.baseAbility = pokemon.ability;
					pokemon.canMegaEvo = false;
				}
			} else {
				let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
				if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
					let oTemplate = this.getTemplate(pokemon.originalSpecies);
					if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
					}
				}
			}
		},

		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},

		onFaint: function (pokemon) { // PJSalt-y faint messages go here.
			let name = toId(pokemon.name);
			if (name === 'xfix') {
				this.add("c|xfix|I'm not going to update YayBot if you defeat me like that...");
			} else if (name === 'azum4roll') {
				this.add("c|azum4roll|This game doesn't have enough glitches!");
			} else if (name === 'lasszeowx') {
				this.add("c|Lass zeowx|When can I beat TPPLA BibleThump");
			} else if (name === 'kapnkooma') {
				this.add("c|Kap'n Kooma|Avast! I be needing a pint of grog after this.");
			} else if (name === 'kooma9') {
				this.add("c|Kooma9|Most Disappointing Player 2015");
			} else if (name === 'best') {
				this.add("raw|<big>BEST? FALLED</big>");
			} else if (name === 'poomph') {
				this.add("c|Poomph|0/4 again. DansGame");
			} else if (name === 'tadpole_0f_doom') {
				this.add("c|Tadpole_0f_Doom|You'll never take me alive!");
			} else if (name === 'trollkitten') {
				this.add("c|TrollKitten|I need time away from the sub to clear my head after this.");
			} else if (name === 'bigfatmantis') {
				this.add("c|BigFatMantis|GGioz");
			} else if (name === 'nofunmantis') {
				this.add("c|NoFunMantis|GGCtrl27");
			} else if (name === 'dictatormantis') {
				this.add("c|DictatorMantis|bg DansGame");
			} else if (name === 'xinc') {
				this.add("c|Xinc|Bruh");
			} else if (name === 'natsugan') {
				this.add('c|Natsugan|hax imo');
			} else if (name === 'pikalaxalt') {
				this.add('c|PikalaxALT|Wow Deku OneHand');
			} else if (name === 'colewalski') {
				this.add('c|ColeWalski|Dced again');
			} else if (name === 'liria10') {
				this.add('c|Liria_10|why is art so difficult ;_;');
			} else if (name === 'speedypokson') {
				this.add("c|Speedy Pokson|C'MON, STEP IT UP!");
			}
		},
		onBegin: function () {
			// Mix and Mega stuff
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
			this.add('-message', "STPPLB wiki with all Pokemon descriptions: https://www.reddit.com/r/TPPLeague/wiki/stpplb");
		},
	},

	{
		name: 'Super Glitch',
		section: 'STPPLB',
		column: 2,
		searchShow: true,
		mod: 'stpplb',
		ruleset: ['Super Glitch Clause', 'HP Percentage Mod', 'Species Clause', 'Cancel Mod', 'No Switching Clause', 'No Recycle Clause', 'Ability Clause', 'Team Preview'],
		banlist: ['No Fun Allowed', 'Wonder Guard', 'Physicalakazam', 'Defiant Plus', 'Messiah', 'Cursed Body', 'Moody', 'Little Engine', 'Unnerve', 'Magician', 'Pickpocket', 'Imposter', 'Iron Barbs', 'Rough Skin'],
		maxLevel: 100,
		defaultLevel: 100,

		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let item = pokemon.getItem();
			if (pokemon.isActive && !pokemon.template.isMega && !pokemon.template.isPrimal && (item.id === 'redorb' || item.id === 'blueorb') && pokemon.baseTemplate.tier !== 'Uber' && !pokemon.template.evos.length) {
				// Primal Reversion
				let bannedMons = {'Kyurem-Black':1, 'Slaking':1, 'Regigigas':1, 'Cresselia':1, 'Shuckle':1};
				if (!(pokemon.baseTemplate.baseSpecies in bannedMons)) {
					let template = this.getMixedTemplate(pokemon.originalSpecies, item.id === 'redorb' ? 'Groudon-Primal' : 'Kyogre-Primal');
					pokemon.formeChange(template);
					pokemon.baseTemplate = template;

					// Do we have a proper sprite for it?
					if (pokemon.originalSpecies === (item.id === 'redorb' ? 'Groudon' : 'Kyogre')) {
						pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						this.add('detailschange', pokemon, pokemon.details);
					} else {
						let oTemplate = this.getTemplate(pokemon.originalSpecies);
						this.add('-formechange', pokemon, oTemplate.species, template.requiredItem);
						this.add('-start', pokemon, this.getTemplate(template.originalMega).requiredItem, '[silent]');
						if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
							this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
						}
					}
					this.add('message', pokemon.name + "'s " + pokemon.getItem().name + " activated!");
					this.add('message', pokemon.name + "'s Primal Reversion! It reverted to its primal form!");
					pokemon.setAbility(template.abilities['0']);
					pokemon.baseAbility = pokemon.ability;
					pokemon.canMegaEvo = false;
				}
			} else {
				let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
				if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
					let oTemplate = this.getTemplate(pokemon.originalSpecies);
					if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
					}
				}
			}
		},

		onBegin: function () {
			// Mix and Mega stuff
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
			this.add('-message', "STPPLB wiki with all ability descriptions: https://www.reddit.com/r/TPPLeague/wiki/stpplb");
		},
	},

	{
		name: 'Snowball Fight',
		section: 'TPP League',
		column: 4,
		ruleset: ['Ubers'],
		banlist: [],
		mod: 'snowballfight',
		onValidateSet: function (set) {
			set.moves.push('fling');
		},
		onBeforeTurn: function () {
			if (!this.p1.snowballs) {
				this.p1.snowballs = 0;
			}
			if (!this.p2.snowballs) {
				this.p2.snowballs = 0;
			}
		},
		onFaintPriority: 100,
		onFaint: function (pokemon) {
			if (pokemon.side.pokemonLeft === 1) {
				if (this.p1.snowballs > this.p2.snowballs) {
					this.win(this.p1);
				} else if (this.p2.snowballs > this.p1.snowballs) {
					this.win(this.p2);
				}
			}
		},
	},
];
let stpplb;
let stpplbi;
for (let i = 0; i < exports.Formats.length; i++) {
	if (exports.Formats[i].name === 'Super TPPL Bros.') {
		stpplb = exports.Formats[i];
		stpplbi = i;
	}
}
if (stpplb) {
	exports.Formats.splice(stpplbi + 1, 0, {
		name: "Super TPPL Bros. Plus",
		section: "STPPLB",
		column: 2,

		mod: 'stpplb',
		searchShow: true,
		team: 'randomtpplbp',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onUpdate: stpplb.onUpdate,
		onModifyMove: stpplb.onModifyMove,
		onSwitchInPriority: 1,
		onSwitchIn: stpplb.onSwitchIn,
		onFaint: stpplb.onFaint,
		onBegin: stpplb.onBegin,
	}, {
		name: "Super TPP Bros.",
		section: "STPPLB",
		column: 2,

		mod: 'stpplb',
		searchShow: true,
		team: 'randomtppb',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onUpdate: stpplb.onUpdate,
		onModifyMove: stpplb.onModifyMove,
		onSwitchInPriority: 1,
		onSwitchIn: stpplb.onSwitchIn,
		onFaint: stpplb.onFaint,
		onBegin: stpplb.onBegin,
	}, {
		name: "Super TPPL Bros. Testing",
		section: "STPPLB",
		column: 2,

		mod: 'stpplb',
		searchShow: false,
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		onUpdate: stpplb.onUpdate,
		onModifyMove: stpplb.onModifyMove,
		onSwitchInPriority: 1,
		onSwitchIn: stpplb.onSwitchIn,
		onFaint: stpplb.onFaint,
		onBegin: stpplb.onBegin,
	});
}
