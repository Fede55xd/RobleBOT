let handler = async (m, { conn }) => {
    let usedPrefix = '';
    let user = global.db.data.users[m.sender] ||{};

    
    let profileInfo = `░▒▓█►  𝐌𝐞𝐧𝐮 𝐝𝐞 𝐑𝐨𝐛𝐥𝐞𝐁𝐎𝐓 ◄█▓▒░

┌───────────────────┐
_conoce al creador usando:_
[✓] _.creador_         ⭐
└───────────────────┘
┌───────────────────┐
_visualiza tu perfil usando:_
[✓] _.perfil_          👤
└───────────────────┘
┌───────────────────┐
📋 *MENU COMPLETO*     📃
➜ _.allmenu_ 
└───────────────────┘
┌───────────────────┐
⚙️ *HERRAMIENTAS*      🛠️
➜ _.herramientas_
└───────────────────┘
┌───────────────────┐
🚀 *DESCARGAS*         🔽
➜ _.descargas_
└───────────────────┘
┌───────────────────┐
🎯 *ENTRETENIMIENTO*   🎮
➜ _.entretenimiento_
└───────────────────┘
┌───────────────────┐
🎢 *COMANDOS RPG*      ☘️
➜ _.rpg | .rpgmenu_
└───────────────────┘`;
    
    await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['menu', 'menú'];
handler.tags = ['menu'];
handler.command = /^(menu|menú|help|ayuda)$/i;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
