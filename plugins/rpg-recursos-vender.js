let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];

  // Verificar y asignar propiedades a 0 si no existen
  user.rpgpiedra = user.rpgpiedra || 0;
  user.rpgplata = user.rpgplata || 0;
  user.rpgoro = user.rpgoro || 0;
  user.rpgdiamante = user.rpgdiamante || 0;

  let precioPiedra = 5;
  let precioPlata = 8;
  let precioOro = 12;
  let precioDiamante = 15;

  let totalPiedra = user.rpgpiedra;
  let totalPlata = user.rpgplata;
  let totalOro = user.rpgoro;
  let totalDiamante = user.rpgdiamante;

  let totalMinerales = totalPiedra + totalPlata + totalOro + totalDiamante;

  // Verificar si hay minerales para vender
  if (totalMinerales === 0) {
      return await conn.reply(m.chat, `*@${m.sender.split('@')[0]} no tienes minerales para vender* ❌`, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
  }

  let totalMonedas = totalPiedra * precioPiedra + totalPlata * precioPlata + totalOro * precioOro + totalDiamante * precioDiamante;

  user.money += totalMonedas;

  // Reiniciar las propiedades de los minerales a 0
  user.rpgpiedra = 0;
  user.rpgplata = 0;
  user.rpgoro = 0;
  user.rpgdiamante = 0;

  return await conn.reply(m.chat, `*@${m.sender.split('@')[0]} vendiste un total de ${totalMinerales} minerales y obtuviste ${totalMonedas} monedas* 🪙`, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['mvender'];
handler.tags = ['economy'];
handler.command = /^(mvender)$/i;
export default handler;
