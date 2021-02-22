const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Hasagi Yardım Komutları`)
.setTimestamp()
.addField('nickname-log', `kullanmak için kullanıcı etiketle.\nKullanım: \`\`${ayarlar.prefix}nickname-log\`\``)
.addField('mesajlog', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}mesajlog\`\``)
.addField('seslog', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}seslog\`\``)
.addField('rollog', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}rollog\`\``)
.addField('davetlog', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}davetlog\`\``)
.addField('ban-kick-warnlog', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}logkanalı\`\``)
.addField('önerilog', `sunucudaki üyelerin öneri ve şikayetleri moderatörlere iletilir.\nKullanım: \`\`${ayarlar.prefix}önerilog\`\``)
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
  name: 'botlog',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};