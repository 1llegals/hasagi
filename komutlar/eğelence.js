const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Sera Yardım Komutları`)
.setTimestamp()
.addField('sor', `bot sorulan soruyu cevaplar.\nKullanım: \`\`${ayarlar.prefix}sor\`\``)
.addField('animegif', `rastgele anime gifi atar.\nKullanım: \`\`${ayarlar.prefix}animegif\`\``)
.addField('1v1', `etiketlediğin kişiyle düello atarsın.\nKullanım: \`\`${ayarlar.prefix}1v1\`\``)
.addField('öpücük', `etiketlediğiniz kullanıcıyı öpersiniz.\nKullanım: \`\`${ayarlar.prefix}öpücük\`\``)
.addField('c', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}c\`\``)
.addField('d', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}d\`\``)
.addField('e', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}e\`\``)
.addField('f', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}f\`\``)
.addField('g', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}g\`\``)
.addField('h', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}h\`\``)
.addField('i', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}i\`\``)
.addField('j', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}j\`\``)
.addField('k', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}k\`\``)
.addField('l', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}l\`\``)
.addField('m', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}m\`\``)
.addField('n', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}n\`\``)
.addField('o', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}o\`\``)
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
  name: 'eğelence',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};