let handler = async (m, { conn }) => {
    let usedPrefix = '';
    let user = global.db.data.users[m.sender] ||{};

    
    let profileInfo = `*Tu perfil de usuario*

*―――――――――――――――――――*
👤 *Usuario:* @${m.sender.split('@')[0]}
🔥 *Rango:* ${user.uprank.rango}
💲 *Saldo disponible:* ${user.money} ROBLECOINS
🏦 *Saldo en el banco:* ${user.bank} ROBLECOINS
👥 *Amigos:* ${user.amigos |0}
*―――――――――――――――――――*`;
    
    await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['perfil', 'profile'];
handler.tags = ['perfil'];
handler.command = /^(perfil|profile)$/i;
export default handler;
