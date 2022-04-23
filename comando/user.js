module.exports = {
  run: async(message, Discord, args, config, prefix, Bot, comando, contador) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

    let estado;
    let status;
      switch (user.presence.status) {
          case "online":
              status = config.emoji.estado.online
            break;
          case "dnd":
              status = config.emoji.estado.dnd
            break;
          case "idle":
              status = config.emoji.estado.idle
            break;
          case "offline":
              status = config.emoji.estado.offline
            break;
      }
      switch (user.presence.status) {
          case "online":
              estado = "En Linea"
            break;
          case "dnd":
              estado = "No Molestar"
            break;
          case "idle":
              estado = "Ausente"
            break;
          case "offline":
              estado = "Desconectado"
            break;
      }

    let actividad;
    if(user.presence.activities[0]){
      if(user.user.presence.game){
        actividad = estado
      }else{
        actividad = user.presence.activities[0].state
      }
    }
      
    const UserInfo = new Discord.MessageEmbed()
      .setAuthor(
        `Informacion de 「 ${user.user.username} 」`+(user.id == message.guild.ownerID ? ' • 👑' : ''),
        message.member.user.displayAvatarURL({dynamic : true}),
        user.user.displayAvatarURL())
      .setColor(config.color.morado)
      .setDescription(status+actividad)
      .addFields({
        name: "__"+config.emoji.carne+" Apodo__",
        value: "``` "+ (user.nickname ? user.nickname : "No tiene apodo") +"```", 
        inline: true 
      },{
        name: "__"+"\🏷️ Tag__",
        value: "``` "+`#${user.user.discriminator}`+"```",
        inline: true
      },{
        name: "__"+config.emoji.ID+" ID__",
        value: "``` "+user.user.id+"```",
        inline: true
      },{
        name: 'Fecha de Creacion: ',
        value: "``` "+user.user.createdAt.toLocaleDateString("es-pe")+"```",
        inline: true
      },{
        name: 'Entro a '+message.guild.name+' el: ',
        value: "``` "+user.joinedAt.toLocaleDateString("es-pe")+"```",
        inline: true
      },{
        name: 'Roles: ',
        value: user.roles.cache.map(role => role.toString()).join(", ")
      })
    
    let nic = ["nick", "nickname", "name", "nick-name"]
    let rol = ["role", "rol", "roles", "-r", "Role", "Rol", "Roles", "-R"]
    
    if (rol.some(a => contador.includes(a))){
      let file = require('./configuraciones/user/rol.js')
      file.req(message, Discord, args, config, user, prefix, Bot, contador)
    }else
    if (nic.some(a => contador.includes(a))){
      let file = require('./configuraciones/user/nic.js')
      file.req(message, Discord, args, config, user, prefix, Bot, contador)
    }else{
      message.channel.send(UserInfo)
    }
  }
}