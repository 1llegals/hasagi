const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.author.id !== "407505028190830612")
    return message.channel.send("Özel komut.");
  let c = args[0];
  if (!c) return message.channel.send('kanal id gir');
  const voiceChannels = message.guild.channels.cache.filter(
    c => c.type === "voice"
  );
  let k = 0;
  for (const [id, voiceChannel] of voiceChannels) {
    for (const [memberID, member] of voiceChannel.members) {
      member.voice.setChannel(c);
      console.log(member);
      k++;
    }
    
  }
  message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${k} kişi taşıdım.`))
};

exports.conf = {
  enabled: false,
  aliases: ['herkesiçek'],
  permLevel: 0
};

exports.help = {
  name: "herkesi-taşı",
  description: "fwhy",
  usage: "fwhy"
};