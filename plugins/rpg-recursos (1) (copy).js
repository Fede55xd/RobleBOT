let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let profileInfo = `*Recursos de @${m.sender.split('@')[0]}:*
💰 *RobleCoins:* ${user.money} RobleCoins
🌳 *Madera:* ${user.rpgmadera} unidades
🪨 *Piedra:* ${user.rpgpiedra} unidades
🥈 *Plata:* ${user.rpgplata} unidades
🪙 *Oro:* ${user.rpgoro} unidades
💎 *Diamantes:* ${user.rpgdiamante} unidades`;

    return await conn.reply(m.chat, profileInfo, m, { contextInfo: { mentionedJid: [m.sender] } });
}

handler.help = ['recursos'];
handler.tags = ['economy'];
handler.command = /^(recursos)$/i;
export default handler;

