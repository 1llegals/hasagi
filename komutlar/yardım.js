const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Hasagi Yardım Komutları`)
.setTimestamp()
.addField('Kullanıcı', `Kullanıcı Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}kullanıcı\`\``)
.addField('Yetkili', `Yetkili Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}yetkili\`\``)
.addField('Eğlence', `Eğlence Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}eğlence\`\``)
.addField('Bot', `Bot Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}Bot\`\``)
.addField('Müzik', `Müzik Sistemi Komutlarını Gösterir.(Beta Test Aşamasındadır)\nKullanım: \`\`=müzik\`\``)
.setFooter(`Hasagi Yardım Komutları`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
.setImage(`https://media.giphy.com/media/3Jbsjl6h85Os9A7amj/giphy.gif`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["y"], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};