"use strict";

exports.BattleAbilities = {
	angerpoint: {
		inherit: true,
		onCriticalHit: function () {},
		onHit: function (target, source, move) {
			if (target.hp && move.category !== 'Status' && !move.damage && !move.damageCallback && target.runEffectiveness(move) > 0) {
				this.boost({atk: 6});
			}
		},
	},
	battlearmor: {
		inherit: true,
		onDamage: function (damage, target, source, effect) {
			return damage * 93.75 / 100;
		},
	},
	compoundeyes: {
		inherit: true,
		onBasePower: function (basePower, pokemon, target, move) {
			return this.chainModify(1.3);
		},
	},
	forewarn: {
		inherit: true,
		onStart: function (pokemon) {
			let targets = pokemon.side.foe.active;
			let warnMoves = [];
			let warnBp = 1;
			for (let i = 0; i < targets.length; i++) {
				if (targets[i].fainted) continue;
				for (let j = 0; j < targets[i].moveset.length; j++) {
					let move = this.getMove(targets[i].moveset[j].move);
					let bp = move.basePower;
					if (move.ohko) bp = 160;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, targets[i]]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, targets[i]]);
					}
				}
			}
			if (!warnMoves.length) return;
			let warnMove = warnMoves[0];
			this.add('-activate', pokemon, 'ability: Forewarn', warnMove[0], warnMove[1]);
		},
	},
	hustle: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.modify(atk, 1.3);
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.modify(spa, 0.8);
		},
	},
	keeneye: {
		inherit: true,
		onBoost: function (boost, target, source, effect) {
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg) this.add("-fail", target, "unboost", "[from] ability: Keen Eye", "[of] " + target);
		},
	},
	moody: {
		inherit: true,
		onResidual: function (pokemon) {
			let toBoost = 'atk';
			let toLower = 'def';
			let previousMax = pokemon.baseStats.atk;
			let previousMin = pokemon.baseStats.def;
			for (let i in pokemon.baseStats) {
				if (pokemon.baseStats[i] > previousMax && pokemon.boosts[i] < 6) {
					toBoost = i;
					previousMax = pokemon.baseStats[i];
				}
				if (pokemon.baseStats[i] < previousMin && pokemon.boosts[i] > -6) {
					toLower = i;
					previousMin = pokemon.baseStats[i];
				}
			}
			let boost = {};
			boost[toBoost] = 2;
			boost[toLower] = -1;
			this.boost(boost);
		},
	},
	noguard: {
		inherit: true,
		onModifyMove: function (move) {
			move.affectedByImmunities = false;
		},
	},
	sandveil: {
		inherit: true,
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (this.isWeather('sandstorm')) return this.chainModify(1.125);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (this.isWeather('sandstorm')) return this.chainModify(1.125);
		},
	},
	shellarmor: {
		inherit: true,
		onDamage: function (damage, target, source, effect) {
			return damage * 93.75 / 100;
		},
	},
	shedskin: {
		inherit: true,
		onResidual: function (pokemon) {
			if (!pokemon.lastShedSkin) pokemon.lastShedSkin = pokemon.battle.turn;
			if (pokemon.hp && pokemon.status && pokemon.battle.turn - pokemon.lastShedSkin >= 3) {
				this.add('-activate', pokemon, 'ability: Shed Skin');
				pokemon.cureStatus();
				pokemon.lastShedSkin = pokemon.battle.turn;
			}
		},
	},
	skilllink: {
		inherit: true,
		onBasePower: function (basePower, pokemon, target, move) {
			if (move.multihit === 3) {
				return this.chainModify(5 / 3);
			}
		},
	},
	sniper: {
		inherit: true,
		onBasePower: function (basePower, pokemon, target, move) {
			return this.chainModify(1.125);
		},
	},
	snowcloak: {
		inherit: true,
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (this.isWeather('hail')) return this.chainModify(1.125);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (this.isWeather('hail')) return this.chainModify(1.125);
		},
	},
	superluck: {
		inherit: true,
		onBasePower: function (basePower, pokemon, target, move) {
			return this.chainModify(1.0625);
		},
	},
	tangledfeet: {
		inherit: true,
		onDamage: function (damage, target, source, effect) {
			if (target.volatiles('confusion')) return damage / 2;
		},
	},
	trace: {
		inherit: true,
		onUpdate: function (pokemon) {
			let possibleTargets = [];
			for (let i = 0; i < pokemon.side.foe.active.length; i++) {
				if (pokemon.side.foe.active[i] && !pokemon.side.foe.active[i].fainted) possibleTargets.push(pokemon.side.foe.active[i]);
			}
			while (possibleTargets.length) {
				let target = possibleTargets[0];
				let ability = this.getAbility(target.ability);
				let bannedAbilities = {flowergift:1, forecast:1, illusion:1, imposter:1, multitype:1, stancechange:1, trace:1, zenmode:1};
				if (bannedAbilities[target.ability]) {
					possibleTargets.splice(0, 1);
					continue;
				}
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
				pokemon.setAbility(ability);
				return;
			}
		},
	},
	victorystar: {
		inherit: true,
		onAllyModifyMove: function (move) {
			if (typeof move.basePower === 'number') {
				move.basePower *= 1.1;
			}
		},
	},
	wonderskin: {
		inherit: true,
		onSetStatus: function (status, target, source) {
			this.add('-message', 'Wonder Skin blocks status change.');
			return false;
		},
	},
};
