"use strict";

exports.BattleAbilities = {
	"contamination": {
		desc: "When this Pokemon enters the battlefield, it causes a permanent Toxic Rain that can only be stopped by Air Lock, Cloud Nine or another weather condition.",
		shortDesc: "On switch-in, this Pokemon summons Toxic Rain until another weather replaces it.",
		onStart: function (source) {
			this.setWeather('toxicrain');
			this.weatherData.duration = 0;
		},
		id: "contamination",
		name: "Contamination",
		rating: 5,
		num: -100,
	},
	poisonheal: {
		inherit: true,
		onImmunity: function (type, pokemon) {
			if (type === 'toxicrain') return false;
		},
	},
};