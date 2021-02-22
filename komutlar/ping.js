const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.addField("**__Gecikme Sürem__**", `**${client.ws.ping}** ms Olarak Hesaplandı.`,true)
.setFooter(client.user.username, client.user.avatarURL())

message.channel.send(embed);
};

module.exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0,
kategori: "sunucu"
};

module.exports.help = {
name: "ping",
description: "ping",
usage: "ping"
};
