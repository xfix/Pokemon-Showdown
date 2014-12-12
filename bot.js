// Avoid V8 lack of optimizations for try {} catch (e) {}
function ignoreErrors(callback, self, arguments) {
	//try {
		return callback.apply(self, arguments);
	//}
	//catch (e) {}
}

var config = Config.ircconfig;
config.channels = [config.channel];

function Client(config) {
	var irc = require('irc');
	this.connection = new irc.Client(config.server, config.nickname, config);
}

Client.prototype.addListener = function () {
	var connection = this.connection;
	connection.addListener.apply(connection, arguments);
};

Client.prototype.say = function (message) {
	this.connection.say(config.channel, message.replace(/\s+/g, " "));
};

var client = new Client(config);
var commands = require('./config/commands').commands;

client.addListener('message', function parseMessage(from, to, message) {
	var callbacks = {
		pokemon: function (specie) {
			var specieData = require('./data/pokedex').BattlePokedex[specie];
			var result = [];
			result.push(specieData.species);
			result.push(specieData.types.join("/") + '-type');

			var baseStats = [];
			var bst = 0;
			var stats = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
			var statsLength = stats.length;
			var i;
			for (i = 0; i < statsLength; i++) {
				var stat = stats[i];
				var statValue = specieData.baseStats[toId(stat)];
				bst += statValue;
				baseStats.push(stat + ': ' + statValue);
			}
			baseStats.push('BST: ' + bst);
			result.push(baseStats.join(', '));

			var abilityData = specieData.abilities;
			var abilityOrder = [0, 1, 'H'];
			var abilityOrderLength = abilityOrder.length;
			var abilities = [];

			for (i = 0; i < abilityOrderLength; i++) {
				var abilityPosition = abilityOrder[i];
				var note = '';
				if (abilityPosition === 'H') {
					note = ' (Hidden Ability)';
				}
				if (abilityData[abilityPosition]) {
					abilities.push(abilityData[abilityPosition] + note);
				}
			}
			result.push('Abilities: ' + abilities.join(', '));

			return result.join(' | ');
		},
		item: function (item) {
			var itemData = require('./data/items').BattleItems[item];
			return [itemData.name, itemData.desc].join(' | ');
		},
		ability: function (ability) {
			var abilityData = require('./data/abilities').BattleAbilities[ability];
			return [abilityData.name, abilityData.shortDesc].join(' | ');
		},
		move: function (move) {
			var moveData = require('./data/moves').BattleMovedex[move];

			var result = [];
			result.push(moveData.name);
			result.push(moveData.category);
			result.push(moveData.type + '-type');

			if (moveData.category !== 'Status') {
				if (moveData.basePower) {
					result.push('Power: ' + moveData.basePower + ' PP');
				}
				else {
					result.push('Power: —');
				}
			}

			if (moveData.accuracy === true) {
				result.push('Accuracy: —');
			}
			else {
				result.push('Accuracy: ' + moveData.accuracy + '%');
			}

			result.push('PP: ' + moveData.pp * 8 / 5);
			result.push(moveData.shortDesc);

			return result.join(' | ');
		}
	}

	function reply(message) {
		var splitMessage = message.split("\n");
		var splitMessageLength = splitMessage.length;
		var i = 0;
		for (i = 0; i < splitMessageLength; i++) {
			var message = splitMessage[i];
			if (message) {
				makeReply(message);
			}
		}
		return;
	}

	function makeReply(message) {
		message = message.replace(/^\|raw\|/, "");

		if (message.charAt(0) === '|') {
			var parts = /\/data-(\w+) (.*)/.exec(message);
			var type = parts[1];
			var specie = toId(parts[2]);
			message = callbacks[type](specie);
		}
		else {
			message = message.replace(/<br\s*\/?>/g, "\n")
				.replace(/<a href="(.+?)">(.*?)<\/a>/g, "[$2]($1)")
				.replace(/<li>/g, "\n* ")
				.replace(/<\/?(?:span|ul|font|em).*?>/g, "")
				.replace(/<\/?b>/g, "**")
				.replace(/&nbsp;|&ThickSpace;|\s+/g, " ")
				.replace(/&#10003;/g, "✓");
		}
		self.say(to, message);
	}

	var self = this;
	var messageParts = /^[!/](\w+)\s*(.*)/.exec(message);
	if (messageParts) {
		var command = messageParts[1].toLowerCase();
		var commandArguments = messageParts[2];

		var callableCommand = commands[command];

		while (typeof callableCommand === "string") {
			callableCommand = commands[callableCommand];
		}

		if (typeof callableCommand !== "function") {
			return;
		}

		ignoreErrors(callableCommand, {
			can: function () {
				return false;
			},
			canBroadcast: function () {
				return true;
			},
			parse: function (message) {
				return parseMessage(from, to, message);
			},
			sendReply: reply,
			sendReplyBox: reply
		}, [
			commandArguments,
			{
				id: 'lobby'
			},
			{
				can: function() {
					return false;
				},
				leaveRoom: function () {

				},
				name: from
			},
			{
				send: function () {}
			},
			command
		]);
	}
	else if (/\byay\b/i.test(message)) {
		this.say(to, 'Y+A+Y');
	}
});

module.exports = client;
