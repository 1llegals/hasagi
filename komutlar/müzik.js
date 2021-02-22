const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Sera Yardım Komutları`)
.setTimestamp()
.addField('Müzik', `Müzik Sistemi Komutlarını Gösterir.(Beta Test Aşamasındadır)\nKullanım: \`\`${ayarlar.prefix}müzikyardım\`\``)
.setFooter(`Sera Yardım Komutları`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
.setImage(`https://media.giphy.com/media/3Jbsjl6h85Os9A7amj/giphy.gif`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [""], 
  permLevel: 0 
};

exports.help = {
  name: 'müzik',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};