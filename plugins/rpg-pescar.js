let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  if (user.ubiactual.ubicacion.toLowerCase() !== 'pesca') {
      return await conn.reply(m.chat, '*⚠️ Debes estar en el warp "Pesca" para pescar.*\nUsa *.warp Pesca* para ir.', m, { contextInfo: null });
  }
  let timeDiff = new Date() - (user.lastFish || 0);
  let waitTime = 10000;

  if (timeDiff < waitTime)
      return await conn.reply(m.chat, `⏰ Debes esperar ${Math.ceil((waitTime - timeDiff) / 1000)} segundos antes de pescar nuevamente.`, m, { contextInfo: null });

  let rarezaMensaje = '';
  let ganancia = 0;
  let probabilidad = Math.random() * 100;

  if (probabilidad < 80) {
      ganancia = 1;
      rarezaMensaje = 'Pesca normal 🎣';
      user.pescados = (user.pescados || 0) + 1;
  } else if (probabilidad < 90) {
      ganancia = Math.floor(Math.random() * (600 - 100 + 1)) + 100;
      rarezaMensaje = 'Pesca adinerada 💰';
      user.money += ganancia;
  } else if (probabilidad < 95) {
      ganancia = 0;
      user.llavecomun = (user.llavecomun || 0) + 1;
      rarezaMensaje = 'Pesca rara 🔆';
  } else if (probabilidad < 98) {
      ganancia = 0;
      user.llaverara = (user.llaverara || 0) + 1;
      rarezaMensaje = 'Pesca emocionante 🌟';
  } else {
      ganancia = 0;
      user.llaveespecial = (user.llaveespecial || 0) + 1;
      rarezaMensaje = 'Pesca especial ✨';
  }

  user.lastFish = new Date();

  let profileInfo = `*@${m.sender.split('@')[0]}* ${getPescaMessage(ganancia, rarezaMensaje, user)}`;

  return await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.entionedJid] } : {});
}

function getPescaMessage(ganancia, rarezaMensaje, user) {
  switch (rarezaMensaje) {
      case 'Pesca normal 🎣':
          return `*logró atrapar un pescado*\n*Tipo*: ${rarezaMensaje}\n*Tienes:* ${user.pescados} pescados.`;
      case 'Pesca adinerada 💰':
          return `*pescó $${ganancia}*\n*Tipo*: ${rarezaMensaje}\n*Dinero:* $${user.money || 0}`;
      case 'Pesca rara 🔆':
          return `*pescó una llave de caja común*\n*Tipo*: ${rarezaMensaje}\n*Llaves comunes:* ${user.llavecomun || 0}`;
      case 'Pesca emocionante 🌟':
          return `*pescó una llave de caja rara*\n*Tipo*: ${rarezaMensaje}\n*Llaves raras:* ${user.llaverara || 0}`;
      case 'Pesca especial ✨':
          return `*pescó una llave de caja especial*\n*Tipo*: ${rarezaMensaje}\n*Llaves especiales:* ${user.llaveespecial || 0}`;
      default:
          return '*No logró pescar nada*';
  }
}

handler.help = ['pescar'];
handler.tags = ['economy'];
handler.command = /^(pescar)$/i;
export default handler;
