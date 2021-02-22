const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const ayarlar = require("./ayarlar.json");
require("./util/eventLoader")(client);
const db = require("quick.db");
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`...`);
  console.error("---");

  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

let prefix = ayarlar.prefix;
  




console.log("Ben Şuan Aktifim...");
console.log("---------<3 Plasmic Code----------");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek. Benim Ailem Plasmictir !.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return message.author.send("**Beni Sunucuda Deneyin**");
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

//dmhoşgeldin
client.on("guildMemberAdd", member =>{
    const hg = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(member.guild.name + 'Sunucusuna Hoşgeldin!')
    .setDescription(`Sunucumuza katıldığın için teşekkürler :)`)
    .setFooter('Hoşgeldin')
    .setTimestamp()
    member.send(hg)
})

//selamhoşgeldin
client.on("guildMemberAdd", member =>{
    let user = client.users.cache.get(member.id)
    let moment = require('moment')
    moment.locale('tr')

    let kanalid = client.channels.cache.get('794721145530220595') ///kanal,d
    if(!kanalid) return;

    const kurulma = new Date().getTime() - user.createdAt.getTime();
    var kontrol;

    if(kurulma > 2592000000 ) kontrol = 'Güvenli';
    if(kurulma < 2592000000 ) kontrol = 'Şüpheli';

    let yetkili = '407505028190830612'; /////yetkili rol id
    kanalid.send('Sunucumuza Hoşgeldin <@'+member.id+'>\n\nSeninle beraber **'+member.guild.memberCount+' kişiyiz!\nKaydının yapılması için <@'+yetkili+'> sizinle ilgilenicektir.\n\nKullanıcı Bilgileri;\nHesap Kuruluş Tarihi: '+moment(user.createdAt).format('DD/MM/YYYY HH:mm:ss')+'\nHesabı Güvenlimi?: '+kontrol+'')
})

//nicknamelog 
const data = require('quick.db');
const logs = require('discord-logs');
logs(client);
client.on('guildMemberNicknameUpdate', async (member, oldNickname, newNickname) => require('quick.db').push(`harmanim.baba.nerdee.carsafim.${member.user.id}.${member.guild.id}`, { isimler: `${oldNickname ? oldNickname : member.user.username} -> ${newNickname ? newNickname : member.user.username}` }));


//OTOMESAJ
  setInterval(function() {
    let krevzkanal = client.channels.cache.get("794904586317332491"); //kanal id girin
    if (krevzkanal) {
      krevzkanal.send(
        "bu otomatik mesajdır doblocular banlanıcaktır"//botun atacağı mesaj
      );//krevz
    }
  }, 3300000);//süreyi buradan ayarlayın (220000 önerilen)


////////////////////////otorol
client.on('guildMemberAdd', async (member) =>{
    let otorol = await db.fetch(`SwenlorOtorol.${member.guild.id}`)
    member.roles.add(otorol) // gelene artık rol vericek.
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////gelen-giden
client.on('guildMemberAdd', async member => {
  let fc = await db.fetch(`FrenzyResimsizHGBB_${member.guild.id}`)
  let frenzychannel = client.channels.cache.get(fc)
  if(!frenzychannel) return
  frenzychannel.send(`${member} Sunucuya Hoşgeldin İyi Vakit Geçirmen Dileğiyle`)
})
client.on('guildMemberRemove', async member => {
  let fc = await db.fetch(`FrenzyResimsizHGBB_${member.guild.id}`)
  let frenzychannel = client.channels.cache.get(fc)
  if(!frenzychannel) return
  frenzychannel.send(`${member.user.username} Sunucudan Ayrıldı :(`)
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////eklendim atıldım


//---------------------------------------Mod Log----------------------------//
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});




client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});


client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.cache.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.cache.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roles.create', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.cache.get(db.fetch(`codeminglog_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});
client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`One Channel Deleted!`)
      .addField(`Deleter Channel`, entry.executor.tag)
      .setColor("BLACK")
      .addField(`Deleted Channel`, channel.name)
      .addField(`Result`, `Channel Back Opened!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`A Channel Opened!`)
      .setColor("BLACK")
      .addField(`Channel Opener`, entry.executor.tag)
      .addField(`Drop Down Channel`, channel.name)
      .addField(`Result`, `Channel Back Deleted!`);
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roles.create", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.delete();

      const embed = new Discord.MessageEmbed()
        .setTitle(`Bir Rol Açıldı!`)
        .setColor("BLACK")
        .addField(`Açan`, entry.executor.tag)
        .addField(`Açılan Rol`, role.name)
        .addField(`Sonuç`, `Rol Geri Silindi!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Açan`, entry.executor.tag)
            .addField(`Açılan Rol`, role.name)
            .addField(`Sonuç`, `Rol geri silindi! Rolü açan sunucudan atıldı!`);
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(
              `Sonuç`,
              `Rol geri silinmedi! Rolü açan ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.delete();

        const embed = new Discord.MessageEmbed()
          .setTitle(`Bir Rol Silindi!`)
          .setColor("BLACK")
          .addField(`Rolü Açan`, entry.executor.tag)
          .addField(`Açılan Rol`, role.name)
          .addField(`Sonuç`, `Rol Geri Silindi!`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  } else {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.delete();

      const embed = new Discord.MessageEmbed()
        .setTitle(`A Role Created!`)
        .setColor("BLACK")
        .addField(`Role Creator`, entry.executor.tag)
        .addField(`Creating Role`, role.name)
        .addField(`Result`, `Role Back A Deleted!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Created!`)
            .setColor("BLACK")
            .addField(`Role Creator`, entry.executor.tag)
            .addField(`Creating Role`, role.name)
            .addField(
              `Result`,
              `Role Back A Deleted! Role Creator Kicking Has Guild!`
            );
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Created!`)
            .setColor("BLACK")
            .addField(`Role Creator`, entry.executor.tag)
            .addField(`Creating Role`, role.name)
            .addField(
              `Result`,
              `The role could not be turned delete back! Reached ${limito}/${slimito} limit, which opens the role!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.delete();

        const embed = new Discord.MessageEmbed()
          .setTitle(`A Role Created!`)
          .setColor("BLACK")
          .addField(`Role Creator`, entry.executor.tag)
          .addField(`Creating Role`, role.name)
          .addField(`Result`, `Role Back A Open`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.guild
        .roles.create({
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
        })
        .then(r => r.setPosition(role.position));

      const embed = new Discord.MessageEmbed()
        .setTitle(`Bir Rol Silindi!`)
        .setColor("BLACK")
        .addField(`Silen`, entry.executor.tag)
        .addField(`Silinen Rol`, role.name)
        .addField(`Sonuç`, `Rol Geri Açıldı!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(`Sonuç`, `Rol geri açıldı! Rolü silen sunucudan atıldı!`);
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(
              `Sonuç`,
              `Rol geri açılamadı! Rolü silen ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.guild
          .roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable,
            position: role.position
          })
          .then(r => r.setPosition(role.position));

        const embed = new Discord.MessageEmbed()
          .setTitle(`Bir Rol Silindi!`)
          .setColor("BLACK")
          .addField(`Silen`, entry.executor.tag)
          .addField(`Silinen Rol`, role.name)
          .addField(`Sonuç`, `Rol Geri Açıldı!`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  } else {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.guild
        .roles.create({
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
        })
        .then(r => r.setPosition(role.position));

      const embed = new Discord.MessageEmbed()
        .setTitle(`A Role Deleted!`)
        .setColor("BLACK")
        .addField(`Role Deleter`, entry.executor.tag)
        .addField(`Deleting Role`, role.name)
        .addField(`Result`, `Role Back A Open!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Deleted!`)
            .setColor("BLACK")
            .addField(`Role Deleter`, entry.executor.tag)
            .addField(`Deleting Role`, role.name)
            .addField(
              `Result`,
              `Role Back A Open! Role Deleter Kicking Has Guild!`
            );
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Deleted!`)
            .setColor("BLACK")
            .addField(`Role Deleter`, entry.executor.tag)
            .addField(`Deleting Role`, role.name)
            .addField(
              `Result`,
              `The role could not be turned back! Reached ${limito}/${slimito} limit, which opens the role!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.guild
          .roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable,
            position: role.position
          })
          .then(r => r.setPosition(role.position));

        const embed = new Discord.MessageEmbed()
          .setTitle(`A Role Deleted!`)
          .setColor("BLACK")
          .addField(`Role Deleter`, entry.executor.tag)
          .addField(`Deleting Role`, role.name)
          .addField(`Result`, `Role Back A Open`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  }
});
setInterval(async() => {
  client.guilds.cache.forEach(async guild => {
  let mid = await db.fetch(`cfxmid${guild.id}`)
  let channel = await db.fetch(`cfxcn${guild.id}`)
  if(!mid) return;
  if(!channel) return;
  guild.channels.get(`${channel}`).fetchMessage(mid).then(async m => {
  let time = await db.fetch(`cfxcekilis${guild.id}`)
  if(!time) return;
  let sures = await db.fetch(`cfxsure${guild.id}`)
  let cont = await db.fetch(`cfxm${guild.id}`)   
  let timing = Date.now() - time
  let aracheck = new Discord.MessageEmbed()
  .setFooter(`© ${client.guilds.cache.get(guild.id).name}`)
  .setAuthor('Çekiliş ödülü:' + ' [ ' +cont+ ' ]')
  .setColor("ff0000")
  .setDescription(`**Çekilişe kalan**:` + ` \`${moment.duration(sures - timing).format(`DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)}\` ` )
  m.edit(aracheck)
  await m.react('🎉');
    
  if(timing >= sures) {
    let users = await db.fetch(`cfxcdb.${guild.id}`)
    let list = users.filter(u => u);
    let joins = list[Math.floor(Math.random() * list.length)]
    if (joins == undefined) joins = `Çekilişe kimse katılmadı!`
    if(joins != `Çekilişe kimse katılmadı!` && joins != undefined) {
    let kazananlar = new Discord.MessageEmbed()
    .addField('** **', '**Kazananlar:** \n'+ guild.members.get(joins))
    .setAuthor('Çekiliş ödülü:' + ' [ ' +cont+ ' ]')
    .setFooter(`© ${client.guilds.cache.get(guild.id).name}`)
    .setColor("ff0000")
 
    guild.channels.cache.get(channel).send(kazananlar)
    }
    let endEmbed = new Discord.MessageEmbed()
    .setFooter(`${client.guilds.cache.get(guild.id).name}`)
    .setColor("ff0000")
    .setAuthor('Çekiliş ödülü:' + ' [ ' +cont+ ' ]')
    .setDescription('**Kazananlar**: \n'+ guild.members.cache.get(joins))
    m.edit(endEmbed)
  db.delete(`cfxcekilis${guild.id}`)

  }
})
}) 
}, 5000)

client.on('raw', async event => {
  if(event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE'){
      client.guilds.cache.forEach(async guild => {
          let channel_id = await db.fetch(`cfxcn${guild.id}`)
          let mid = await db.fetch(`cfxmid${guild.id}`)
          let channel = guild.channels.cache.find(x => x.id === channel_id)
          if(!mid) return;
          if(!channel) return;
          let message = channel.fetchMessage(mid).then(async msg => {
          let user = msg.guild.members.cache.get(event.d.user_id)
          if(user.id != client.user.id){
              var objmember = msg.guild.members.cache.get(user.id);
              if(objmember.user.bot) return;
              if(event.t === 'MESSAGE_REACTION_ADD'){
              let cfxcdb = await db.fetch(`cfxcdb.${guild.id}`)
              if(cfxcdb == null) db.push(`cfxcdb.${guild.id}`, `${user.id}`)
              if(cfxcdb.includes(user.id)) return;
              db.push(`cfxcdb.${guild.id}`, `${user.id}`)
              }
          }
          })
      })
  }
})

////////////////////////
client.on('message', msg => {

if (!msg.content.startsWith(prefix)) {
    return;
  }

  });




client.login(process.env.TOKEN)