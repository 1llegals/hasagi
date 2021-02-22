const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Hasagi Yardım Komutları`)
.setTimestamp()
.addField('seviyesistemi', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}seviyesistemi\`\``)
.addField('kayıtsistemi', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}kayıtsistemi\`\``)
.addField('oylama', `oylama kanalında oylama başlatır.\nKullanım: \`\`${ayarlar.prefix}oylama\`\``)
.addField('çekiliş', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}çekiliş\`\``)
.addField('BotLog', `Botlog Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}botlog\`\``)
.addField('warn', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}uyarı\`\``)
.addField('ban', `etiketli kullanıcıyı banlar.\nKullanım: \`\`${ayarlar.prefix}ban\`\``)
.addField('banlist', `banlanan kullanıcıların listesi.\nKullanım: \`\`${ayarlar.prefix}banlist\`\``)
.addField('unban', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}unban\`\``)
.addField('unbanall', `daha eklenmedi..\nKullanım: \`\`${ayarlar.prefix}unbanall\`\``)
.addField('kick', `etiketlenen kullanıcıyı sunucudan atar.\nKullanım: \`\`${ayarlar.prefix}at\`\``)
.addField('isimdeğiş', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}nickdeğiş\`\``)
.addField('sil', `son mesajları silmenizi sağlar.\nKullanım: \`\`${ayarlar.prefix}sil\`\``)
.addField('hepsinisil', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}hepsinisil\`\``)
.addField('yavaşmod', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}yavaşmod\`\``)
.addField('kanalaçıklama', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}kanalaçıklama\`\``)
.addField('otocevap', `daha eklenmedi.\nKullanım: \`\`${ayarlar.prefix}otocevap\`\``)
.addField('id', `etiketlediğiniz kişinin idsini yazar.\nKullanım: \`\`${ayarlar.prefix}id\`\``)
.addField('nuke', `musa lütfen kullanma bütün kanalı yıkıp yeniden oluşturuyor.\nKullanım: \`\`${ayarlar.prefix}nuke\`\``)
.addField('herkesiçek', `idsini eklediğiniz kanala herkesi çeker.\nKullanım: \`\`${ayarlar.prefix}herkesiçek\`\``)
.addField('yetkilerim', `sunucudaki yetkilerini gösterir.\nKullanım: \`\`${ayarlar.prefix}yetkilerim\`\``)
.addField('herkesin-ismini-sıfırla', `sunucudaki herkesin takmaisimlerini sıfırlar.\nKullanım: \`\`${ayarlar.prefix}?herkesin-ismini-sıfırla\`\``)
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
  name: 'yetkili',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};