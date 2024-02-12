import { googleImage } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*❌ ERROR ❌*\n_Utiliza el siguiente formato:_ *${usedPrefix + command} piedras*`;

  const res = await googleImage(text);
  let image = res.getRandom();
  let link = image;

  conn.sendFile(m.chat, link, 'imagen_descargada.jpg', `✅ \`\`\`Imagen Descargada\`\`\`\n\n\`\`\`Detalles:\`\`\`\n- \`\`\`Búsqueda\`\`\`: ${text}\n- \`\`\`Fuente:\`\`\` Google 📷`, m);
}

handler.help = ['imagen <consulta>'];
handler.tags = ['internet', 'herramientas'];
handler.command = /^(imagen)$/i;
export default handler;
