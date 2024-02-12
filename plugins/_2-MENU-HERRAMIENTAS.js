let handler = async (m, { conn }) => {
    
    let user = global.db.data.users[m.sender] ||{};

    
    let herramientas = `𝐑𝐨𝐛𝐥𝐞𝐁𝐎𝐓 *HERRAMIENTAS*
*Hola @${m.sender.split('@')[0]},*
_Aquí tienes la lista de comandos._
┌───────────────────┐
⚙️ *👇 HERRAMIENTAS 👇*    
└───────────────────┘
┌───────────────────┐
🎴 *CREAR STICKERS*     🍭
➜ _.s | .sticker
➜ _.attp_ [ *texto* ]
➜ _.emojimix_ [ *emoji+emoji* ]
└───────────────────┘
┌───────────────────┐
🔊 *DE TEXTO A VOZ*     🗣️
➜ _.tav_ [ *texto* ]
└───────────────────┘
┌───────────────────┐
🆎 *MODIFICAR TEXTOS*   🔠
➜ _.fuentes_ [ *texto* ]
└───────────────────┘
┌───────────────────┐
❇️ *CREAR LOGOS*        🪄
➜ _.logo_
└───────────────────┘
┌───────────────────┐
✌️ *MEJORAR CALIDAD*    🔆
➜ _.hd_
└───────────────────┘
┌───────────────────┐
📷 *DE STICKER A IMÁGEN*  🖼️
➜ _.img_
└───────────────────┘
┌───────────────────┐
💬 *TRADUCTOR*          ✈️
➜ _.traducir_ [ *idioma  - texto* ]
└───────────────────┘
┌───────────────────┐
🤸 *MODO AFK (INACTIV@)* 🛌
➜ _.afk_ [ *motivo* ]
└───────────────────┘
┌───────────────────┐
🤳 *IAS (ChataGPT)*     🤖
➜ _.ia_ [ *texto* ] (ChataGPT) 🔴
➜ _.bard_ [ *texto* ] (Ia Bard)  🟢
└───────────────────┘`;
    
    await conn.reply(m.chat, herramientas, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['herramienta', 'herramientas'];
handler.tags = ['herramientas'];
handler.command = /^(herramientas)$/i;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
