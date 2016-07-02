'use strict';

exports.BattleScripts = {
    init: function () {
        for (let i in this.data.Pokedex) {
            let template = this.getTemplate(i);
            let newStats = {};
            let stats = [];
            for (let j in template.baseStats) {
                stats.push(template.baseStats[j]);
            }
            let bestStatVal = Math.max.apply(Math, stats);
            let worstStatVal = Math.min.apply(Math, stats);
            for (let j in template.baseStats) {
                newStats[j] = template.baseStats[j];
                if (template.baseStats[j] === bestStatVal) {
                    newStats[j] = worstStatVal;
                }
                if (template.baseStats[j] === worstStatVal) {
                    newStats[j] = bestStatVal;
                }
            }
            this.modData('Pokedex', i).baseStats = newStats;
        }
    },
};
