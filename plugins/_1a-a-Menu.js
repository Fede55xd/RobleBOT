// Créditos a RobleUY
let imagen1 = 'https://i.pinimg.com/736x/74/83/c6/7483c63070d24d6d1272f4790da5689b.jpg';

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (command.match(/^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|menucompleto|allmenu|allm|m)$/i)) {
    let str = `*Menú de RobleBOT (Actualizando)*
    
👤 *Creador:* RobleUY
📷 *Instagram:* robleuy
*Link:* https://bit.ly/ig-robleuy
📱 *Número:* wa.me/+59893900470


*Lista de Comandos Disponibles:*
  👇👇👇
${readMore}
*――――――――――――――――――――――*
• _Descargar música, imágenes y hacer búsquedas en Google._
*Comandos:*
→ _${usedPrefix}play_ *título o link* 🎶
→ _${usedPrefix}imagen_ *texto* 🖼️
→ _${usedPrefix}pinterest_ *texto* 🌠
→ _${usedPrefix}google_ *texto* 🔍
→ _${usedPrefix}letra_ *título* 🗒️
*――――――――――――――――――――――*
• _Jugar juegos como preguntas y respuestas, tateti, etc._
*Comando:* → _${usedPrefix}jugar_ 🏓
*――――――――――――――――――――――*
• _Creación de Stickers con imágenes, GIFs, videos o url de tipo jpg._
⚠️ *AVISO:*
❌ _Stickers temporalmente desactivados._
*Comandos:*
→ _${usedPrefix}s_ 🧩
→ _${usedPrefix}s_ *URL de tipo .jpg 🛟*
→ _${usedPrefix}emojimix_ 🎈
→ _${usedPrefix}attp_ *texto 🪩*
→ _${usedPrefix}ttp_ *texto 📑*
――――――――――――――――――――――
⚙️ _Herramientas_ 🛠️
⚠️ *AVISO:*
❌ _ia posiblemente no funcione correctamente._ *Está en reparación*
*Comandos:* 👇
→ _${usedPrefix}ia_ *texto* 🤖 (ChatGPT)
*――――――――――――――――――――――*
`;

    let response = await fetch(imagen1);
    let buffer = await response.arrayBuffer();
    let thumbnailBase64 = Buffer.from(buffer).toString('base64');

    await conn.sendMessage(m.chat, {
      text: str,
      contextInfo: {
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: [m.sender],
        "externalAdReply": {
          "showAdAttribution": true,
          "renderLargerThumbnail": true,
          "thumbnail": thumbnailBase64,
          "title": `RobleBOT`,
          "containsAutoReply": true,
          "mediaType": 1,
          "mediaUrl": imagen1,
          "sourceUrl": 'https://www.instagram.com/robleuy', // Reemplazar con tu Instagram
        }
      }
    });
  } else if (command === 'menudyb') {
    // Lógica del comando menudyb (menú para descargar música, imágenes y hacer búsquedas en Google)
    // Puedes agregar aquí la descripción del comando menudyb y su funcionalidad
    // Ejemplo: let description = 'Este comando permite descargar música, imágenes y realizar búsquedas en Google.';
    // y luego incluir ${description} en la construcción del mensaje.
  }
}

handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|menucompleto|allmenu|allm|m)$/i;
export default handler;
//
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)