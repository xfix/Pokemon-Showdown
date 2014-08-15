exports.BattleFormats = {
	tpp: {
		effectType: 'Banlist',
		validateSet: function (set, format) {
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
				// Venonat Line (ATV)
				"Venonat": true, "Venomoth": true,
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
				"Rotom": true, "Rotom-Heat": true, "Rotom-Wash": true, "Rotom-Frost": true,
				"Rotom-Fan": true, "Rotom-Mow": true,
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
				issues.push(set.species + " is not TPP-related.");
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
				switch (move.toLowerCase()) {
				case 'metronome':
					if (metronomeFound) {
						issues.push(set.species + " cannot have more than one Metronome.");
					}
					metronomeFound = true;
					break;
				case 'recycle':
					if (recycleFound) {
						issues.push(set.species + " cannot have more than one Recycle.");
					}
					recycleFound = true;
					break;
				// Allow empty move.
				case '':
					break;
				default:
					issues.push(set.species + " cannot have " + move + ".");
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
			if (totalBST > format.baseStatLimit) {
				issues.push(set.species + " has more than " + format.baseStatLimit + " BST.");
			}
			return issues;
		}
	},

	noswitchingclause: {
		effectType: 'rule',
		onStart: function () {
			this.add('rule', 'No Switching Clause: Cannot switch');
		},
		onModifyPokemon: function (pokemon) {
			if (!pokemon.volatiles['imprison']) {
				pokemon.tryTrap();
			}
			else {
				pokemon.side.switchFlag = true;
			}
		}
	},
	norecycleclause: {
		effectType: 'rule',
		onStart: function () {
			this.add('rule', 'No Recycle Clause: Cannot use Recycle while holding Leppa Berry');
		},
		onModifyPokemon: function (pokemon) {
			if (pokemon.item || !pokemon.lastItem) {
				var moves = pokemon.moveset;
				var pp = 0;
				var recycle = null;
				for (var i = 0; i < moves.length; i++) {
					if (moves[i].id === 'recycle') {
						recycle = i;
					}
					else {
						pp += moves[i].pp * !moves[i].disabled;
					}
				}
				if (pp && recycle !== null) {
					moves[recycle].disabled = true;
				}
			}
		},
		onModifyPokemonPriority: -10000
	},

	pointsclause: {
		effectType: 'rule',
		onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move' && !effect.ohko) {
				this.points(source.side, 'OHKO not using OHKO moves is an OHKO after all', 20);
			}
			if (target.hp === 1 && target.maxhp !==  1) {
				this.points(target.side, 'CLUTCH Kreygasm', 10);
			}
		},
		onDamagePriority: -200,
		onBeforeTurn: function (pokemon) {
			if (!pokemon.volatiles['turncount']) {
				pokemon.volatiles['turncount'] = {count: 0};
			}
			pokemon.volatiles['turncount'].count++;
			var count = pokemon.volatiles['turncount'].count;
			this.add('-message', pokemon.name + ' is now on turn ' + count);
			switch (count) {
			case 20:
			case 30:
			case 40:
				this.points(pokemon.side, 'Are you a TANK', 20);
				break;
			}
		}
	}
};
