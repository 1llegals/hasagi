const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {

  let prefix = '!'
  if(!message.mentions.members.first()) return message.channel.send('Bir kullanıcıyı etiketlemelisin.');
  const datalar = await data.fetch(`harmanim.baba.nerdee.carsafim.${message.mentions.members.first().user.id}.${message.guild.id}`);
  if(!datalar) return message.channel.send('Hiç isim değişikliği yapmamış.');
  let i = 1;
  message.channel.send(`${message.mentions.members.first()} kullanıcısının şu ana kadar yaptığı tüm isim değişiklikleri:\n${datalar.map(a => `**${i++}** • ${a.isimler}`).join(`\n`)}`);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'nickname-log'
};
