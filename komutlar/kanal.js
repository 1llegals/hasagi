const Discord = require('discord.js');
exports.run = async (client, message, args) => {
let herkes = message.guild.roles.cache.find(a => a.name === "@everyone");
if (args[0] === "aç") {
    
   message.channel.send(`${message.channel} başarıyla açıldı.`);
  
  message.channel.overwritePermissions(herkes, {
        'SEND_MESSAGES': true,

});
   
  }
  if(args[0] === "kapat"){
  message.channel.overwritePermissions(herkes, {
        'SEND_MESSAGES': false,

});
message.channel.send(`${message.channel} başarıyla kitlendi. \nKanalı açmak için: \`!kanal unlock\``);
  }}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["silkanal"],
  permLevel: 3
};

exports.help = {
  name: 'kanal',
  description: 'Kanal Silme',
  usage: ''
};