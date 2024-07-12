let handler = async (m, { conn }) => {
  try {
    let user = global.db.data.users[m.sender] || {};

    // Inicialización de los campos de la alianza si no existen
    if (!('alianzas' in user)) {
      user.alianzas = {
        nombre: 'Sin Alianza', // nombre de alianza predeterminado si no existe en la base de datos
        miembros: [], // lista de miembros de la alianza
        recursos: { // recursos de la alianza
          dinero: 0
        }
      };
    }

    let profileInfo = `*Datos Personales*

*―――――――――――――――――――*
👤 *Usuario:* @${m.sender.split('@')[0]}
😅 *Apodo:* ${user.apodos?.apodo || 'Sin Apodo'}
👥 *Amigos:* ${user.amigos || 0}
🏥 *Salud:* ${user.salud || 0}/100
🛡 *Alianza/Clan:* ${user.alianzas?.nombre || 'Sin Alianza'}
🛡 *Miembros:* ${user.alianzas?.miembros?.length || 0}
🛡 *Dinero:* ${user.alianzas?.recursos?.dinero || 0}

*Progreso Personal*
🔥 *Rango:* ${user.uprank?.rango || 'Sin Rango'}
💲 *Saldo disponible:* $${user.money || 0}
🏦 *Saldo en el banco:* $${user.bank || 0}

*Datos de batalla*
🔪 *Kills:* ${user.kills || 0}
⚰ *Muertes:* ${user.muertes || 0}
💪 *Nivel de Fuerza:* ${user.fuerza || 0}

*Propiedades*
🏠 *Casas:* ${user.casas || 'Ninguna'}

*Herramientas*
⛏ *Pico Level:* ${user.picolevel || 0}
*―――――――――――――――――――*`;

    await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
  } catch (error) {
    console.error('Error en el handler de perfil:', error);
    await conn.reply(m.chat, 'Hubo un error al obtener tu perfil. Por favor, inténtalo de nuevo más tarde.', m);
  }
};

handler.help = ['perfil', 'profile'];
handler.tags = ['perfil'];
handler.command = /^(perfil|profile)$/i;

export default handler;
