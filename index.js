const Discord = require('discord.js');
const Bot  = new Discord.Client();
  const config  = require('./config.js')
  const prefix  = process.env['prefix']

Bot.on('ready', () => {
  Bot.user.setPresence({
    status: "dnd",
    activity: {
      name: " "+prefix+"help | Pruebas",
      type: "STREAMING",
      url: "https://www.twitch.tv/linkfy"
    }
  })
  console.log(`¡Pruebas de ${Bot.user.tag}!`)
  // Bot.channels.cache.get("820837739159224320").send(`¡Pruebas de ${Bot.user.tag}!`)
});

Bot.on('message', async (message) => {
  const args    = message.content.slice(prefix.length).trim().split(/ +/g)
  const comando = args.shift().toLowerCase()  
  const contador = message.content.toLowerCase()

  if(message.channel.id == '942949642352599082' && !message.author.bot){
    message.channel.send("¡"+config.emoji.comando+" No puedes Enviar mensajes Aqui!").then(m =>{
      setTimeout(() =>{ m.delete()}, 2000)
    })
    message.delete()
  }else
  if(message.author.bot && message.content.startsWith(prefix)){
    message.channel.send("¡"+config.emoji.equis+" No Trabjao con Bot's!").then(m => {
      setTimeout(() =>{ m.delete()}, 3000)
    })
  }else
  if(message.content.startsWith(prefix) && !comando){
    message.channel.send("¡"+config.emoji.comando+" No Pusiste un Comando!").then(m => { setTimeout(() => { m.delete() }, 3000); })
  }else
  if(message.content.startsWith(prefix)){
    
    try{
      const solicitud = require('./comandos.js')
    solicitud.utiliza(message, Discord, args, config, prefix, Bot, comando, contador)
    }catch(e){
      // Bot.channels.cache.get("942949642352599082").send('Console Error '+config.emoji.error+': ```'+e+'```\n> '+config.emoji.comando+' Comando: `'+comando+'`\n> '+config.emoji.codigo+' Argument\'s: `'+args.join(" ")+'`')
    message.channel.send("¿Me hablaste?")/*.then(m => {
      setTimeout(() =>{ 
        m.channel.send(config.emoji.escudo+" No conozco el Comando: `"+comando+"`\n> Mejor Usa **`"+prefix+"help`**")
        m.delete()
      }, 2000);
    })*/
    }
  }
});

Bot.login(process.env['token']);