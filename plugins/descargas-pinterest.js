import { pinterest } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*❌ ERROR ❌*\n_Guiate del siguiente ejemplo:_\n*${usedPrefix + command} Arboles de roble*`;

  const userMoney = global.db.data.users[m.sender].money || 0;
  const cost = 0;

  if (userMoney < cost) {
    return m.reply(`
*❌ Sin suficientes ROBLECOINS*
Actualmente tienes ${userMoney} ROBLECOINS.
Necesitas: ${cost} ROBLECOINS para descargar la imagen.
`);
  }

  const json = await pinterest(text);
  const image = json.getRandom();

  // Send the image file instead of just the link
  await conn.sendFile(m.chat, image, 'downloaded_pinterest_image.jpg', `
✅ *Imagen Descargada*

*Detalles:*
- *Búsqueda*: ${text}
- *Resultado*: 📌`, m);
}

handler.help = ['pinterest <keyword>'];
handler.tags = ['internet'];
handler.command = /^(pinterest|dlpinterest|pinterestdl)$/i;
export default handler;
