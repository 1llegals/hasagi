const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
   const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  let prex = new Discord.MessageEmbed()
    .setThumbnail(message.author.displayAvatarURL())
    .setAuthor(client.user.username, client.user.avatarURL)
    .addField(
      "Veriler",
      `> Toplam sunucu: **${client.guilds.cache.size}** \n> Toplam kullanıcı: **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** \n> Toplam kanal: **${client.channels.cache.size}**`)
    .addField(
      "Bot Geliştiricisi",
      `> <@407505028190830612> | **1llegal#0698**`)
    .addField(
      "Sürümler",
      `> Discord.js sürümü: **v${Discord.version}** \n> Node.js sürümü: **${process.version}**`)
    .addField(
      "Online",
      `> Online durumu: **${duration} **`)
   .addField(
      "Gecikmeler",`
      > Bot pingi: **${client.ws.ping}** \n
      > Mesaj gecikmesi: **${new Date().getTime() - message.createdTimestamp}**`)
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor("AQUA");
  message.channel.send(prex);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["stat", "i"]
};

exports.help = {
  name: "istatistik",
  description: "Botun İstatistiklerini Atar",
  usage: "!istatistik"
};