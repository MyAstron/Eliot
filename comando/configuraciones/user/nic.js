module.exports = {
  req: async (message, Discord, args, config, user, prefix, Bot, contador) => {
    let apodo;
    if(user != message.member){
      apodo = args.slice(2).join(" ")
    }else{
      apodo = args.slice(1).join(" ")
    }
    let nick = user.nickname ? user.nickname : "No tiene apodo"
    const Nick = new Discord.MessageEmbed()
      .setAuthor(`Apodo de 「 ${user.user.username} 」`,
      message.member.user.displayAvatarURL({dynamic : true}),
      user.user.displayAvatarURL())
      .setDescription("``` "+nick +"```")
      .setColor(config.color.morado)

    if(message.member.hasPermission("MANAGE_NICKNAMES")){
      if(!apodo){
        message.channel.send(Nick)
      }else{
        const New = new Discord.MessageEmbed()
          .setAuthor("Deseas Cambiale el Apodo a 「 "+user.user.username+" 」",
            message.author.avatarURL({ dynamic: true}))
          .setColor(config.color.amarillo)
        const Add = new Discord.MessageEmbed()
          .setAuthor("Se Actualizo el Apodo de 「 "+user.user.username+" 」", user.user.displayAvatarURL({ dynamic: true}))
          .setThumbnail(message.author.avatarURL({ dynamic: true}))
          .setColor(config.color.verde)
          .setDescription("> **Apodo**\nAnterior `"+nick+"` - Actual: `"+apodo+"`\n**Moderador**: `"+message.author.username+"`\n**Fecha**: `"+new Date().toLocaleDateString("es-pe")+"`")
        const AddC = new Discord.MessageEmbed()
          .setAuthor("¡Proceso Cancelado!", message.author.avatarURL({ dynamic: true }))
          .setColor(config.color.morado)
        message.channel.send(New).then(m => {
          m.react(config.emoji.react.cheque[0])
          m.react(config.emoji.react.equis[0])
          m.awaitReactions((react, mod) => {
            if(mod.id == message.author.id){
              if(react.emoji.id == config.emoji.react.cheque[1]){
                user.setNickname(apodo).then(r => {
                  m.delete()
                  message.channel.send(Add)
                })
              }else
              if(react.emoji.id == config.emoji.react.equis[1]){
                m.delete()
                message.channel.send(AddC)
              }
            }else
            if(mod.id != Bot.user.id){
              message.channel.send("<@"+mod.id+">, ¡`"+message.author.username+"` es el Moderador!").then(m => {
                setTimeout(() => {
                  m.delete()
                }, 1000)
              })
              react.users.remove(mod.id)
            }
          })
        })
      }
    }else{
      message.channel.send(Nick)
    }
  }
}