const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Hasagi Yardım Komutları`)
.setTimestamp()
.addField('avatar', `Kullanıcının avatarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}avatar\`\``)
.addField('seviye', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}seviye\`\``)
.addField('kullanıcıbilgi', `Kullanıcı hakkında bilgileri Gösterir.\nKullanım: \`\`${ayarlar.prefix}kullanıcı\`\``)
.addField('rolbilgi', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}rolbilgi\`\``)
.addField('kanalbilgi', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}kanalbilgi\`\``)
.addField('çevir', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}çevir\`\``)
.addField('platform', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}platform\`\``)
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
  name: 'kullanıcı',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};