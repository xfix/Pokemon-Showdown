'use strict';

exports.BattleFormats = {
	superglitchclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Super Glitch Clause: Every pokemon must hold a Leppa Berry and know Recycle and Super Glitch. No Fun Allowed is banned.');
		},
		onValidateSet: function (set) {
			let issues = [];
			set.item = 'Leppa Berry';
			let metronomeFound = false;
			let recycleFound = false;
			let i;
			let movesLength = set.moves.length;
			for (i = 0; i < movesLength; i++) {
				let move = set.moves[i];
				switch (move.toLowerCase()) {
				case 'superglitch':
					if (metronomeFound) {
						issues.push(set.species + " cannot have more than one Super Glitch.");
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
				set.moves = set.moves.concat('superglitch');
			}
			if (!recycleFound) {
				set.moves.push("Recycle");
			}
			let totalEV = 0;
			for (let k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				issues.push(set.species + " has more than 510 total EVs.");
			}
			let template = Tools.getTemplate(set.species);
			let totalBST = 0;
			for (let k in template.baseStats) {
				totalBST += template.baseStats[k];
			}
			if (totalBST > 600) {
				issues.push(set.species + " has more than 600 BST.");
			}
			return issues;
		},
	},

	noswitchingclause: {
		effectType: 'rule',
		onStart: function () {
			this.add('rule', 'No Switching Clause: Cannot switch');
		},
		onModifyPokemon: function (pokemon) {
			if (!pokemon.volatiles['imprison']) {
				pokemon.tryTrap();
			} else {
				pokemon.side.switchFlag = true;
			}
		},
	},

	norecycleclause: {
		effectType: 'rule',
		onStart: function () {
			this.add('rule', 'No Recycle Clause: Cannot use Recycle while holding Leppa Berry');
		},
		onModifyPokemon: function (pokemon) {
			if ((pokemon.item || !pokemon.lastItem) && !(pokemon.volatiles.torment && pokemon.lastMove === 'metronome')) {
				let moves = pokemon.moveset;
				let pp = 0;
				let recycle = null;
				for (let i = 0; i < moves.length; i++) {
					if (moves[i].id === 'recycle') {
						recycle = i;
					} else {
						pp += moves[i].pp * !moves[i].disabled;
					}
				}
				if (pp && recycle !== null) {
					moves[recycle].disabled = true;
				}
			}
		},
	},

	abilityclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Ability Clause: Limit one of each ability');
		},
		onValidateTeam: function (team, format) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = toId(team[i].ability);
				if (!ability) continue;
				if (ability in abilityTable) {
					if (abilityTable[ability] >= 1) {
						return ["You are limited to one of each ability by the Ability Clause.", "(You have more than one " + this.getAbility(ability).name + ")"];
					}
					abilityTable[ability]++;
				} else {
					abilityTable[ability] = 1;
				}
			}
		},
	},
};
