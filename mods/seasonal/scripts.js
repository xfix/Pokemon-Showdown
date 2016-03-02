"use strict";

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let team = [];
		let variant = this.random(2);
		let sets = {
			'AM': {
				species: 'Tyranitar', ability: 'Adaptability', item: (variant === 1 ? 'Lum Berry' : 'Choice Scarf'), gender: 'M',
				moves: (variant === 1 ? ['earthquake', 'diamondstorm', 'swordsdance', 'meanlook'] : ['knockoff', 'diamondstorm', 'earthquake']),
				baseSignatureMove: 'pursuit', signatureMove: "Predator",
				evs: {atk:252, def:4, spe: 252}, nature: 'Jolly',
			},
			'awu': {
				species: 'Mawile', ability: 'Adaptability', item: 'Expert Belt', gender: 'F',
				moves: ['meteormash', 'bulletpunch', 'playrough'],
				baseSignatureMove: 'protect', signatureMove: "Shield of Deflection",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant',
			},
			'bumbadadabum': {
				species: 'Samurott', ability: 'Analytic', item: 'Leftovers', gender: 'M',
				moves: ['calmmind', 'originpulse', 'icebeam'],
				baseSignatureMove: 'triattack', signatureMove: "Free Software",
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest',
			},
			'Crestfall': {
				species: 'Diancie', item: 'Diancite',
				moves: ['shellsmash', 'diamondstorm', 'earthpower'],
				baseSignatureMove: 'lightofruin', signatureMove: "Light of Unruin",
				evs: {hp:252, spa:4, spe:252}, nature: 'Timid',
			},
			'Gangnam Style': {
				species: 'Snorlax', ability: 'Run Away', item: 'Power Herb', gender: 'M',
				moves: ['geomancy', 'drainpunch', 'bodyslam'],
				baseSignatureMove: 'furyswipes', signatureMove: "Mother, Father, Gentleman",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant',
			},
			'Joim': {
				species: 'Zapdos', ability: 'Tinted Lens', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['thunderbolt', 'hurricane', 'quiverdance'],
				signatureMove: "Gaster Blaster",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest',
			},
			/*'Lacuna': {
				species: 'Gallade', ability: 'Defiant', item: 'Fighting Gem', gender: 'M',
				moves: ['thunderwave', 'agility', 'zenheadbutt'],
				baseSignatureMove: 'dynamicpunch', signatureMove: "Standing Full",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'LegitimateUsername': {
				species: 'Shuckle', ability: 'Unaware', item: 'Leftovers', gender: 'M',
				moves: ['leechseed', 'rest', 'foulplay'],
				baseSignatureMove: 'shellsmash', signatureMove: "Shell Fortress",
				evs: {hp:252, def:228, spd:28}, nature: 'Calm',
			},
			'qtrx': {
				species: 'Missingno.', ability: 'Levitate', item: 'Focus Sash', gender: 'M',
				moves: [],
				baseSignatureMove: 'meditate', signatureMove: "Hidden Power... Normal?",
				evs: {hp:252, def:4, spa:252}, ivs: {atk:0, spe:0}, nature: 'Quiet',
			},
			'Quite Quiet': {
				species: 'Heliolisk', ability: 'Regenerator', item: 'Life Orb', gender: 'F',
				moves: ['stealthrock', 'perishsong', 'nuzzle'],
				baseSignatureMove: 'voltswitch', signatureMove: "Retreat",
				evs: {def:4, spa:252, spe:252}, nature: 'Timid',
			},
			'SolarisFox': {
				species: 'Delphox', ability: 'Klutz', item: ['Choice Scarf', 'Choice Band', 'Choice Specs', 'Assault Vest', 'Lagging Tail', 'Flame Orb', 'Toxic Orb'].randomize()[0], gender: 'M',
				moves: ['trick', 'lavaplume', 'psyshock'],
				baseSignatureMove: 'snatch', signatureMove: "Wonder Bark",
				evs: {hp:40, spa:216, spe:252}, ivs: {atk:0}, nature: 'Timid',
			},
			'The Immortal': {
				species: 'Blastoise', ability: 'Magic Bounce', item: 'Blastoisinite', gender: 'M', shiny: true,
				moves: ['shellsmash', 'steameruption', 'dragontail'],
				baseSignatureMove: 'sleeptalk', signatureMove: "Sleep Walk",
				evs: {hp:252, def:4, spd:252}, nature: 'Sassy',
			},
			'Trickster': {
				species: 'Whimsicott', ability: 'Illuminate', item: 'Quick Claw', gender: 'M',
				moves: ['substitute', 'sing', 'gigadrain'],
				baseSignatureMove: 'dazzlinggleam', signatureMove: "Sacred Spear Explosion",
				evs: {hp:252, def:4, spe:252}, nature: 'Timid',
			},*/
		};

		// Generate the team randomly.
		let pool = Object.keys(sets).randomize();
		for (let i = 0; i < 6; i++) {
			let set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = set.moves.sample(3).concat(set.signatureMove);
			team.push(set);
		}

		return team;
	},
};
