#!/usr/bin/env nodejs
"use strict"

var battleEngine = require('./battle-engine')
var tools = require('./tools')
var scripts = require('./data/scripts').BattleScripts
scripts.__proto__ = tools
var pokemon = process.argv.slice(2)
if (pokemon.length == 0) {
	console.log("Usage: random-team [pokemon]...");
}
var megaStone = false
pokemon.forEach(function (pokemon, index) {
	var level = 100
	var slash = pokemon.indexOf("/")
	if (slash != -1) {
		level = +pokemon.substring(slash + 1)
		pokemon = pokemon.substring(0, slash)
	}
	var set = scripts.randomSet(pokemon, index + 1, megaStone, level)
	megaStone = megaStone || tools.getItem(set.item).megaStone
	var text = set.name
	if (set.item) {
		text += " @ " + set.item
	}
	text += "\n"
	if (set.ability) {
		text += "Ability: " + set.ability + "\n"
	}
	if (level !== 100) {
		text += "Level: " + level + "\n"
	}
	if (set.shiny) {
		text += "Shiny: Yes\n"
	}
	set.moves.forEach(function (move) {
		var moveData = tools.getMove(move)
		text += "- " + moveData.name + "\n"
	})
	console.log(text)
})
