module.exports = {
  req: async (message, Discord, args, config, user, prefix, Bot, contador) => {

  const EliotRole = message.guild.roles.cache.find(r => r.name === "Eliot")
  const usuario = message.mentions.members.first()
  const rol = message.mentions.roles.first()
    let mas = ["add", "give", "dar", "añadir", "Add", "Give", "Dar", "Añadir"]
    let menos = ["remove", "rem", "quitar", "remuve", "remover", "Remove", "Rem", "Quitar", "Remuve", "Remover"]
    const Info = new Discord.MessageEmbed()
      .setAuthor(`Roles de 「 ${user.user.username} 」`,
        message.member.user.displayAvatarURL({dynamic : true}),
        user.user.displayAvatarURL())
      .setDescription(user.roles.cache.map(role => role.toString()).join(", "))
      .setColor(config.color.morado)

/////////// <------ Configuracion ------> \\\\\\\\\\\
    if(message.member.hasPermission("MANAGE_ROLES")){
      if(!mas.some(a => contador.includes(a)) && !menos.some(r => contador.includes(r))){
        message.channel.send(Info)
      }else
      if(!rol){
        message.reply("¡"+config.emoji.error+" No Mencionaste un Rol!")
      }else
      if(!usuario){
        message.reply("¡"+config.emoji.error+" No Mencionaste a un Usuario!")
      }else
      if(rol.rawPosition >= EliotRole.rawPosition){
        message.channel.send("¡"+config.emoji.error+" Mi Rol esta Debajo de <@&"+rol+">!").then(m => {
          setTimeout(() => {
            m.channel.send("> "+config.emoji.comando+"Utiliza: `"+prefix+"rol setPosition "+(rol.rawPosition+2)+" @Eliot`")
          }, 1300)
        })
      }else
      if(rol.managed){
        message.channel.send("¡"+config.emoji.equis+" <@&"+rol+"> lo Gestiona el Sistema!")
          setTimeout(() => {
            message.channel.send("> 😕 No puedo Darle <@&"+rol+"> a <@"+usuario+">").then(m => {
              setTimeout(() => { m.delete() }, 2500)
            })
          }, 1000)
      }else
/////////// <------   Dar Un Rol  ------> \\\\\\\\\\\
      if(mas.some(a => contador.includes(a))){
        const Give = new Discord.MessageEmbed()
          .setAuthor("Deseas Añadirle 「 "+rol.name+" 」 a 「 "+usuario.user.username+" 」",
            message.author.avatarURL({ dynamic: true}))
          .setColor(config.color.amarillo)
        const Add = new Discord.MessageEmbed()
          .setAuthor("Se Añadio el rol 「 "+rol.name+" 」", usuario.user.displayAvatarURL({ dynamic: true}))
          .setThumbnail(message.author.avatarURL({ dynamic: true}))
          .setColor(config.color.verde)
          .setDescription("> **Usuario**: <@"+usuario.user.id+">\n**Moderador**: `"+message.author.username+"`\n**Fecha**: `"+new Date().toLocaleDateString("es-pe")+"`")
        const AddC = new Discord.MessageEmbed()
          .setAuthor("¡Proceso Cancelado!", message.author.avatarURL({ dynamic: true }))
          .setColor(config.color.morado)
        message.channel.send(Give).then(m => {
          m.react(config.emoji.react.cheque[0])
          m.react(config.emoji.react.equis[0])
          m.awaitReactions((react, mod) => {
            if(mod.id == message.author.id){
              if(react.emoji.id == config.emoji.react.cheque[1]){
                usuario.roles.add(rol.id).then(r => {
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
      }else
/////////// <------ Quitar Un Rol ------> \\\\\\\\\\\
      if(menos.some(r => contador.includes(r))){
        const Remove = new Discord.MessageEmbed()
          .setAuthor("Deseas Quitarle 「 "+rol.name+" 」 a 「 "+usuario.user.username+" 」",
            message.author.avatarURL({ dynamic: true}))
          .setColor(config.color.amarillo)
        const Rem = new Discord.MessageEmbed()
          .setAuthor("Se Removio el rol 「 "+rol.name+" 」", usuario.user.displayAvatarURL({ dynamic: true}))
          .setThumbnail(message.author.avatarURL({ dynamic: true}))
          .setColor(config.color.naranja)
          .setDescription("> **Usuario**: <@"+usuario.user.id+">\n**Moderador**: `"+message.author.username+"`\n**Fecha**: `"+new Date().toLocaleDateString("es-pe")+"`")
        const RemC = new Discord.MessageEmbed()
          .setAuthor("¡Proceso Cancelado!", message.author.avatarURL({ dynamic: true }))
          .setColor(config.color.morado)
        message.channel.send(Remove).then(m => {
          m.react(config.emoji.react.cheque[0])
          m.react(config.emoji.react.equis[0])
          m.awaitReactions((react, mod) => {
            if(mod.id == message.author.id){
              if(react.emoji.id == config.emoji.react.cheque[1]){
                usuario.roles.remove(rol.id).then(r => {
                  m.delete()
                  message.channel.send(Rem)
                })
              }else
              if(react.emoji.id == config.emoji.react.equis[1]){
                m.delete()
                message.channel.send(RemC)
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
      message.channel.send(Info)
    }
  }
}