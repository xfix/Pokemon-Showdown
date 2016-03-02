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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3564252/\">np: RU Stage 14</a>",
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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3563816/\">np: NU Stage 11</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545276/\">NU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['RU'],
		banlist: ['RU', 'BL3'],
	},
	{
		name: "NU (suspect test)",
		section: "ORAS Singles",

		ruleset: ['NU'],
		banlist: ['Sawk'],
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
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore',
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
		banlist: ['Aegislash', 'Amoonguss', 'Azumarill', 'Bisharp', 'Breloom', 'Camerupt-Mega', 'Cameruptite', 'Chandelure',
			'Charizard-Mega-Y', 'Charizardite Y', 'Conkeldurr', 'Cresselia', 'Diancie-Mega', 'Diancite', 'Dragonite', 'Ferrothorn', 'Garchomp',
			'Gardevoir-Mega', 'Gardevoirite', 'Gengar', 'Greninja', 'Gyarados', 'Heatran', 'Hoopa-Unbound', 'Hydreigon', 'Jirachi',
			'Kangaskhan-Mega', 'Kangaskhanite', 'Keldeo', 'Kyurem-Black', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Mawile-Mega', 'Mawilite',
			'Mew', 'Milotic', 'Ninetales', 'Politoed', 'Rotom-Wash', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Sylveon', 'Talonflame',
			'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Victini', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	},
	{
		name: "Doubles NU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Doubles UU'],
		banlist: ['Abomasnow-Mega', 'Abomasite', 'Aerodactyl-Mega', 'Aerodactylite', 'Altaria-Mega', 'Altarianite',
			'Ambipom', 'Arcanine', 'Aromatisse', 'Aurorus', 'Blastoise-Mega', 'Blastoisinite', 'Bronzong', 'Clawitzer',
			'Cofagrigus', 'Cradily', 'Crawdaunt', 'Crobat', 'Deoxys-Attack', 'Doublade', 'Dusclops', 'Eelektross',
			'Entei', 'Escavalier', 'Espeon', 'Excadrill', 'Gastrodon', 'Genesect', 'Hariyama', 'Hitmontop', 'Infernape',
			'Jellicent', 'Jolteon', 'Klefki', 'Krookodile', 'Kyurem', 'Landorus', 'Liepard', 'Lopunny-Mega', 'Lopunnite',
			'Lucario-Mega', 'Lucarionite', 'Machamp', 'Mamoswine', 'Manaphy', 'Meowstic', 'Metagross-Mega', 'Metagrossite',
			'Murkrow', 'Nidoking', 'Porygon2', 'Reuniclus', 'Rhyperior', 'Rotom-Heat', 'Sableye', 'Salamence',
			'Sceptile-Mega', 'Sceptilite', 'Scizor', 'Slowking', 'Snorlax', 'Togetic', 'Tornadus', 'Vaporeon', 'Volcarona',
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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560820/\">Battle Spot Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560824/\">Battle Spot Doubles Viability Ranking</a>",
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
		name: "Skillmons OU",
		section: "Skillmons",
		column: 2,

		mod: 'skillmons',
		ruleset: ['Pokemon', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'Endless Battle Clause', 'Exact HP Mod', 'Baton Pass Clause'],
		banlist: ['Unreleased', 'Illegal', 'Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite'],
	},
	{
		name: "Skillmons Ubers",
		section: "Skillmons",
		searchShow: false,

		mod: 'skillmons',
		ruleset: ['Pokemon', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'Endless Battle Clause', 'Exact HP Mod', 'Baton Pass Clause', 'Mega Rayquaza Clause'],
		banlist: ['Unreleased', 'Illegal'],
	},
	{
		name: "Mix and Mega",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">Mix and Mega</a>"],
		section: "OM of the Month",
		column: 2,

		mod: 'mixandmega',
		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Gengarite', 'Shadow Tag', 'Dynamic Punch', 'Electrify', 'Zap Cannon'],
		onValidateTeam: function (team, format) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (itemTable[item] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.getItem(item).name + ")"];
				if (itemTable[item] && (item.id === 'redorb' || item.id === 'blueorb')) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.getItem(item).name + ")"];
				itemTable[item] = true;
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (item.id === 'redorb' && template.baseSpecies === 'Groudon') || (item.id === 'blueorb' && template.baseSpecies === 'Kyogre')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			if (template.tier === 'Uber' || template.species in {'Cresselia':1, 'Dragonite':1, 'Kyurem-Black':1, 'Lucario':1, 'Manaphy':1, 'Slaking':1, 'Smeargle':1, 'Regigigas':1}) {
				return ["" + template.species + " is not allowed to hold " + item.name + "."];
			}
			if (template.species === 'Shuckle' && ['aggronite', 'audinite', 'charizarditex', 'charizarditey', 'galladite', 'gyaradosite', 'houndoominite', 'latiasite', 'salamencite', 'scizorite', 'sharpedonite', 'steelixite', 'tyranitarite', 'venusaurite'].indexOf(item.id) >= 0) {
				return ["" + template.species + " is not allowed to hold " + item.name + "."];
			}
			let powerAbilities = {'Huge Power':1, 'Pure Power':1};
			let allowedPower = false;
			switch (item.id) {
			case 'beedrillite': case 'kangaskhanite':
				return ["" + item.name + " can only allowed be held by " + item.megaEvolves + "."];
			case 'blazikenite':
				if (set.ability !== 'Speed Boost') return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mawilite': case 'medichamite':
				if (powerAbilities.hasOwnProperty(set.ability)) break;
				if (!template.otherFormes) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				for (let i = 0; i < template.otherFormes.length; i++) {
					let altTemplate = this.getTemplate(template.otherFormes[i]);
					if ((altTemplate.isMega || altTemplate.isPrimal) && powerAbilities.hasOwnProperty(altTemplate.abilities['0'])) {
						allowedPower = true;
						break;
					}
				}
				if (!allowedPower) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mewtwonitey':
				if (template.baseStats.def <= 20) return ["" + template.species + " does not have enough Defense to hold " + item.name + "."];
				break;
			case 'diancite':
				if (template.baseStats.def <= 40 || template.baseStats.spd <= 40) return ["" + template.species + " does not have enough Def. or Sp. Def. to hold " + item.name + "."];
				break;
			case 'slowbronite':
				if (template.baseStats.def > 185) return ["" + template.species + " is not allowed to hold " + item.name + "."];
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
		name: "VoltTurn Mayhem",
		desc: [
			"All Pok&eacute;mon automatically switch out upon using a move that affects the opponent.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527847/\">VoltTurn Mayhem</a>",
		],
		column: 2,
		section: "Seasonals",

		ruleset: ['OU'],
		banlist: [],
		onValidateTeam: function (team, format) {
			let fakeCount = 0;
			let move = {};
			for (let i = 0; i < team.length; i++) {
				if (team[i].moves) {
					for (let j = 0; j < team[i].moves.length; j++) {
						move = this.getMove(team[i].moves[j]);
						if (move.id === "fakeout" && fakeCount > 0) return ["You are limited to one user of Fake Out per team.", "(" + (team[i].name || team[i].species) + " has Fake Out)"];
						if (move.id === "fakeout") fakeCount += 1;
					}
				}
			}
		},
		onModifyMove: function (move) {
			let validTargets = {"normal":1, "any":1, "randomNormal":1, "allAdjacent":1, "allAdjacentFoes":1, "scripted":1};
			if (move.target && !move.nonGhostTarget && (move.target in validTargets)) move.selfSwitch = true;
		},
	},
	{
		name: "[Seasonal] Dimension Doom",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "OM of the Month",
		team: 'randomSeasonalDimensional',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('-message', "The world is about to end!");
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				if (pokemon.set.signatureMove) {
					let last = pokemon.moves.length - 1;
					if (pokemon.moves[last]) {
						pokemon.moves[last] = toId(pokemon.set.signatureMove);
						pokemon.moveset[last].move = pokemon.set.signatureMove;
						pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
					}
				}
			}
		},
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (name === 'rick') {
				this.add('-message', 'WUBBA LUBBA DUB DUB!!');
			}
			if (name === 'morty') {
				this.add('-message', "I-I'm not sure t-this is a good idea, Rick!");
			}
			if (name === 'mrmeeseks') {
				this.add('-message', "Hi! I'm Mr. Meeseks! Look at me!");
			}
			if (name === 'birdperson') {
				this.add('-message', "It's been a tough mating season for birdperson.");
			}
			if (name === 'squanch') {
				this.add('-message', "You're getting squanched, squanch!");
			}
			if (name === 'mortyjr') {
				this.add('-message', 'The government is lame!');
			}
			if (name === 'dipper') {
				this.add('-message', 'A mystery to solve!');
			}
			if (name === 'mabel') {
				this.add('-message', 'Yay! Splinters!');
			}
			if (name === 'stanley') {
				this.add('-message', 'Discount punches! No refunds!');
			}
			if (name === 'stanford') {
				this.add('-message', 'Being a hero means fighting back even when it seems impossible.');
			}
			if (name === 'snowball') {
				this.add('-message', 'You may call me snowball, because my fur is white and pretty.');
			}
			if (name === 'billcipher') {
				this.add('-message', 'Let the weirdmaggedon start! HAHAHA!');
			}
			if (name === 'lilgideon') {
				this.add('-message', 'I can buy and sell you, old man!');
			}
		},
		onModifyMove: function (move, pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (move.id === 'watergun' && name in {'rick':1, 'evilrick':1}) {
				move.name = 'Portal Gun';
				move.type = 'Psychic';
				move.basePower = 66;
				move.accuracy = true;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Hyper Beam", target);
				};
				switch (this.random(6)) {
				case 0:
					move.volatileStatus = 'confusion';
					move.onHit = function () {
						this.add('-message', "This weird dimension confuses you!");
					};
					break;
				case 1:
					move.category = 'embargo';
					move.onHit = function () {
						this.add('-message', "Your item got sucked by the dimension hole!");
					};
					break;
				case 2:
					move.forceSwitch = true;
					move.onHit = function () {
						this.add('-message', "You got sucked into the portal!");
					};
					break;
				case 3:
					move.basePower = 150;
					move.type = 'Fire';
					move.onHit = function () {
						this.add('-message', "Flames came out of the portal gun!");
					};
					break;
				case 4:
					move.basePower = 130;
					move.type = 'Poison';
					move.status = 'tox';
					move.onHit = function () {
						this.add('-message', "Toxic air came out of the portal gun!");
					};
					break;
				case 5:
					move.basePower = 45;
					move.multihit = 3;
					move.type = 'Bug';
					move.onHit = function () {
						this.add('-message', "Tentacles came out of the portal gun!");
					};
					break;
				}
			}
			if (move.id === 'outrage' && name === 'morty') {
				move.name = 'Morty Rage';
				move.type = 'Fighting';
				move.basePower = 200;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Outrage", target);
					this.add('-message', 'Morty grew tired of your shennanigans!');
				};
			}
			if (move.id === 'kinesis' && name === 'evilmorty') {
				move.name = 'Mind Control';
				move.volatileStatus = 'confusion';
				move.category = 'Special';
				move.type = 'Fire';
				move.basePower = 50;
				move.boosts = {accuracy: -1};
			}
			if (move.id === 'dreameater' && name === 'scaryterry') {
				move.name = 'Super Dream Eater';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Hyper Beam", target);
				};
				move.onBasePower = function (basePower, attacker, defender) {
					if (defender.status && defender.status === 'slp') {
						return this.chainModify(2);
					}
				};
			}
			if (move.id === 'bulkup' && name === 'squanchy') {
				move.name = 'Squanch Up';
				move.boosts = {atk: 2, def: 2};
			}
			if (move.id === 'recycle') {
				move.name = 'Pines Recycle';
				move.heal = [2, 3];
			}
			if (move.id === 'psychic' && name === 'mabel') {
				move.name = 'Grappling Hook';
				move.basePower = 110;
				move.heal = [2, 3];
				this.add('-message', 'GRAPPLING HOOK!');
			}
			if (move.id === 'thunder' && name === 'billcipher') {
				move.name = 'Bill Thunder';
				move.basePower = 200;
			}
			if (move.id === 'tackle' && name === 'stanley') {
				move.name = 'Baseball Bat';
				move.basePower = 135;
				move.volatileStatus = 'confusion';
			}
			if (move.id === 'hyperbeam' && name === 'stanford') {
				move.name = 'Dimensional Sniper';
				move.category = 'Physical';
				move.basePower = 300;
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Origin Pulse", target);
				};
			}
		},
	},
	{
		name: "[Seasonal] Super Staff Bros. Melee",
		section: "Seasonals",

		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|Super Staff Bros. **MELEEEEEEEEEEEEEE**!!");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
				for (let j = 0; j < pokemon.moveset.length; j++) {
					let moveData = pokemon.moveset[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveset[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Here we add some flavour or design immunities.
		onImmunity: function (type, pokemon) {
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine');
				}
				if (name === 'crestfall' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('simple');
				}
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			//let oldAbility = pokemon.ability; //TODO
			if (pokemon.template.isMega) {
				if (name === 'theimmortal' && pokemon.getAbility().id !== 'cloudnine') {
					pokemon.setAbility('cloudnine');
				}
				if (name === 'crestfall' && pokemon.getAbility().id !== 'simple') {
					pokemon.setAbility('simple');
				}
			}

			// Add here special typings, done for flavour mainly.
			if (name === 'qtrx') {
				this.add('-message', pokemon.name + " is radiating an Unown aura!");
				if (!pokemon.illusion) {
					pokemon.addVolatile('unownaura');
					this.add('-start', pokemon, 'typechange', 'Normal/Psychic');
					pokemon.typesData = [
						{type: 'Normal', suppressed: false,  isAdded: false},
						{type: 'Psychic', suppressed: false,  isAdded: false},
					];
				}
				pokemon.addVolatile('focusenergy');
				this.boost({evasion: -1}, pokemon, pokemon, 'Unown aura');
			}

			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			let sentences = [];
			let sentence = '';

			if (name === 'am') {
				this.add('c|+AM|Lucky and Bad');
			}
			if (name === 'awu') {
				this.add('c|+awu|Fite me irl bruh.');
			}
			if (name === 'bumbadadabum') {
				this.add('c|@bumbadadabum|Time for card games on motorcycles!');
			}
			if (name === 'crestfall') {
				this.add('c|%Crestfall|To say that we\'re in love is dangerous');
			}
			if (name === 'gangnamstyle') {
				this.add("c|+Gangnam Style|Here I Come, Rougher Than The Rest of 'Em.");
			}
			if (name === 'joim') {
				let dice = this.random(3);
				// Revisiting classics.
				if (dice === 1) {
					this.add('-message', '░░░░░░░░▄▄▄▀▀▀▄▄███▄');
					this.add('-message', '░░░░░▄▀▀░░░░░░░▐░▀██▌');
					this.add('-message', '░░░▄▀░░░░▄▄███░▌▀▀░▀█');
					this.add('-message', '░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌');
					this.add('-message', '░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄');
					this.add('-message', '░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄');
					this.add('-message', '░░░░░░░░░░░░░▐░░░░▐███████████▄');
					this.add('-message', '░░blessed by░░░░▐░░░░▐█████████████▄');
					this.add('-message', '░░le toucan░░░░░░▀▄░░░▐██████████████▄');
					this.add('-message', '░░░░░░ of ░░░░░░░░▀▄▄████████████████▄');
					this.add('-message', '░░░░░luck░░░░░░░░░░░░░█▀██████');
				} else if (dice === 2) {
					this.add('c|~Joim|░░░░░░░░░░░░▄▐');
					this.add('c|~Joim|░░░░░░▄▄▄░░▄██▄');
					this.add('c|~Joim|░░░░░▐▀█▀▌░░░░▀█▄');
					this.add('c|~Joim|░░░░░▐█▄█▌░░░░░░▀█▄');
					this.add('c|~Joim|░░░░░░▀▄▀░░░▄▄▄▄▄▀▀');
					this.add('c|~Joim|░░░░▄▄▄██▀▀▀▀');
					this.add('c|~Joim|░░░█▀▄▄▄█░▀▀');
					this.add('c|~Joim|░░░▌░▄▄▄▐▌▀▀▀');
					this.add('c|~Joim|▄░▐░░░▄▄░█░▀▀ U HAVE BEEN SPOOKED');
					this.add('c|~Joim|▀█▌░░░▄░▀█▀░▀');
					this.add('c|~Joim|░░░░░░░▄▄▐▌▄▄ BY THE');
					this.add('c|~Joim|░░░░░░░▀███▀█░▄');
					this.add('c|~Joim|░░░░░░▐▌▀▄▀▄▀▐▄ SPOOKY SKILENTON');
					this.add('c|~Joim|░░░░░░▐▀░░░░░░▐▌');
					this.add('c|~Joim|░░░░░░█░░░░░░░░█');
					this.add('c|~Joim|░░░░░▐▌░░░░░░░░░█');
					this.add('c|~Joim|░░░░░█░░░░░░░░░░▐▌ SEND THIS TO 7 PPL OR SKELINTONS WILL EAT YOU');
				} else {
					sentences = [
						"Gen 1 OU is a true skill metagame.", "Finally a good reason to punch a teenager in the face!",
						"So here we are again, it's always such a pleasure.", "My ex-wife still misses me, BUT HER AIM IS GETTING BETTER!",
						"A man chooses, a slave obeys.", "You're gonna have a bad time.",
					].randomize();
					sentence = sentences[0];
					this.add('c|~Joim|' + sentence);
				}
			}
			if (name === 'lacuna') {
				this.add('c|%Lacuna|Introducing 7 time Grand Champion, Lacuna, to the battle!');
			}
			if (name === 'legitimateusername') {
				this.add('c|@LegitimateUsername|``And believe me I am still alive.``');
				this.add('c|@LegitimateUsername|``I\'m doing Science and I\'m still alive.``');
				this.add('c|@LegitimateUsername|``I feel FANTASTIC and I\'m still alive.``');
				this.add('c|@LegitimateUsername|``While you\'re dying I\'ll be still alive.``');
				this.add('c|@LegitimateUsername|``And when you\'re dead I will be still alive.``');
			}
			if (name === 'qtrx') {
				sentences = ["cutie are ex", "q-trix", "quarters", "cute T-rex", "Qatari", "random letters", "spammy letters", "asgdf"];
				this.add("c|@qtrx|omg DONT call me '" + sentences[this.random(8)] + "' pls respect my name its very special!!1!");
			}
			if (name === 'quitequiet') {
				this.add("c|%Quite Quiet|I'll give it a shot.");
			}
			if (name === 'solarisfox') {
				this.add('raw|<div class="chat chatmessage-solarisfox"><small>%</small><b><font color="#2D8F1E"><span class="username" data-name="SolarisFox">SolarisFox</span>:</font></b> <em><marquee behavior="alternate" scrollamount=3 scrolldelay="60" width="108">[Intense vibrating]</marquee></em></div>');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Give me my robe, put on my crown!');
			}
		},
		// Here we deal with some special mechanics due to custom sets and moves.
		onBeforeMove: function (pokemon, target, move) {
		},
		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			let name = toId(pokemon.name);
			let sentences = [];
			//let sentence = ''; //TO USE
			if (name === 'am') {
				this.add('c|+AM|RIP');
			}
			if (name === 'awu') {
				this.add("c|+awu|No need for goodbye. I'll see you on the flip side.");
			}
			if (name === 'bumbadadabum') {
				this.add("c|@bumbadadabum|Find another planet make the same mistakes.");
			}
			if (name === 'crestfall') {
				this.add("c|%Crestfall|Her pistol go (bang bang, boom boom, pop pop)");
			}
			if (name === 'gangnamstyle') {
				this.add("c|+Gangnam Style|The Great Emeralds power allows me to feel... ");
			}
			if (name === 'joim') {
				sentences = ['AVENGE ME, KIDS! AVEEEENGEEE MEEEEEE!!', 'OBEY!', '``This was a triumph, I\'m making a note here: HUGE SUCCESS.``', '``Remember when you tried to kill me twice? Oh how we laughed and laughed! Except I wasn\'t laughing.``', '``I\'m not even angry, I\'m being so sincere right now, even though you broke my heart and killed me. And tore me to pieces. And threw every piece into a fire.``'];
				this.add('c|~Joim|' + sentences[this.random(4)]);
			}
			if (name === 'lacuna') {
				this.add('c|%Lacuna|We need to go full out again soon...');
			}
			if (name === 'legitimateusername') {
				this.add('c|@LegitimateUsername|``This isn\'t brave. It\'s murder. What did I ever do to you?``');
			}
			if (name === 'qtrx') {
				sentences = ['Keyboard not found; press **Ctrl + W** to continue...', 'hfowurfbiEU;DHBRFEr92he', 'At least my name ain\t asgdf...'];
				this.add('c|@qtrx|' + sentences[this.random(3)]);
			}
			if (name === 'quitequiet') {
				this.add('c|%Quite Quiet|Well, I tried at least.');
			}
			if (name === 'solarisfox') {
				this.add('c|%SolarisFox|So long, and thanks for all the fish.');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Oh how wrong we were to think immortality meant never dying.');
			}
		},
		// Special switch-out events for some mons.
		onSwitchOut: function (pokemon) {
		},
		// Special drag out event for red card and shit.
		onDragOut: function (pokemon) {
			if (pokemon.isDuringAttack) {
				this.add('-message', "But the Unown Aura absorbed the effect!");
				return null;
			}
		},
		onAfterMoveSelf: function (source, target, move) {
		},
		onModifyPokemon: function (pokemon) {
			let name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			// qtrx only has one move anyway.
			if (name !== 'qtrx') {
				let moves = pokemon.moveset;
				if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
					for (let i = 0; i < 3; i++) {
						if (!moves[i].disabled) {
							pokemon.disableMove(moves[i].id, false);
							moves[i].disabled = true;
						}
					}
				}
			}
		},
		// Specific residual events for custom moves.
		// This allows the format to have kind of custom side effects and volatiles.
		onResidual: function (battle) {
			for (let s in battle.sides) {
				let thisSide = battle.sides[s];
				for (let p in thisSide.active) {
					let pokemon = thisSide.active[p];
					let name = toId(pokemon.name);

					if (name === 'gangnamstyle' && !pokemon.fainted && !pokemon.illusion) {
						this.heal(this.modify(pokemon.maxhp, 0.15), pokemon, pokemon);
						this.add('-message', pokemon.name + "'s Gonna Make You Sweat healed itself!");
					}
				}
			}
		},
		// This is where the signature moves are actually done.
		onModifyMove: function (move, pokemon) {
			// This is to make signature moves work when transformed.
			if (move.id === 'transform') {
				move.onHit = function (target, pokemon) {
					if (!pokemon.transformInto(target, pokemon)) return false;
					pokemon.originalName = pokemon.name;
					pokemon.name = target.name;
				};
			}

			// Prepare for Illusion.
			let name = toId(pokemon.illusion && move.sourceEffect === 'allyswitch' ? pokemon.illusion.name : pokemon.name);
			move.effectType = 'Move';

			if (move.id === 'pursuit' && name === 'am') {
				move.name = 'Predator';
				move.basePowerCallback = function (pokemon, target) {
					if (target.beingCalledBack) return 120;
					return 60;
				};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Pursuit", target);
				};
				move.boosts = {atk:-1, spa:-1, accuracy:-2};
			}
			if (move.id === 'furyswipes' && name === 'gangnamstyle') {
				move.name = 'Mother, Father, Gentleman';
				move.type = 'Dark';
				move.multihit = 3;
				move.basePower = 70;
			}
			if (move.id === 'triattack' && name === 'bumbadadabum') {
				move.name = 'Free Software';
				move.type = 'Electric';
				move.basePower = 110;
				move.accuracy = 95;
				move.secondary = {chance:30, status: 'par'};

				move.onHit = function () {
					this.add('c|@bumbadadabum|I\'d just like to interject for a moment. What you\'re referring to as Linux, is in fact, GNU/Linux, or as I\'ve recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.');
					this.add('c|@bumbadadabum|Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.');
					this.add('c|@bumbadadabum|There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine\'s resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!');
				};
			}
			if (move.id === 'lightofruin' && name === 'crestfall') {
				move.name = 'Light of Unruin';
				delete move.recoil;
				move.drain = [1, 2];
				move.self = {boosts: {def: -1, spd: -1}};
			}
			if (move.id === 'bubblebeam' && name === 'joim') {
				move.name = 'Gaster Blaster';
				move.type = 'Electric';
				move.basePower = 150;
				move.accuracy = 90;
				move.secondary = {};
				move.onEffectiveness = function (typeMod, type, move) {
					return typeMod + this.getEffectiveness('Ice', type);
				};
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Hyper Beam", target);
				};
				move.onAfterHit = function (target, source) {
					if (!target.fainted) {
						source.addVolatile('mustrecharge');
					}
				};
			}
			if (move.id === 'dynamicpunch' && name === 'lacuna') {
				move.name = 'Standing Full';
				move.basePower = 75;
				move.accuracy = 100;
				move.pp = 10;
				delete move.secondary;
				move.onHit = function (target, pokemon) {
					if (target.lastDamage > 0 && pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && pokemon.lastAttackedBy.pokemon === target) {
						if (this.random(100) < 30) {
							target.addVolatile('confusion');
						}
					} else {
						target.addVolatile('confusion');
					}
				};
			}
			if (move.id === 'shellsmash' && name === 'legitimateusername') {
				move.name = 'Shell Fortress';
				move.boosts = {def:2, spd:2, atk:-4, spa:-4, spe:-4};
			}
			if (move.id === 'meditate' && name === 'qtrx') {
				move.name = 'KEYBOARD SMASH';
				move.target = 'normal';
				move.boosts = null;
				move.hitcount = [3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7][this.random(11)];
				move.onPrepareHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Fairy Lock", target);
					this.add('-anim', pokemon, "Fairy Lock", pokemon); // DRAMATIC FLASHING
				};
				move.onHit = function (target, source) {
					let gibberish = '';
					let hits = 0;
					let hps = ['hiddenpowerbug', 'hiddenpowerdark', 'hiddenpowerdragon', 'hiddenpowerelectric', 'hiddenpowerfighting', 'hiddenpowerfire', 'hiddenpowerflying', 'hiddenpowerghost', 'hiddenpowergrass', 'hiddenpowerground', 'hiddenpowerice', 'hiddenpowerpoison', 'hiddenpowerpsychic', 'hiddenpowerrock', 'hiddenpowersteel', 'hiddenpowerwater'];
					this.add('c|@qtrx|/me slams face into keyboard!');
					source.isDuringAttack = true; // Prevents the user from being kicked out in the middle of using Hidden Powers.
					for (let i = 0; i < move.hitcount; i++) {
						if (target.hp !== 0) {
							let len = 16 + this.random(35);
							gibberish = '';
							for (let j = 0; j < len; j++) gibberish += String.fromCharCode(48 + this.random(79));
							this.add('-message', gibberish);
							this.useMove(hps[this.random(16)], source, target);
							hits++;
						}
					}
					this.add('-message', 'Hit ' + hits + ' times!');
					source.isDuringAttack = false;
				};
			}
			if (move.id === 'voltswitch' && name === 'quitequiet') {
				move.name = "Retreat";
				move.onEffectiveness = function (typeMod, type, move) {
					return 1;
				};
			}
			if (move.id === 'snatch' && name === 'solarisfox') {
				move.name = "Wonder Bark";
				move.pp = 1;
				move.noPPBoosts = true;
				move.priority = 3;
				move.target = "normal";
				move.volatileStatus = 'flinch';
				move.flags = {reflectable: 1, sound: 1};
				move.effect = null;
				move.pressureTarget = null;
				let newMoves = ['hyperbeam', 'flamethrower', 'freezedry', 'thunderbolt', 'scald', 'gigadrain', 'bugbuzz',
					'darkpulse', 'psychic', 'shadowball', 'flashcannon', 'dragonpulse', 'moonblast', 'focusblast', 'aeroblast',
					'earthpower', 'sludgebomb', 'paleowave', 'bodyslam', 'flareblitz', 'iciclecrash', 'volttackle', 'waterfall',
					'leafblade', 'xscissor', 'knockoff', 'shadowforce', 'ironhead', 'outrage', 'playrough', 'closecombat',
					'bravebird', 'earthquake', 'stoneedge', 'extremespeed', 'stealthrock', 'spikes', 'stickyweb', 'quiverdance',
					'shellsmash', 'dragondance', 'recover', 'toxic', 'willowisp'
				].randomize();
				move.onPrepareHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Hyper Voice", pokemon);
				};
				move.onHit = function (pokemon, source) {
					this.add('-message', 'You hear a sound echo across the universe. Things seem different now.');
					for (let i = 0; i < pokemon.moveset.length; i++) {
						let moveData = Tools.getMove(newMoves[i]);
						let moveBuffer = {
							move: moveData.name,
							id: moveData.id,
							pp: moveData.pp,
							maxpp: moveData.pp,
							target: moveData.target,
							disabled: false,
							used: false,
						};
						pokemon.moveset[i] = moveBuffer;
						pokemon.baseMoveset[i] = moveBuffer;
						pokemon.moves[i] = toId(move.name);
					}
					source.side.hasUsedWonderBark = true;
				};
				move.onAfterMove = function (pokemon) {
					pokemon.deductPP('snatch', 99);
				};
			}
			if (move.id === 'sleeptalk' && name === 'theimmortal') {
				move.name = 'Sleep Walk';
				move.pp = 20;
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Healing Wish", target);
				};
				move.onHit = function (pokemon) {
					if (pokemon.status !== 'slp') {
						if (pokemon.hp >= pokemon.maxhp) return false;
						if (!pokemon.setStatus('slp')) return false;
						pokemon.statusData.time = 3;
						pokemon.statusData.startTime = 3;
						this.heal(pokemon.maxhp);
						this.add('-status', pokemon, 'slp', '[from] move: Rest');
					}
					let moves = [];
					for (let i = 0; i < pokemon.moveset.length; i++) {
						let move = pokemon.moveset[i].id;
						if (move && move !== 'sleeptalk') moves.push(move);
					}
					let move = '';
					if (moves.length) move = moves[this.random(moves.length)];
					if (!move) return false;
					this.useMove(move, pokemon);
					let activate = false;
					let boosts = {};
					for (let i in pokemon.boosts) {
						if (pokemon.boosts[i] < 0) {
							activate = true;
							boosts[i] = 0;
						}
					}
					if (activate) pokemon.setBoost(boosts);
					if (!pokemon.informed) {
						this.add('c|~The Immortal|I don\'t really sleep walk...');
						pokemon.informed = true;
					}
				};
			}
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
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga',
			'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Soul Dew', 'Perish Song',
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
		onNegateImmunity: false,
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
		banlist: ['Ignore STAB Moves', 'Diggersby', 'Aerodactylite', 'Altarianite', "King's Rock", 'Metagrossite', 'Razor Fang'],
	},
	{
		name: "LC UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3562639/\">LC UU</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3562640/\">LC UU Viability Ranking</a>",
		],
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Corphish', 'Cottonee', 'Cranidos',
			'Croagunk', 'Diglett', 'Drifloon', 'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus',
			'Gastly', 'Honedge', 'Houndour', 'Larvesta', 'Magnemite', 'Mienfoo', 'Munchlax', 'Omanyte', 'Onix',
			'Pancham', 'Pawniard', 'Ponyta', 'Porygon', 'Scraggy', 'Shellder', 'Skrelp', 'Snivy', 'Snubbull',
			'Spritzee', 'Staryu', 'Stunky', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby', 'Vulpix', 'Zigzagoon',
			'Shell Smash', 'Sticky Web',
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
		banlist: ['Kangaskhanite', 'Perish Song'],
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
		banlist: ['Sableye + Prankster', 'Shedinja', 'Smeargle',
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
		searchShow: false,
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
];
