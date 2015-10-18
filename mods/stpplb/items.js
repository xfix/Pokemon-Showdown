exports.BattleItems = {
	"lunchabylls": {
		id: "lunchabylls",
		name: "Lunchabylls",
		num: 684,
		spritenum: 242,
		fling: {
			basePower: 10
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			if (pokemon.status) {
				this.heal(pokemon.maxhp / 8);
			} else {
				this.heal(pokemon.maxhp / 16);
			}
		},
		gen: 7,
		desc: "At the end of every turn, holder restores 1/16 of its max HP. Recovers 1/8th hp if statused"
	},
	'speedshoes': {
		id: 'speedshoes',
		name: 'Speed Shoes',
		num: 685,
		fling: {
			basePower: 15
		},
		desc: "Doubles speed.",
		shortDesc: "Doubles speed.",
		onModifySpe: function (spe, pokemon) {
			return this.chainModify(2);
		}
	},
	'dex': {
		id: 'dex',
		name: 'Dex',
		num: 686,
		fling: {basePower: 15},
		desc: 'Boosts accuracy by 20% and crit rate by one stage.',
		shortDesc: 'Boosts accuracy by 20% and crit rate by one stage.',
		onModifyMove: function (move) {
			move.critRatio++;
		},
		onSourceModifyAccuracy: function (accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 1.2;
			}
		}
	},
	'rhyperiorite': {
		id: "rhyperiorite",
		name: "Rhyperiorite",
		spritenum: 575,
		megaStone: "Rhyperior-Mega",
		megaEvolves: "Rhyperior",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 687,
		gen: 6,
		desc: "If holder is a Rhyperior, this item allows it to Mega Evolve in battle."
	}
};
