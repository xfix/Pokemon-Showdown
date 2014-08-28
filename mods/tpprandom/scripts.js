exports.BattleScripts = {
	gen: 6,
	randomSet: function (template, i, noMega) {
		if (i === undefined) i = 1;
		var baseTemplate = (template = this.getTemplate(template));
		var name = template.name;

		if (!template.exists || (!template.randomBattleMoves && !template.learnset)) {
			// GET IT? UNOWN? BECAUSE WE CAN'T TELL WHAT THE POKEMON IS
			template = this.getTemplate('unown');

			var stack = 'Template incompatible with random battles: ' + name;
			var fakeErr = {stack: stack};
			require('../crashlogger.js')(fakeErr, 'The randbat set generator');
		}

		// Decide if the Pokemon can mega evolve early, so viable moves for the mega can be generated
		if (!noMega && this.canMegaEvo(template) && template.species !== 'Latios' && template.species !== 'Latias') {
			// If there's more than one mega evolution, randomly pick one
			template = this.getTemplate(template.otherFormes[(template.otherFormes[1]) ? Math.round(Math.random()) : 0]);
		}

		var moveKeys = (template.randomBattleMoves || Object.keys(template.learnset)).concat(['metronome']).randomize();
		var moves = [];
		var ability = '';
		var item = '';
		var evs = {
			hp: 85,
			atk: 85,
			def: 85,
			spa: 85,
			spd: 85,
			spe: 85
		};
		var ivs = {
			hp: 31,
			atk: 31,
			def: 31,
			spa: 31,
			spd: 31,
			spe: 31
		};
		var hasStab = {};
		hasStab[template.types[0]] = true;
		var hasType = {};
		hasType[template.types[0]] = true;
		if (template.types[1]) {
			hasStab[template.types[1]] = true;
			hasType[template.types[1]] = true;
		}

		// Moves which drop stats:
		var ContraryMove = {
			leafstorm: 1, overheat: 1, closecombat: 1, superpower: 1, vcreate: 1
		};
		// Moves that boost Attack:
		var PhysicalSetup = {
			swordsdance:1, dragondance:1, coil:1, bulkup:1, curse:1, bellydrum:1, shiftgear:1, honeclaws:1, howl:1, poweruppunch:1
		};
		// Moves which boost Special Attack:
		var SpecialSetup = {
			nastyplot:1, tailglow:1, quiverdance:1, calmmind:1, chargebeam:1, geomancy:1
		};
		// Moves which boost Attack AND Special Attack:
		var MixedSetup = {
			growth:1, workup:1, shellsmash:1
		};
		// These moves can be used even if we aren't setting up to use them:
		var SetupException = {
			overheat:1, dracometeor:1, leafstorm:1,
			voltswitch:1, uturn:1,
			suckerpunch:1, extremespeed:1
		};
		var counterAbilities = {
			'Blaze':1, 'Overgrow':1, 'Swarm':1, 'Torrent':1, 'Contrary':1,
			'Technician':1, 'Skill Link':1, 'Iron Fist':1, 'Adaptability':1, 'Hustle':1
		};

		var damagingMoves = [];
		var damagingMoveIndex = {};
		var hasMove = {};
		var counter = {};
		var setupType = '';

		var j = 0;
		do {
			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			while (moves.length < 4 && j < moveKeys.length) {
				var moveid = toId(moveKeys[j]);
				j++;
				if (moveid.substr(0, 11) === 'hiddenpower') {
					if (hasMove['hiddenpower']) continue;
					hasMove['hiddenpower'] = true;
				}
				moves.push(moveid);
			}

			damagingMoves = [];
			damagingMoveIndex = {};
			hasMove = {};
			counter = {
				Physical: 0, Special: 0, Status: 0, damage: 0,
				technician: 0, skilllink: 0, contrary: 0, sheerforce: 0, ironfist: 0, adaptability: 0, hustle: 0,
				blaze: 0, overgrow: 0, swarm: 0, torrent: 0,
				recoil: 0, inaccurate: 0,
				physicalsetup: 0, specialsetup: 0, mixedsetup: 0
			};
			// Iterate through all moves we've chosen so far and keep track of what they do:
			for (var k = 0; k < moves.length; k++) {
				var move = this.getMove(moves[k]);
				var moveid = move.id;
				// Keep track of all moves we have:
				hasMove[moveid] = true;
				if (move.damage || move.damageCallback) {
					// Moves that do a set amount of damage:
					counter['damage']++;
					damagingMoves.push(move);
					damagingMoveIndex[moveid] = k;
				} else {
					// Are Physical/Special/Status moves:
					counter[move.category]++;
				}
				// Moves that have a low base power:
				if (move.basePower && move.basePower <= 60) counter['technician']++;
				// Moves that hit multiple times:
				if (move.multihit && move.multihit[1] === 5) counter['skilllink']++;
				// Punching moves:
				if (move.isPunchAttack) counter['ironfist']++;
				// Recoil:
				if (move.recoil) counter['recoil']++;
				// Moves which have a base power:
				if (move.basePower || move.basePowerCallback) {
					if (hasType[move.type]) {
						counter['adaptability']++;
						// STAB:
						// Bounce, Sky Attack, Flame Charge aren't considered STABs.
						// If they're in the Pokémon's movepool and are STAB, consider the Pokémon not to have that type as a STAB.
						if (moveid === 'skyattack' || moveid === 'bounce' || moveid === 'flamecharge') hasStab[move.type] = false;
					}
					if (move.category === 'Physical') counter['hustle']++;
					if (move.type === 'Fire') counter['blaze']++;
					if (move.type === 'Grass') counter['overgrow']++;
					if (move.type === 'Bug') counter['swarm']++;
					if (move.type === 'Water') counter['torrent']++;
					// Make sure not to count Knock Off, Rapid Spin, etc.
					if (move.basePower > 20 || move.multihit || move.basePowerCallback) {
						damagingMoves.push(move);
						damagingMoveIndex[moveid] = k;
					}
				}
				// Moves with secondary effects:
				if (move.secondary) {
					if (move.secondary.chance < 50) {
						counter['sheerforce'] -= 5;
					} else {
						counter['sheerforce']++;
					}
				}
				// Moves with low accuracy:
				if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter['inaccurate']++;

				// Moves that change stats:
				if (ContraryMove[moveid]) counter['contrary']++;
				if (PhysicalSetup[moveid]) counter['physicalsetup']++;
				if (SpecialSetup[moveid]) counter['specialsetup']++;
				if (MixedSetup[moveid]) counter['mixedsetup']++;
			}

			// Choose a setup type:
			if (counter['mixedsetup']) {
				setupType = 'Mixed';
			} else if (counter['specialsetup']) {
				setupType = 'Special';
			} else if (counter['physicalsetup']) {
				setupType = 'Physical';
			}

			// Iterate through the moves again, this time to cull them:
			for (var k = 0; k < moves.length; k++) {
				var moveid = moves[k];
				var move = this.getMove(moveid);
				var rejected = false;
				var isSetup = false;

				switch (moveid) {

				// not very useful without their supporting moves
				case 'sleeptalk':
					if (!hasMove['rest']) rejected = true;
					break;
				case 'endure':
					if (!hasMove['flail'] && !hasMove['endeavor'] && !hasMove['reversal']) rejected = true;
					break;
				case 'focuspunch':
					if (hasMove['sleeptalk'] || !hasMove['substitute']) rejected = true;
					break;
				case 'storedpower':
					if (!hasMove['cosmicpower'] && !setupType) rejected = true;
					break;
				case 'batonpass':
					if (!setupType && !hasMove['substitute'] && !hasMove['cosmicpower']) rejected = true;
					break;

				// we only need to set up once
				case 'swordsdance': case 'dragondance': case 'coil': case 'curse': case 'bulkup': case 'bellydrum':
					if (counter.Physical < 2 && !hasMove['batonpass']) rejected = true;
					if (setupType !== 'Physical' || counter['physicalsetup'] > 1) rejected = true;
					isSetup = true;
					break;
				case 'nastyplot': case 'tailglow': case 'quiverdance': case 'calmmind':
					if (counter.Special < 2 && !hasMove['batonpass']) rejected = true;
					if (setupType !== 'Special' || counter['specialsetup'] > 1) rejected = true;
					isSetup = true;
					break;
				case 'shellsmash': case 'growth': case 'workup':
					if (counter.Physical + counter.Special < 2 && !hasMove['batonpass']) rejected = true;
					if (setupType !== 'Mixed' || counter['mixedsetup'] > 1) rejected = true;
					isSetup = true;
					break;

				// bad after setup
				case 'seismictoss': case 'nightshade': case 'superfang': case 'foulplay':
					if (setupType) rejected = true;
					break;
				case 'perishsong': case 'magiccoat': case 'spikes':
					if (setupType) rejected = true;
					break;
				case 'uturn': case 'voltswitch':
					if (setupType || hasMove['agility'] || hasMove['rockpolish'] || hasMove['magnetrise']) rejected = true;
					break;
				case 'relicsong':
					if (setupType) rejected = true;
					break;
				case 'pursuit': case 'protect': case 'haze': case 'stealthrock':
					if (setupType || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					break;
				case 'trick': case 'switcheroo':
					if (setupType || (hasMove['rest'] && hasMove['sleeptalk']) || hasMove['trickroom'] || hasMove['reflect'] || hasMove['lightscreen'] || hasMove['batonpass']) rejected = true;
					break;
				case 'dragontail': case 'circlethrow':
					if (hasMove['agility'] || hasMove['rockpolish']) rejected = true;
					if (hasMove['whirlwind'] || hasMove['roar'] || hasMove['encore']) rejected = true;
					break;

				// bit redundant to have both
				// Attacks:
				case 'flamethrower': case 'fierydance':
					if (hasMove['lavaplume'] || hasMove['overheat'] || hasMove['fireblast'] || hasMove['blueflare']) rejected = true;
					break;
				case 'fireblast':
					if (hasMove['lavaplume']) rejected = true;
					break;
				case 'overheat':
					if (setupType === 'Special' || hasMove['fireblast']) rejected = true;
					break;
				case 'icebeam':
					if (hasMove['blizzard']) rejected = true;
					break;
				case 'surf':
					if (hasMove['scald'] || hasMove['hydropump']) rejected = true;
					break;
				case 'hydropump':
					if (hasMove['razorshell'] || hasMove['scald']) rejected = true;
					break;
				case 'waterfall':
					if (hasMove['aquatail']) rejected = true;
					break;
				case 'airslash':
					if (hasMove['hurricane']) rejected = true;
					break;
				case 'acrobatics': case 'pluck': case 'drillpeck':
					if (hasMove['bravebird']) rejected = true;
					break;
				case 'solarbeam':
					if ((!hasMove['sunnyday'] && template.species !== 'Ninetales') || hasMove['gigadrain'] || hasMove['leafstorm']) rejected = true;
					break;
				case 'gigadrain':
					if ((!setupType && hasMove['leafstorm']) || hasMove['petaldance']) rejected = true;
					break;
				case 'leafstorm':
					if (setupType && hasMove['gigadrain']) rejected = true;
					break;
				case 'weatherball':
					if (!hasMove['sunnyday'] && !hasMove['raindance']) rejected = true;
					break;
				case 'firepunch':
					if (hasMove['flareblitz']) rejected = true;
					break;
				case 'bugbite':
					if (hasMove['uturn']) rejected = true;
					break;
				case 'crosschop': case 'highjumpkick':
					if (hasMove['closecombat']) rejected = true;
					break;
				case 'drainpunch':
					if (hasMove['closecombat'] || hasMove['highjumpkick'] || hasMove['crosschop'] || hasMove['focuspunch']) rejected = true;
					break;
				case 'thunderbolt':
					if (hasMove['discharge'] || hasMove['voltswitch'] || hasMove['thunder']) rejected = true;
					break;
				case 'discharge': case 'thunder':
					if (hasMove['voltswitch']) rejected = true;
					break;
				case 'rockslide': case 'rockblast':
					if (hasMove['stoneedge'] || hasMove['headsmash']) rejected = true;
					break;
				case 'stoneedge':
					if (hasMove['headsmash']) rejected = true;
					break;
				case 'bonemerang': case 'earthpower': case 'bulldoze':
					if (hasMove['earthquake']) rejected = true;
					break;
				case 'dragonclaw':
					if (hasMove['outrage'] || hasMove['dragontail']) rejected = true;
					break;
				case 'ancientpower':
					if (hasMove['paleowave']) rejected = true;
					break;
				case 'dragonpulse':
					if (hasMove['dracometeor']) rejected = true;
					break;
				case 'return':
					if (hasMove['bodyslam'] || hasMove['facade'] || hasMove['doubleedge'] || hasMove['tailslap']) rejected = true;
					break;
				case 'poisonjab':
					if (hasMove['gunkshot']) rejected = true;
					break;
				case 'psychic':
					if (hasMove['psyshock'] || hasMove['storedpower']) rejected = true;
					break;
				case 'fusionbolt':
					if (setupType && hasMove['boltstrike']) rejected = true;
					break;
				case 'boltstrike':
					if (!setupType && hasMove['fusionbolt']) rejected = true;
					break;
				case 'hiddenpowerice':
					if (hasMove['icywind']) rejected = true;
					break;
				case 'drainingkiss':
					if (hasMove['dazzlinggleam']) rejected = true;
					break;
				case 'voltswitch':
					if (hasMove['uturn']) rejected = true;
					break;
				case 'uturn':
					if (hasMove['voltswitch']) rejected = true;
					break;

				// Status:
				case 'rest':
					if (hasMove['painsplit'] || hasMove['wish'] || hasMove['recover'] || hasMove['moonlight'] || hasMove['synthesis'] || hasMove['morningsun']) rejected = true;
					break;
				case 'softboiled': case 'roost': case 'moonlight': case 'synthesis': case 'morningsun':
					if (hasMove['wish'] || hasMove['recover']) rejected = true;
					break;
				case 'memento':
					if (hasMove['rest'] || hasMove['painsplit'] || hasMove['wish'] || hasMove['recover'] || hasMove['moonlight'] || hasMove['synthesis'] || hasMove['morningsun']) rejected = true;
					break;
				case 'perishsong':
					if (hasMove['roar'] || hasMove['whirlwind'] || hasMove['haze']) rejected = true;
					break;
				case 'roar':
					// Whirlwind outclasses Roar because Soundproof
					if (hasMove['whirlwind'] || hasMove['dragontail'] || hasMove['haze'] || hasMove['circlethrow']) rejected = true;
					break;
				case 'substitute':
					if (hasMove['uturn'] || hasMove['voltswitch'] || hasMove['pursuit']) rejected = true;
					break;
				case 'fakeout':
					if (hasMove['trick'] || hasMove['switcheroo']) rejected = true;
					break;
				case 'encore':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (hasMove['whirlwind'] || hasMove['dragontail'] || hasMove['roar'] || hasMove['circlethrow']) rejected = true;
					break;
				case 'suckerpunch':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'cottonguard':
					if (hasMove['reflect']) rejected = true;
					break;
				case 'lightscreen':
					if (hasMove['calmmind']) rejected = true;
					break;
				case 'rockpolish': case 'agility': case 'autotomize':
					if (!setupType && !hasMove['batonpass'] && hasMove['thunderwave']) rejected = true;
					if ((hasMove['stealthrock'] || hasMove['spikes'] || hasMove['toxicspikes']) && !hasMove['batonpass']) rejected = true;
					break;
				case 'thunderwave': case 'stunspore':
					if (setupType && (hasMove['rockpolish'] || hasMove['agility'])) rejected = true;
					if (hasMove['discharge'] || hasMove['trickroom']) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (hasMove['yawn'] || hasMove['spore'] || hasMove['sleeppowder']) rejected = true;
					break;
				case 'lavaplume':
					if (hasMove['willowisp']) rejected = true;
					break;
				case 'trickroom':
					if (hasMove['rockpolish'] || hasMove['agility']) rejected = true;
					break;
				case 'willowisp':
					if (hasMove['scald'] || hasMove['yawn'] || hasMove['spore'] || hasMove['sleeppowder'] || hasMove['hypnosis']) rejected = true;
					break;
				case 'toxic':
					if (hasMove['thunderwave'] || hasMove['willowisp'] || hasMove['scald'] || hasMove['yawn'] || hasMove['spore'] || hasMove['sleeppowder'] || hasMove['stunspore'] || hasMove['hypnosis']) rejected = true;
					break;
				}

				if (move.category === 'Special' && setupType === 'Physical' && !SetupException[move.id]) {
					rejected = true;
				}
				if (move.category === 'Physical' && setupType === 'Special' && !SetupException[move.id]) {
					rejected = true;
				}

				// This move doesn't satisfy our setup requirements:
				if (setupType === 'Physical' && move.category !== 'Physical' && counter['Physical'] < 2) {
					rejected = true;
				}
				if (setupType === 'Special' && move.category !== 'Special' && counter['Special'] < 2) {
					rejected = true;
				}

				// Remove rejected moves from the move list.
				if (rejected && j < moveKeys.length) {
					moves.splice(k, 1);
					break;
				}

				// handle HP IVs
				if (move.id === 'hiddenpower') {
					var HPivs = this.getType(move.type).HPivs;
					for (var iv in HPivs) {
						ivs[iv] = HPivs[iv];
					}
				}
			}
			if (j < moveKeys.length && moves.length === 4) {
				// Move post-processing:
				if (damagingMoves.length === 0) {
					// A set shouldn't have no attacking moves
					moves.splice(Math.floor(Math.random() * moves.length), 1);
				} else if (damagingMoves.length === 1) {
					// Night Shade, Seismic Toss, etc. don't count:
					if (!damagingMoves[0].damage) {
						var damagingid = damagingMoves[0].id;
						var damagingType = damagingMoves[0].type;
						var replace = false;
						if (damagingid === 'suckerpunch' || damagingid === 'counter' || damagingid === 'mirrorcoat') {
							// A player shouldn't be forced to rely upon the opponent attacking them to do damage.
							if (!hasMove['encore'] && Math.random() * 2 > 1) replace = true;
						} else if (damagingid === 'focuspunch') {
							// Focus Punch is a bad idea without a sub:
							if (!hasMove['substitute']) replace = true;
						} else if (damagingid.substr(0, 11) === 'hiddenpower' && damagingType === 'Ice') {
							// Mono-HP-Ice is never acceptable.
							replace = true;
						} else {
							// If you have one attack, and it's not STAB, Ice, Fire, or Ground, reject it.
							// Mono-Ice/Ground/Fire is only acceptable if the Pokémon's STABs are one of: Poison, Psychic, Steel, Normal, Grass.
							if (!hasStab[damagingType]) {
								if (damagingType === 'Ice' || damagingType === 'Fire' || damagingType === 'Ground') {
									if (!hasStab['Poison'] && !hasStab['Psychic'] && !hasStab['Steel'] && !hasStab['Normal'] && !hasStab['Grass']) {
										replace = true;
									}
								} else {
									replace = true;
								}
							}
						}
						if (replace) moves.splice(damagingMoveIndex[damagingid], 1);
					}
				} else if (damagingMoves.length === 2) {
					// If you have two attacks, neither is STAB, and the combo isn't Ice/Electric, Ghost/Fighting, or Dark/Fighting, reject one of them at random.
					var type1 = damagingMoves[0].type, type2 = damagingMoves[1].type;
					var typeCombo = [type1, type2].sort().join('/');
					var rejectCombo = !(type1 in hasStab || type2 in hasStab);
					if (rejectCombo ) {
						if (typeCombo === 'Electric/Ice' || typeCombo === 'Fighting/Ghost' || typeCombo === 'Dark/Fighting') rejectCombo = false;
					}
					if (rejectCombo) moves.splice(Math.floor(Math.random() * moves.length), 1);
				} else {
					// If you have three or more attacks, and none of them are STAB, reject one of them at random.
					var isStab = false;
					for (var l = 0; l < damagingMoves.length; l++) {
						if (hasStab[damagingMoves[l].type]) {
							isStab = true;
							break;
						}
					}
					if (!isStab) moves.splice(Math.floor(Math.random() * moves.length), 1);
				}
			}
		} while (moves.length < 4 && j < moveKeys.length);

		// any moveset modification goes here
		//moves[0] = 'Safeguard';
		if (template.requiredItem && template.requiredItem.slice(-5) === 'Drive' && !hasMove['technoblast']) {
			delete hasMove[toId(moves[3])];
			moves[3] = 'Techno Blast';
			hasMove['technoblast'] = true;
		}

		{
			var abilities = Object.values(baseTemplate.abilities).sort(function (a, b) {
				return this.getAbility(b).rating - this.getAbility(a).rating;
			}.bind(this));
			var ability0 = this.getAbility(abilities[0]);
			var ability1 = this.getAbility(abilities[1]);
			var ability = ability0.name;
			if (abilities[1]) {

				if (ability0.rating <= ability1.rating) {
					if (Math.random() * 2 < 1) ability = ability1.name;
				} else if (ability0.rating - 0.6 <= ability1.rating) {
					if (Math.random() * 3 < 1) ability = ability1.name;
				}

				var rejectAbility = false;
				if (ability in counterAbilities) {
					rejectAbility = !counter[toId(ability)];
				} else if (ability === 'Rock Head' || ability === 'Reckless') {
					rejectAbility = !counter['recoil'];
				} else if (ability === 'No Guard' || ability === 'Compoundeyes') {
					rejectAbility = !counter['inaccurate'];
				} else if ((ability === 'Sheer Force' || ability === 'Serene Grace')) {
					rejectAbility = !counter['sheerforce'];
				} else if (ability === 'Simple') {
					rejectAbility = !setupType && !hasMove['flamecharge'] && !hasMove['stockpile'];
				} else if (ability === 'Prankster') {
					rejectAbility = !counter['Status'];
				} else if (ability === 'Defiant' || ability === 'Moxie') {
					rejectAbility = !counter['Physical'] && !hasMove['batonpass'];
				} else if (ability === 'Snow Warning') {
					rejectAbility = hasMove['naturepower'];
				// below 2 checks should be modified, when it becomes possible, to check if the team contains rain or sun
				} else if (ability === 'Swift Swim') {
					rejectAbility = !hasMove['raindance'];
				} else if (ability === 'Chlorophyll') {
					rejectAbility = !hasMove['sunnyday'];
				} else if (ability === 'Moody') {
					rejectAbility = template.id !== 'bidoof';
				} else if (ability === 'Limber') {
					rejectAbility = template.id === 'stunfisk';
				} else if (ability === 'Lightningrod') {
					rejectAbility = template.types.indexOf('Ground') >= 0;
				}

				if (rejectAbility) {
					if (ability === ability1.name) { // or not
						ability = ability0.name;
					} else if (ability1.rating > 0) { // only switch if the alternative doesn't suck
						ability = ability1.name;
					}
				}
				if (abilities.indexOf('Guts') > -1 && ability !== 'Quick Feet' && hasMove['facade']) {
					ability = 'Guts';
				}
				if (abilities.indexOf('Swift Swim') > -1 && hasMove['raindance']) {
					ability = 'Swift Swim';
				}
				if (abilities.indexOf('Chlorophyll') > -1 && ability !== 'Solar Power' && hasMove['sunnyday']) {
					ability = 'Chlorophyll';
				}
				if (template.id === 'sigilyph') {
					ability = 'Magic Guard';
				} else if (template.id === 'combee') {
					// Combee always gets Hustle but its only physical move is Endeavor, which loses accuracy
					ability = 'Honey Gather';
				} else if (template.id === 'mawilemega') {
					// Mega Mawile only needs Intimidate for a starting ability
					ability = 'Intimidate';
				}
			}

			if (hasMove['gyroball']) {
				ivs.spe = 0;
				evs.atk += evs.spe;
				evs.spe = 0;
			} else if (hasMove['trickroom']) {
				ivs.spe = 0;
				evs.hp += evs.spe;
				evs.spe = 0;
			}

			item = 'Leftovers';
			if (template.requiredItem) {
				item = template.requiredItem;
			} else if (template.species === 'Rotom-Fan') {
				// this is just to amuse myself
				// do we really have to keep this
				item = 'Air Balloon';
			} else if (template.species === 'Delibird') {
				// to go along with the Christmas Delibird set
				item = 'Leftovers';

			// First, the extra high-priority items

			} else if (ability === 'Imposter') {
				item = 'Choice Scarf';
			} else if (hasMove['magikarpsrevenge']) {
				item = 'Choice Band';
			} else if (ability === 'Wonder Guard') {
				item = 'Focus Sash';
			} else if (template.species === 'Unown') {
				item = 'Choice Specs';
			} else if (hasMove['trick'] && hasMove['gyroball'] && (ability === 'Levitate' || hasType['Flying'])) {
				item = 'Macho Brace';
			} else if (hasMove['trick'] && hasMove['gyroball']) {
				item = 'Iron Ball';
			} else if (hasMove['trick'] || hasMove['switcheroo']) {
				var randomNum = Math.random() * 2;
				if (counter.Physical >= 3 && (template.baseStats.spe >= 95 || randomNum > 1)) {
					item = 'Choice Band';
				} else if (counter.Special >= 3 && (template.baseStats.spe >= 95 || randomNum > 1)) {
					item = 'Choice Specs';
				} else {
					item = 'Choice Scarf';
				}
			} else if (hasMove['rest'] && !hasMove['sleeptalk'] && ability !== 'Natural Cure' && ability !== 'Shed Skin' && (ability !== 'Hydration' || !hasMove['raindance'])) {
				item = 'Chesto Berry';
			} else if (hasMove['naturalgift']) {
				item = 'Liechi Berry';
			} else if (hasMove['geomancy']) {
				item = 'Power Herb';
			} else if (ability === 'Harvest') {
				item = 'Sitrus Berry';
			} else if (template.species === 'Cubone' || template.species === 'Marowak') {
				item = 'Thick Club';
			} else if (template.species === 'Pikachu') {
				item = 'Light Ball';
			} else if (template.species === 'Clamperl') {
				item = 'DeepSeaTooth';
			} else if (template.species === 'Spiritomb') {
				item = 'Leftovers';
			} else if (template.species === 'Dusclops') {
				item = 'Eviolite';
			} else if (hasMove['reflect'] && hasMove['lightscreen']) {
				item = 'Light Clay';
			} else if (hasMove['shellsmash']) {
				item = 'White Herb';
			} else if (hasMove['facade'] || ability === 'Poison Heal' || ability === 'Toxic Boost') {
				item = 'Toxic Orb';
			} else if (hasMove['raindance']) {
				item = 'Damp Rock';
			} else if (hasMove['sunnyday']) {
				item = 'Heat Rock';
			} else if (hasMove['sandstorm']) { // lol
				item = 'Smooth Rock';
			} else if (hasMove['hail']) { // lol
				item = 'Icy Rock';
			} else if (ability === 'Magic Guard' && hasMove['psychoshift']) {
				item = 'Flame Orb';
			} else if (ability === 'Sheer Force' || ability === 'Magic Guard') {
				item = 'Life Orb';
			} else if (ability === 'Unburden') {
				item = 'Red Card';
				// Give Unburden mons a Normal Gem if they have a Normal-type attacking move (except Explosion)
				for (var m in moves) {
					var move = this.getMove(moves[m]);
					if (move.type === 'Normal' && (move.basePower || move.basePowerCallback) && move.id !== 'explosion') {
						item = 'Normal Gem';
						break;
					}
				}

			// medium priority

			} else if (ability === 'Guts') {
				item = hasMove['drainpunch'] ? 'Flame Orb' : 'Toxic Orb';
				if ((hasMove['return'] || hasMove['hyperfang']) && !hasMove['facade']) {
					// lol no
					for (var j = 0; j < moves.length; j++) {
						if (moves[j] === 'Return' || moves[j] === 'Hyper Fang') {
							moves[j] = 'Facade';
							break;
						}
					}
				}
			} else if (ability === 'Marvel Scale' && hasMove['psychoshift']) {
				item = 'Flame Orb';
			} else if (hasMove['reflect'] || hasMove['lightscreen']) {
				// less priority than if you'd had both
				item = 'Light Clay';
			} else if (counter.Physical >= 4 && !hasMove['fakeout'] && !hasMove['suckerpunch'] && !hasMove['flamecharge'] && !hasMove['rapidspin']) {
				item = Math.random() * 3 > 1 ? 'Choice Band' : 'Expert Belt';
			} else if (counter.Special >= 4) {
				item = Math.random() * 3 > 1 ? 'Choice Specs' : 'Expert Belt';
			} else if (this.getEffectiveness('Ground', template) >= 2 && !hasType['Poison'] && ability !== 'Levitate' && !hasMove['magnetrise']) {
				item = 'Air Balloon';
			} else if ((hasMove['eruption'] || hasMove['waterspout']) && !counter['Status']) {
				item = 'Choice Scarf';
			} else if (hasMove['substitute'] || hasMove['detect'] || hasMove['protect'] || ability === 'Moody') {
				item = 'Leftovers';
			} else if ((hasMove['flail'] || hasMove['reversal']) && !hasMove['endure'] && ability !== 'Sturdy') {
				item = 'Focus Sash';
			} else if (ability === 'Iron Barbs' || ability === 'Rough Skin') {
				item = 'Rocky Helmet';
			} else if ((template.baseStats.hp + 75) * (template.baseStats.def + template.baseStats.spd + 175) > 60000 || template.species === 'Skarmory' || template.species === 'Forretress') {
				// skarmory and forretress get exceptions for their typing
				item = 'Leftovers';
			} else if ((counter.Physical + counter.Special >= 3 || counter.Special >= 3) && setupType && ability !== 'Sturdy') {
				item = 'Life Orb';
			} else if (counter.Physical + counter.Special >= 4 && template.baseStats.def + template.baseStats.spd > 179) {
				item = 'Assault Vest';
			} else if (counter.Physical + counter.Special >= 4) {
				item = 'Expert Belt';
			} else if (i === 0 && ability !== 'Sturdy' && !counter['recoil'] && template.baseStats.def + template.baseStats.spd + template.baseStats.hp < 300) {
				item = 'Focus Sash';
			} else if (hasMove['outrage']) {
				item = 'Lum Berry';

			// this is the "REALLY can't think of a good item" cutoff
			// why not always Leftovers? Because it's boring. :P

			} else if (counter.Physical + counter.Special >= 2 && template.baseStats.hp + template.baseStats.def + template.baseStats.spd > 315) {
				item = 'Weakness Policy';
			} else if (hasType['Flying'] || ability === 'Levitate') {
				item = 'Leftovers';
			} else if (hasType['Poison']) {
				item = 'Black Sludge';
			} else if (this.getImmunity('Ground', template) && this.getEffectiveness('Ground', template) >= 1 && ability !== 'Levitate' && !hasMove['magnetrise']) {
				item = 'Air Balloon';
			} else if (counter.Status <= 1 && ability !== 'Sturdy') {
				item = 'Life Orb';
			} else {
				item = 'Leftovers';
			}
		}

		// 95-86-82-78-74-70
		var levelScale = {
			LC: 94,
			'LC Uber': 92,
			NFE: 90,
			Limbo: 86,
			NU: 86,
			BL3: 84,
			RU: 82,
			BL2: 80,
			UU: 78,
			BL: 76,
			OU: 74,
			CAP: 74,
			Unreleased: 74,
			Uber: 70
		};
		var customScale = {
			// Really bad Pokemon and jokemons
			Azurill: 99, Burmy: 99, Cascoon: 99, Caterpie: 99, Cleffa: 99, Combee: 99, Feebas: 99, Igglybuff: 99, Happiny: 99, Hoppip: 99,
			Kakuna: 99, Kricketot: 99, Ledyba: 99, Magikarp: 99, Metapod: 99, Pichu: 99, Ralts: 99, Sentret: 99, Shedinja: 99,
			Silcoon: 99, Slakoth: 99, Sunkern: 99, Tynamo: 99, Tyrogue: 99, Unown: 99, Weedle: 99, Wurmple: 99, Zigzagoon: 99,
			Clefairy: 95, Delibird: 95, "Farfetch'd": 95, Jigglypuff: 95, Kirlia: 95, Ledian: 95, Luvdisc: 95, Marill: 95, Skiploom: 95,
			Pachirisu: 90,

			// Eviolite
			Ferroseed: 95, Misdreavus: 95, Munchlax: 95, Murkrow: 95, Natu: 95,
			Gligar: 90, Metang: 90, Monferno: 90, Roselia: 90, Seadra: 90, Togetic: 90, Wartortle: 90, Whirlipede: 90,
			Dusclops: 84, Porygon2: 82, Chansey: 78,

			// Weather or teammate dependent
			Snover: 95, Vulpix: 95, Ninetales: 78, Tentacruel: 78, Toxicroak: 78,

			// Banned mega
			"Kangaskhan-Mega": 72, "Gengar-Mega": 72, "Blaziken-Mega": 72, "Lucario-Mega": 72,

			// Holistic judgment
			Carvanha: 90, Genesect: 72, Kyurem: 78, Sigilyph: 74, Xerneas: 68
		};
		var level = levelScale[template.tier] || 90;
		if (customScale[template.name]) level = customScale[template.name];

		if (template.name === 'Serperior' && ability === 'Contrary') level = 74;
		if (template.name === 'Magikarp' && hasMove['magikarpsrevenge']) level = 85;
		if (template.name === 'Spinda' && ability !== 'Contrary') level = 95;

		return {
			name: name,
			moves: moves,
			ability: ability,
			evs: evs,
			ivs: ivs,
			item: item,
			level: level,
			shiny: (Math.random() * 1024 <= 1)
		};
	},
	randomTeam: function (side) {
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
			"Giratina": true, "Giratina-Origin": true,
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
			"Arceus": true, "Arceus-Bug": true, "Arceus-Dark": true,
			"Arceus-Dragon": true, "Arceus-Electric": true, "Arceus-Fairy": true,
			"Arceus-Fighting": true, "Arceus-Fire": true, "Arceus-Flying": true,
			"Arceus-Ghost": true, "Arceus-Grass": true, "Arceus-Ground": true,
			"Arceus-Ice": true, "Arceus Poison": true, "Arceus-Psychic": true,
			"Arceus-Rock": true, "Arceus-Steel": true, "Arceus-Water": true,
			// Xerneas (X-Deer)
			"Xerneas": true
		};
		var keys = [];
		var pokemonLeft = 0;
		var pokemon = [];
		for (var i in this.data.FormatsData) {
			var template = this.getTemplate(i);
			if (this.data.FormatsData[i].randomBattleMoves && !this.data.FormatsData[i].isNonstandard && !template.evos.length && (template.forme.substr(0,4) !== 'Mega') && tppMons[template.species]) {
				keys.push(i);
			}
		}
		keys = keys.randomize();

		// PotD stuff
		var potd = {};
		if ('Rule:potd' in this.getBanlistTable(this.getFormat())) {
			potd = this.getTemplate(Config.potd);
		}

		var typeCount = {};
		var typeComboCount = {};
		var baseFormes = {};
		var uberCount = 0;
		var nuCount = 0;
		var megaCount = 0;

		for (var i = 0; i < keys.length && pokemonLeft < 6; i++) {
			var template = this.getTemplate(keys[i]);
			if (!template || !template.name || !template.types) continue;
			var tier = template.tier;
			// This tries to limit the amount of Ubers and NUs on one team to promote "fun":
			// LC Pokemon have a hard limit in place at 2; NFEs/NUs/Ubers are also limited to 2 but have a 20% chance of being added anyway.
			// LC/NFE/NU Pokemon all share a counter (so having one of each would make the counter 3), while Ubers have a counter of their own.
			if (tier === 'LC' && nuCount > 1) continue;
			if ((tier === 'NFE' || tier === 'NU') && nuCount > 1 && Math.random() * 5 > 1) continue;
			if (tier === 'Uber' && uberCount > 1 && Math.random() * 5 > 1) continue;

			// CAPs have 20% the normal rate
			if (tier === 'CAP' && Math.random() * 5 > 1) continue;
			// Arceus formes have 1/18 the normal rate each (so Arceus as a whole has a normal rate)
			if (keys[i].substr(0, 6) === 'arceus' && Math.random() * 18 > 1) continue;
			// Basculin formes have 1/2 the normal rate each (so Basculin as a whole has a normal rate)
			if (keys[i].substr(0, 8) === 'basculin' && Math.random() * 2 > 1) continue;
			// Genesect formes have 1/5 the normal rate each (so Genesect as a whole has a normal rate)
			if (keys[i].substr(0, 8) === 'genesect' && Math.random() * 5 > 1) continue;
			// Gourgeist formes have 1/4 the normal rate each (so Gourgeist as a whole has a normal rate)
			if (keys[i].substr(0, 9) === 'gourgeist' && Math.random() * 4 > 1) continue;
			// Not available on XY
			if (template.species === 'Pichu-Spiky-eared') continue;

			// Limit 2 of any type
			var types = template.types;
			var skip = false;
			for (var t = 0; t < types.length; t++) {
				if (typeCount[types[t]] > 1 && Math.random() * 5 > 1) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			if (potd && potd.name && potd.types) {
				// The Pokemon of the Day belongs in slot 2
				if (i === 1) {
					template = potd;
					if (template.species === 'Magikarp') {
						template.randomBattleMoves = ['magikarpsrevenge', 'splash', 'bounce'];
					} else if (template.species === 'Delibird') {
						template.randomBattleMoves = ['present', 'bestow'];
					}
				} else if (template.species === potd.species) {
					continue; // No, thanks, I've already got one
				}
			}

			var set = this.randomSet(template, i, megaCount);

			// Illusion shouldn't be on the last pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit 1 of any type combination
			var typeCombo = types.join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in typeComboCount) continue;

			// Limit the number of Megas to one, just like in-game
			if (this.getItem(set.item).megaStone && megaCount > 0) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[template.baseSpecies]) continue;
			baseFormes[template.baseSpecies] = 1;

			// Okay, the set passes, add it to our team
			pokemon.push(set);

			pokemonLeft++;
			// Now that our Pokemon has passed all checks, we can increment the type counter
			for (var t = 0; t < types.length; t++) {
				if (types[t] in typeCount) {
					typeCount[types[t]]++;
				} else {
					typeCount[types[t]] = 1;
				}
			}
			typeComboCount[typeCombo] = 1;

			// Increment Uber/NU and mega counter
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'NU' || tier === 'NFE' || tier === 'LC') {
				nuCount++;
			}
			if (this.getItem(set.item).megaStone) megaCount++;

		}
		return pokemon;
	}
}
