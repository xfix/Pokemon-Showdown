// This code is awful, and I know it.

var irc = require('irc');

var config = Config.ircconfig;
var connection = exports.connection = new irc.Client(config.server, config.nickname, config);

function identity(value) {
	return function identityFunction() {
		return value;
	}
}

function parseRaw(message) {
	return message
		.replace(/<font color=#559955>Super Effective<\/font><\/b>/g, "\x033Super Effective\x0F")
		.replace(/<a [^>]*room=[^>]*>(.*?)<\/a>/g, "$1")
		.replace(/<a href="(.+?)">(.*?)<\/a>/g, "[$2]($1)")
		.replace(/<li>/g, "\n  • ")
		.replace(/<\/?(?:ul|font size|div)[^>]*?>/g, "")
		.replace(/<small style="display:none">.*?<\/small>/g, "")
		.replace(/<\/?(?:b|strong)(?: class="username")?>/g, "\x02")
		.replace(/<\/?em>/g, "\x1D")
		.replace(/<(?:\/span|\/font|font color=black)>/g, "\x0F")
		.replace(/<span class="message-effect-weak">/g, "\x02\x034")
		.replace(/<span class="message-effect-resist">/g, "\x02\x0312")
		.replace(/<span class="message-effect-immune">/g, "\x02\x0314")
		.replace(/<span class="message-learn-canlearn">/g, "\x02\x1F\x033")
		.replace(/<span class="message-learn-cannotlearn">/g, "\x02\x1F\x034")
		.replace(/<font color=#585858>/g, "\x0314")
		.replace(/<font color=#999999>/g, "\x0314")
		.replace(/&nbsp;|&ThickSpace;| +/g, " ")
		.replace(/&#10003;/g, "✓")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&#x2f;/g, "/")
		.replace(/&eacute;/, "é")
		.replace(/&amp;/g, "&")
		.split(/<br\s*\/?>/);
}

function verifyParts(parts) {
	if (parts.length > 6) {
		return false;
	}
	for (var i = 0; i < parts.length; i++) {
		var part = parts[i];
		if (part.length > 440) {
			return false;
		}
	}
	return true;
}

function filter(message) {
	var parts = message.split(/\n/);
	var rawSignal = '|raw|';
	var dataSignal = '|c|~|/data-';
	var errorSignal = '|html|<div class="message-error">';
	var finalParts = [];
	for (var i = 0; i < parts.length; i++) {
		var part = parts[i];
		var message;
		if (part.slice(0, rawSignal.length) === rawSignal) {
			message = part.slice(rawSignal.length);
			Array.prototype.push.apply(finalParts, parseRaw(message));
		} else if (part.slice(0, dataSignal.length) === dataSignal) {
			message = part.slice(dataSignal.length);
			var splitter = message.indexOf(' ');
			var type = message.slice(0, splitter);
			var what = message.slice(splitter + 1);
			finalParts.push(dataParsers[type](what));
		} else if (part.slice(0, errorSignal.length) !== errorSignal) {
			finalParts.push(part);
		}
	}
	if (!verifyParts(finalParts)) return "Response too long.";
	return finalParts.join("\n");
}

var dataParsers = {
	pokemon: function (specie) {
		var specieData = Tools.getTemplate(specie);
		var result = [];
		var tier = specieData.tier;
		if (!require('./data/tpp').BattleTPP[specieData.id] && !specieData.isNonstandard && !specieData.isUnreleased) {
			tier = 'T-Rule ' + tier;
		}
		result.push(tier);
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
			baseStats.push('\x0314' + stat + ':\x0F ' + statValue);
		}
		baseStats.push('\x0314BST:\x0F ' + bst);
		result.push(baseStats.join(', '));

		var abilityData = specieData.abilities;
		var abilityOrder = [0, 1, 'H'];
		var abilityOrderLength = abilityOrder.length;
		var abilities = [];

		for (i = 0; i < abilityOrderLength; i++) {
			var abilityPosition = abilityOrder[i];
			var ability = abilityData[abilityPosition];
			if (ability) {
				if (abilityPosition === 'H') {
					ability = '\x1D' + ability + '\x1D';
				}
				abilities.push(ability);
			}
		}
		result.push('\x0314Abilities:\x0F ' + abilities.join(', '));

		return result.join(' | ');
	},
	item: function (item) {
		var itemData = Tools.getItem(item);
		return [itemData.name, itemData.desc].join(' | ');
	},
	ability: function (ability) {
		var abilityData = Tools.getAbility(ability);
		return [abilityData.name, abilityData.shortDesc].join(' | ');
	},
	move: function (move) {
		var moveData = Tools.getMove(move);

		var result = [];
		result.push(moveData.name);
		result.push(moveData.category);
		result.push(moveData.type + '-type');

		if (moveData.category !== 'Status') {
			if (moveData.basePower) {
				result.push('\x0314Power:\x0F ' + moveData.basePower + ' BP');
			}
			else {
				result.push('\x0314Power:\x0F —');
			}
		}

		if (moveData.accuracy === true) {
			result.push('\x0314Accuracy:\x0F —');
		}
		else {
			result.push('\x0314Accuracy:\x0F ' + moveData.accuracy + '%');
		}

		result.push('\x0314PP:\x0F ' + moveData.pp * 8 / 5);
		result.push(moveData.shortDesc);

		return result.join(' | ');
	}
};

function FakeRoom(id) {
	this.id = id;
}
FakeRoom.prototype.isMuted = identity(false);
FakeRoom.prototype.users = {};

var ircUser = {
	named: false,
	can: identity(false),
	resetName: identity(),
	tryJoinRoom: identity(null),
	leaveRoom: identity(),
	group: ' '
};

var ircConnection = {
	sendTo: function (room, message) {
		connection.say(room.id, filter(message));
	},
	popup: identity()
};

connection.on('message', function parseMessage(from, to, message) {
	if (to.charAt(0) !== '#') {
		to = from;
	}
	if (/\byay\b/i.test(message)) {
		connection.say(to, 'Y+A+Y')
	}
	// DootBot conflict
	if (message.slice(0, 2) === '!?') return;
	if (message.charAt(0) !== '!' && message.charAt(0) !== '/') return;
	CommandParser.parse('/' + message.slice(1), new FakeRoom(to), ircUser, ircConnection);
});
