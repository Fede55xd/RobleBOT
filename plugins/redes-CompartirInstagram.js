//creditos a RobleUY
let imagen1 = 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2020/08/como-ocultar-mensajes-dms-de-instagram-conversaciones-andoid-ios-cover-e1600965280592.jpg';

let handler = async (m, { conn, text, command }) => {
  if (command === 'iguser') {
    let instagramUrl = `https://www.instagram.com/${text}`;
    let str = `☝️ *𝙏𝙊𝘾𝘼 𝙇𝘼 𝙁𝙊𝙏𝙊* ☝️

📌 *@${m.sender.split("@")[0]}*
*Compartió un perfil de Instagram. 📸*

✨ *𝘜𝘴𝘶𝘢𝘳𝘪𝘰:* ${text}

👇𝘛𝘢𝘮𝘣𝘪𝘦́𝘯 𝘵𝘪𝘦𝘯𝘦𝘴 𝘦𝘭 𝘭𝘪𝘯𝘬 𝘢𝘣𝘢𝘫𝘰📌

${instagramUrl} 

☝️☝️☝️☝️☝️
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
          "title": `RobleBOT\n🙂• 𝙏𝙊𝘾𝘼 𝘼𝙌𝙐𝙄́ •🙂`,
          "containsAutoReply": true,
          "mediaType": 1,
          "mediaUrl": imagen1,
          "sourceUrl": `${instagramUrl}`,
        }
      }
    });
  }
}

handler.command = /^iguser/i;
export default handler;