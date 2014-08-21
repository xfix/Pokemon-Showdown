exports.BattleFormats = {
	tppclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'TPP Clause: Can only have TPP Pokémon (with exception for one outsider)');
		},
		validateTeam: function (team) {
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
			function isUber(set) {
				var items = {
					'Soul Dew': true,
					'Gengarite': true,
					'Kangaskhanite': true,
					'Lucarionite': true
				};
				return items[set.item] || Tools.getTemplate(set.species).tier === "Uber";
			}

			var isLC = true;
			var tRule = null;
			var arceus = null;
			var magikarp = false;
			var i;
			for (i = 0; i < team.length; i++) {
				var set = team[i];
				var template = Tools.getTemplate(set.species);

				if (set.species === "Magikarp") {
					magikarp = true;
				}

				var uber = isUber(set);
				if (!tppMons[set.species] && uber) {
					issues.push(set.species + " is banned.");
				}
				else if (!tppMons[set.species]) {
					if (tRule) {
						issues.push(set.species + " is not TPP-related, but you already have " + tRule + ".");
					}
					else {
						tRule = set.species + " (by T Rule)";
					}
				}
				else if (uber) {
					if (tRule) {
						issues.push(set.species + " is Uber, but you already have " + tRule + ".");
					}
					else {
						tRule = set.species + " (by Ubers rule)";
					}
				}

				if (set.species === "Arceus" || set.species === "Xerneas") {
					arceus = set.species;
					if (!isLC) {
						issues.push(arceus + " requires Little Cup Pokémon.");
					}
				}
				else if (template.tier !== "LC") {
					if (isLC && arceus) {
						issues.push(arceus + " requires Little Cup Pokémon.");
					}
					isLC = false;
				}
			}
			if (magikarp && issues.length !== 0) {
				issues.push("I agree that Magikarps are funny, but perhaps consider following the rules.");
			}
			return issues;
		}
	}
}
