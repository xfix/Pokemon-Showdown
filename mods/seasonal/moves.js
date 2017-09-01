'use strict';

exports.BattleMovedex = {
	// EV
	darkaggro: {
		accuracy: 100,
		basePower: 40,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		id: "darkaggro",
		isNonstandard: true,
		name: "Dark Aggro",
		pp: 10,
		priority: 0,
		flags: {contact:1, protect: 1, mirror: 1},
		stealsBoosts: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spectral Thief", target);
		},
		onHit: function () {
			this.add('c|~EV|MINE!!!');
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// kamikaze
	kamikazerebirth: {
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		id: "kamikazerebirth",
		isNonstandard: true,
		name: "Kamikaze Rebirth",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Final Gambit", source.side.foe.active);
			this.add('-anim', source, "Healing Wish", source);
		},
		onTryHit: function (pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		onHit: function (target, source) {
			target = target.side.foe.pokemon[0];
			target.damage(source.maxhp - source.hp);
			source.faint();
		},
		sideCondition: 'kamikazerebirth',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				side = side.foe;
				this.debug('Kamikaze Rebirth started on ' + side.name);
				this.effectData.positions = [];
				for (let i = 0; i < side.active.length; i++) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				if (!this.effectData.positions[target.position]) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp);
					target.setStatus('');
					this.add('-heal', target, target.getHealth, '[from] move: Kamikaze Rebirth');
					this.effectData.positions[target.position] = false;
				}
				if (!this.effectData.positions.some(affected => affected === true)) {
					target.side.removeSideCondition('kamikazerebirth');
				}
			},
		},
		secondary: false,
		target: "self",
		type: "Flying",
	},
	// Scotteh
	geomagneticstorm: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		id: "geomagneticstorm",
		isViable: true,
		isNonstandard: true,
		name: "Geomagnetic Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Discharge", target);
		},
		secondary: false,
		target: "allAdjacent",
		type: "Electric",
	},
};