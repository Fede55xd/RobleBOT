let handler = async (m, { conn }) => {
    let usedPrefix = '';
    let user = global.db.data.users[m.sender] ||{};

    
    let profileInfo = `*Info del Creador*
*―――――――――――――――――――*
⭐  *Creador del bot:* RobleUY
📱  *Número:* wa.me/+59893900470
🏷️  *Nombre del creador:* Sebastian
🤗  *Edad del creador:* 20 años
🌍 *País:* Uruguay 🇺🇾
📷 *Instagram del creador:* @robleuy
🎵 *TikTok del creador:* @robleuy

*🤖 ¿Quieres un bot para tu grupo?*
_Escribe al número del creador._
*―――――――――――――――――――*`;
    
    await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['creador', 'creator'];
handler.tags = ['creador'];
handler.command = /^(creador)$/i;
export default handler;
