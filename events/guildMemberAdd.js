const Discord = require('discord.js');
exports.run = (client, member) => {
	const tableload = client.guildconfs.get(member.guild.id);
	const botconfs = client.botconfs.get('botconfs');
	if (!tableload) return;

	if (tableload.language === '') {
		tableload.language = 'en-US';
		client.guildconfs.set(member.guild.id, tableload);
	}
	// CHANGE TO THE NEW CROWDIN SYSTEM
	if (tableload.language === 'en') {
		tableload.language = 'en-US';
		client.guildconfs.set(member.guild.id, tableload);
	}

	if (tableload.language === 'ge') {
		tableload.language = 'de-DE';
		client.guildconfs.set(member.guild.id, tableload);
	}

	if (tableload.language === 'fr') {
		tableload.language = 'fr-FR';
		client.guildconfs.set(member.guild.id, tableload);
	}
	// CHANGE TO THE NEW CROWDIN SYSTEM

	const lang = require(`../languages/${tableload.language}.json`);

	let muteOfThisUser;
	for (const i in botconfs.mutes) {
		if (botconfs.mutes[i].discordserverid === member.guild.id && botconfs.mutes[i].memberid === member.id) {
			muteOfThisUser = botconfs.mutes[i];
		}
	}

	if (muteOfThisUser) {
		if ((muteOfThisUser.muteEndDate - Date.now()) > 0) {
			if (member.guild.roles.get(muteOfThisUser.roleid)) {
				const mutedRole = member.guild.roles.get(muteOfThisUser.roleid);
				member.addRole(mutedRole);
			}
		} else {
			delete botconfs.mutes[muteOfThisUser.mutescount];
			client.botconfs.set('botconfs', botconfs);
		}
	}

	if (tableload.welcomelog === 'true') {
		const messagechannel = client.channels.get(tableload.welcomelogchannel);
		const embed = new Discord.RichEmbed()
			.setFooter(lang.guildmemberaddevent_userjoined)
			.setTimestamp()
			.setColor(0x00AE86)
			.setAuthor(`${member.user.tag} (${member.user.id})`, member.user.avatarURL);
		messagechannel.send({
			embed: embed
		});
	}

	if (tableload.welcome === 'true') {
		if (tableload.welcomemsg.length < 1) return;
		const message = tableload.welcomemsg;
		const messagechannel = client.channels.get(tableload.welcomechannel);
		const newMessage = message.replace('$username$', member.user.username)
			.replace('$usermention$', member.user)
			.replace('$usertag$', member.user.tag)
			.replace('$userid$', member.user.id)
			.replace('$guildname$', member.guild.name)
			.replace('$guildid$', member.guild.id);
		messagechannel.send(newMessage);
	}
};
