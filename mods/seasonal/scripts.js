exports.BattleScripts = {
	randomSeasonalMay2015: function (side) {
		var team = [];
		// Teams on this seasonal have: A tank. A healer. A dps. A support. An off-tank. Another dps.
		// We have a pool of them, depending on the team, and give them.
		// If the other team has been chosen, we get its opposing force.
		if (this.seasonal && this.seasonal.side) {
			side = (this.seasonal.side === 'heroes' ? 'evil' : 'heroes');
		} else {
			// First team being generated, pick a side at random.
			side = (Math.random() > 0.5 ? 'heroes' : 'evil');
			this.seasonal = {'side': side};
		}

		if (side === 'heroes') {
			var healers = ['Amy', 'Princess Leia', 'Scruffy', 'Yoda'].randomize();
			var tanks = ['Bender', 'Gurren Lagann', 'Lagann', 'Rei Ayanami', 'Slurms McKenzie'].randomize();
			var supports = ['C3PO', 'Hermes', 'Professor Farnsworth', 'Kif', 'Jar Jar Binks', 'R2D2'].randomize();
			var dps = ['Asuka', 'Chewy', 'Fry', 'Han Solo', 'Leela', 'Luke Skywalker', 'Nibbler', 'Shinji Ikari', 'Zoidberg'].randomize();
		} else {
			var healers = ['Anti-Spiral', 'Gendo Ikari', 'Kaworu Nagisa'].randomize();
			var tanks = ['Jabba the Hut', 'Lilith', 'Lrrr', 'Mommy'].randomize();
			var supports = ['Bobba Fett', 'Zapp Brannigan'].randomize();
			var dps = ['An angel', 'Darth Vader', 'Emperor Palpatine', 'Fender', 'Storm Trooper'].randomize();
		}
		var pool = [healers[0], tanks[0], dps[0], supports[0], dps[1], supports[1]];
		var sets = {
			'Amy': {species: 'Jynx', role: 'healer'},
			'Princess Leia': {
				species: 'Gardevoir', gender: 'F', role: 'healer'
			},
			'Scruffy': {
				species: 'Alakazam', gender: 'M', role: 'healer'
			},
			'Yoda': {
				species: 'Celebi', gender: 'M', role: 'healer'
			},
			'Bender': {
				species: 'Registeel', gender: 'M', role: 'tank'
			},
			'Gurren Lagann': {
				species: 'Golurk', gender: 'N', role: 'tank'
			},
			'Lagann': {
				species: 'Golett', gender: 'N', role: 'tank'
			},
			'Rei Ayanami': {
				species: 'Palkia', gender: 'F', role: 'tank'
			},
			'Slurms McKenzie': {
				species: 'Slugma', gender: 'M', role: 'tank'
			},
			'C3PO': {
				species: 'Regirock', gender: 'N', role: 'support'
			},
			'Hermes': {
				species: 'Scrafty', gender: 'M', role: 'support'
			},
			'Professor Farnsworth': {
				species: 'Mr. Mime', gender: 'M', role: 'support'
			},
			'Kif': {
				species: 'Elgyem', gender: 'N', role: 'support'
			},
			'Jar Jar Binks': {
				species: 'Heliolisk', gender: 'N', role: 'support'
			},
			'R2D2': {
				species: 'Regigigas', gender: 'N', role: 'support'
			},
			'Asuka Langley': {
				species: 'Groudon', gender: 'F', role: 'dps'
			},
			'Chewy': {
				species: 'Ursaring', gender: 'N', role: 'dps'
			},
			'Fry': {
				species: 'Magmar', gender: 'M', role: 'dps'
			},
			'Han Solo': {
				species: 'Sawk', gender: 'M', role: 'dps'
			},
			'Leela': {
				species: 'Hitmonlee', gender: 'F', role: 'dps'
			},
			'Luke Skywalker': {
				species: 'Throh', gender: 'M', role: 'dps'
			},
			'Nibbler': {
				species: 'Monferno', gender: 'N', role: 'dps'
			},
			'Shinji Ikari': {
				species: 'Dialga', gender: 'F', role: 'dps'
			},
			'Zoidberg': {
				species: 'Clawitzer', gender: 'M', role: 'dps', shiny: true
			},
			'Anti-Spiral': {
				species: 'Bisharp', gender: 'N', role: 'healer'
			},
			'Gendo Ikari': {
				species: 'Machoke', gender: 'M', role: 'healer'
			},
			'Kaworu Nagisa': {
				species: 'Treecko', gender: 'N', role: 'healer'
			},
			'Jabba the Hut': {
				species: 'Snorlax', gender: 'N', role: 'tank'
			},
			'Lilith': {
				species: 'Xerneas', gender: 'F', role: 'tank'
			},
			'Lrrr': {
				species: 'Muk', gender: 'M', role: 'tank'
			},
			'Mommy': {
				species: 'Gothitelle', gender: 'F', role: 'tank'
			},
			'Bobba Fett': {
				species: 'Genesect', gender: 'M', role: 'support'
			},
			'Zapp Brannigan': {
				species: 'Delphox', gender: 'M', role: 'support'
			},
			'An angel': {
				species: 'Yveltal', gender: 'N', role: 'dps'
			},
			'Darth Vader': {
				species: 'Dusknoir', gender: 'M', role: 'dps'
			},
			'Emperor Palpatine': {
				species: 'Cofagrigus', gender: 'M', role: 'dps'
			},
			'Fender': {
				species: 'Registeel', gender: 'M', role: 'dps'
			},
			'Storm Trooper': {
				species: 'Raticate', gender: 'M', role: 'dps'
			}
		};
		var movesets = {
			'healer': [
				['curaga', 'icelance', 'wildgrowth', 'rejuvenation'],
				['curaga', 'icelance', 'fairyward', 'rejuvenation'],
				['curaga', 'icelance', 'wildgrowth', 'healingtouch']
			],
			'tank': [
				['taunt', 'sacrifice', 'cooperation', 'punishment'],
				['taunt', 'laststand', 'barkskin', 'punishment'],
				['taunt', 'sacrifice', 'laststand', 'punishment'],
				['sacrifice', 'cooperation', 'evasion', 'punishment']
			],
			'support': [
				['cura', 'powershield', 'penance', 'barkskin'],
				['slowdown', 'stop', 'evasion', 'barkskin'],
				['cura', 'powershield', 'slowdown', 'penance'],
				['cura', 'powershield', 'penance', 'stop'],
				['powershield', 'slowdown', 'penance', 'evasion']
			],
			'dps': [
				['flamestrike', 'conflagration', 'hurricanewinds', 'storm'],
				['moonfire', 'starfire', 'hurricanewinds', 'blizzard'],
				['corruption', 'soulleech', 'storm', 'blizzard'],
				['fury', 'garrote', 'mutilate', 'envenom']
			],
		};
		for (var i = 0; i < 6; i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			set.moves = movesets[set.role][this.random(movesets[set.role].length)];
			team.push(set);
		}

		return team;
	}
};
