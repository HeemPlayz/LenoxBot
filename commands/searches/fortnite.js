exports.run = async (client, msg, args, lang) => {
	const Discord = require('discord.js');
	const Fortnite = require('fortnite');
	const fortniteclient = new Fortnite('f00bb1ee-0be8-4474-bbf4-58a382e3245d');

	const input = args.slice();

	if (!input[0]) return msg.channel.send(lang.fortnite_noinput);
	if (input.length > 1) {
		if (input[1].toLowerCase() !== 'pc' && input[1].toLowerCase() !== 'psn' && input[1].toLowerCase() !== 'xbl') return msg.channel.send(lang.fortnite_invalidconsole);
	}

	let stats;
	try {
		stats = await fortniteclient.getInfo(input[0], input[1] ? input[1] : 'PC');
	} catch (error) {
		return msg.channel.send(lang.fortnite_playernotfound);
	}

	const embed = new Discord.RichEmbed()
		.setURL(stats.url)
		.setColor('#f45942')
		.setAuthor(`${stats.username} || ${stats.platformNameLong}`);
	for (let i = 0; i < stats.lifetimeStats.length; i++) {
		const stat = stats.lifetimeStats[i].stat;
		const value = stats.lifetimeStats[i].value;
		embed.addField(stat, value, true);
	}
	return msg.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	shortDescription: 'Games',
	aliases: [],
	userpermissions: [],
	dashboardsettings: true
};
exports.help = {
	name: 'fortnite',
	description: 'Shows you Fortnite stats about a player on every console',
	usage: 'fortnite {EpicGames Username} [pc, xbl, psn (pc default)]',
	example: ['fortnite Monkeyyy11ez psn'],
	category: 'searches',
	botpermissions: ['SEND_MESSAGES']
};
