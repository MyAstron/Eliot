module.exports = {
  utiliza: async (message, Discord, args, config, prefix, Bot, comando, contador) => {
    let files;
    if(config.cmd.user.some(cmd => comando == cmd)){
      files = require('./comando/user.js')
    }
    
    try{
      files.run(message, Discord, args, config, prefix, Bot, comando, contador)
    }catch(e){
      Bot.channels.cache.get("942949642352599082").send('Console Error '+config.emoji.error+': ```'+e+'```\n> '+config.emoji.comando+' Comando: `'+comando+'`\n> '+config.emoji.codigo+' Argument\'s: `'+args.join(" ")+'`')
    message.channel.send("¿Me hablaste?").then(m => {
      setTimeout(() =>{ 
        m.channel.send(config.emoji.escudo+" No conozco el Comando: `"+comando+"`\n> Mejor Usa **`"+prefix+"help`**")
        m.delete()
      }, 1500);
    })
    }
  }
}