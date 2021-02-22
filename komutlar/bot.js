const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Hasagi Yardım Komutları`)
.setTimestamp()
.addField('şikayetöneri', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}öneri\`\``)
.addField('sunucubilgi', `sunucu bilgilerini Gösterir.\nKullanım: \`\`${ayarlar.prefix}sunucubilgi\`\``)
.addField('istatistik', `botun istatistiklerini Gösterir.\nKullanım: \`\`${ayarlar.prefix}istatistik\`\``)
.addField('prefix', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}prefix\`\``)
.addField('ping', `botun gecikme süresini Gösterir.\nKullanım: \`\`${ayarlar.prefix}ping\`\``)
.addField('emojiler', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}emojiler\`\``)
.addField('roller', `sunucudaki rolleri gösterir.\nKullanım: \`\`${ayarlar.prefix}roller\`\``)
.addField('emojibilgi', `etiketlenen emoji hakkında bilgileri gösterir.\nKullanım: \`\`${ayarlar.prefix}emoji\`\``)
.setFooter(`Hasagi Yardım Komutları`, client.user.avatarURL())
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
  name: 'bot',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};