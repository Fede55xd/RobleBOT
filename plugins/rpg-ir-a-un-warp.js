let Handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender] || {};


  let ubicacionElegida = text.toLowerCase();
  let ubicacionNueva = '';

  if (ubicacionElegida === 'lobby') {

      if (user.ubiactual.ubicacion && user.ubiactual.ubicacion.toLowerCase() === 'lobby') {
          return await conn.reply(m.chat, `*¡Hey!* @${m.sender.split('@')[0]}, ya estás en el *Lobby*. No necesitas cambiar tu ubicación.`, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
      }
      ubicacionNueva = 'Lobby';
  } else {
      switch (ubicacionElegida) {
          case 'minas':
              ubicacionNueva = 'Minas';
              break;
          case 'pesca':
              ubicacionNueva = 'Pesca';
              break;
          case 'llaves':
              ubicacionNueva = 'Llaves';
              break;
          default:

              let mensajeError = `*Error*, _la ubicación_ *'${ubicacionElegida}'* _no es válida. Usa_ *.Warps* _para ver la lista de warps disponibles._`;
              return await conn.reply(m.chat, mensajeError, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
      }
  }


  if (user.ubiactual.ubicacion && user.ubiactual.ubicacion.toLowerCase() === ubicacionNueva.toLowerCase()) {
      return await conn.reply(m.chat, `*¡Hey!* @${m.sender.split('@')[0]}, ya estás en *${ubicacionNueva}*. No necesitas cambiar tu ubicación.`, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
  }


  user.ubiactual.ubicacion = ubicacionNueva;


  let mensaje = `*Hola* @${m.sender.split('@')[0]}, ✨ has cambiado tu ubicación a *${ubicacionNueva}*.`;
  await conn.reply(m.chat, mensaje, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

Handler.help = ['warp <ubicacion>', 'warp minas', 'warp pesca', 'warp llaves', 'warp lobby'];
Handler.tags = ['warp'];
Handler.command = /^warp$/i;

export default Handler;
