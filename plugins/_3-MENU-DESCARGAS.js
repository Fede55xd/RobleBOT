let handler = async (m, { conn }) => {
    
    let user = global.db.data.users[m.sender] ||{};

    
    let herramientas = `𝐑𝐨𝐛𝐥𝐞𝐁𝐎𝐓 *DESCARGAS*
*Hola @${m.sender.split('@')[0]},*
_Aquí tienes la lista de comandos._
┌───────────────────┐
🚀 *👇 DESCARGAS 👇*    
└───────────────────┘
┌───────────────────┐
🏜️ *DESCARGAR IMAGENES*    🏜️
➜ _.imagen_ [ *texto* ]
➜ _.pinterest_ [ *texto* ]
└───────────────────┘
┌───────────────────┐
🎥 *DESCARGAR VIDEOS*        🎥 
➜ _.video_ [ *texto o link* ]
➜ _.videofast_ [ *texto o link* ]
└───────────────────┘
┌───────────────────┐
💽 *DESCARGAR AUDIOS*        🎧
➜ _.play_ [ *titulo o link* ]
➜ _.audio_ [ *titulo o link* ]
└───────────────────┘
┌───────────────────┐
🤳 *DESCARGAR APPS*           📱
➜ _.apk_ [ *nombre* ]
└───────────────────┘`;
    
    await conn.reply(m.chat, herramientas, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['descargas', 'descargar'];
handler.tags = ['herramientas'];
handler.command = /^(descargas)$/i;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
