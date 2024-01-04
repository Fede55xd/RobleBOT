// Créditos a RobleUY
let imagen1 = 'https://www.crushpixel.com/big-static19/preview4/neon-game-controllers-joysticks-game-3193939.jpg';

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (command.match(/^(jugar)$/i)) {
    let str = `★彡𝘽𝙞𝙚𝙣𝙫𝙚𝙣𝙞𝙙@ 𝙖𝙡 𝙢𝙚𝙣ú 𝙙𝙚 𝙅𝙪𝙚𝙜𝙤𝙨彡★
    
En este menú, descubrirás varios juegos.
Ejemplos: 
*Tateti, Piedra, Papel o Tijeras,*
*Trivia, juegos de porcentajes aleatorios*
y mucho más. ¡Descúbrelos tu mism@!

*Lista de Comandos Disponibles:*
  👇👇👇
${readMore}
• Lista de juegos interactivos.
*Comandos:*
→ _${usedPrefix}trivia_ ⁉️
→ _${usedPrefix}ppt_ *@tag 🪨📄✂️*
→ _${usedPrefix}ttt_ *nombre de la sala tateti ❌⭕*
→ _${usedPrefix}delttt_ ➖
→ _${usedPrefix}acertijo_ 🕵️🕵‍♀
→ _${usedPrefix}ordenar_ 🔤
――――――――――――――――――――――
${readMore}
• Lista de juegos random.
*Comandos:*
→ _${usedPrefix}siono_ *texto ✅❌*
→ _${usedPrefix}carrera_ *@tag 🏃🏁*
→ _${usedPrefix}duelo_ *@tag @tag 🤼‍♂ 🤼‍♀*
→ _${usedPrefix}doxear_ *@tag 👨‍💻👩‍💻*
――――――――――――――――――――――
${readMore}
• Juegos de porcentajes:
*Comandos:*
→ _${usedPrefix}calcular_ *texto* (%) 🧮
→ _${usedPrefix}calcular2_ *texto* (CM) 🧮
→ _${usedPrefix}calcular3_ *texto* (números) 🧮
→ _${usedPrefix}apodo_ *@tag 🙋‍♂*
→ _${usedPrefix}follar_ *@tag 👉👌*
→ _${usedPrefix}love_ *@tag 💘*
→ _${usedPrefix}lindo | linda_ *@tag 💇‍♂💇*
→ _${usedPrefix}feo | fea_ *@tag 🤮*
→ _${usedPrefix}chapar_ *@tag 😚*
→ _${usedPrefix}lemide_ *@tag 🍆*
→ _${usedPrefix}golpear_ *@tag 🥊*
→ _${usedPrefix}disparar_ *@tag 🔫*
→ _${usedPrefix}violin_ *@tag 😒❌*
→ _${usedPrefix}gay_ *@tag* (cambiará su foto de perfil con filtro 🏳‍🌈)
→ _${usedPrefix}gay2_ *@tag 🏳‍🌈*
→ _${usedPrefix}manco | manca_ *@tag 👎*
→ _${usedPrefix}pajero | pajera_ *@tag 🤪🤓*
→ _${usedPrefix}puto | puta_ *@tag 🥴*
→ _${usedPrefix}rata_ *@tag 🐁*
――――――――――――――――――――――
${readMore}
• Lista de TOPS
*Comandos:*
→ _${usedPrefix}topgays_ 🏳‍🌈
→ _${usedPrefix}topotakus_ 🔅
→ _${usedPrefix}toppajer@s_ 😵‍💫
→ _${usedPrefix}topput@s 🤭_
→ _${usedPrefix}toplind@s 😎_
→ _${usedPrefix}topfamos@s 🤩_
――――――――――――――――――――――
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
  } else if (command === 'jugar') {
    // Lógica del comando menudyb (menú para descargar música, imágenes y hacer búsquedas en Google)
    // Puedes agregar aquí la descripción del comando menudyb y su funcionalidad
    // Ejemplo: let description = 'Este comando permite descargar música, imágenes y realizar búsquedas en Google.';
    // y luego incluir ${description} en la construcción del mensaje.
  }
}

handler.command = /^(jugar)$/i;
export default handler;
//
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)