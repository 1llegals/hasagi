const Discord = require('discord.js');
let ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix;

exports.run = function(client, msg, author) {
    let yazi = msg.mentions.members.first();
    if(!yazi){
      msg.channel.sendMessage('> Örnek Kullanım: '+prefix+'öpücük istediğiniz kişiye öpücük atar  ');
    }if(yazi){
     const Embed = new Discord.MessageEmbed()
      .setTitle('💋👅')
      .setDescription(`Vouvv,** <@${msg.author.id}> adlı kullanıcı ${yazi} adlı kullanıcıya öpücük attı.!**`)
      .setColor('RANDOM')
      .setImage('https://media.tenor.com/images/cd4582aea4d353f63a21173dc9b7f473/tenor.gif')
      msg.channel.send(Embed);
    } 
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'öpücük',
  description: 'Bu komut ile istediğiniz kişiye öpücük atarsınız',
  usage: 'öpücük <kullanıcı>' 
}