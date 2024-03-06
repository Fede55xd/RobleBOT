let handler = async (m, { conn, args }) => {
    if (!args[0] || !args[0].startsWith('@')) {
        return conn.reply(m.chat, '_Debes mencionar a un usuario válido para eliminarlo de tu lista de amigos_', m);
    }

    let mentionedJid = args[0].split('@')[1] + '@s.whatsapp.net';

    let user = global.db.data.users[m.sender];

    if (!user.friends.includes(mentionedJid)) {
        return conn.reply(m.chat, '_Este usuario no está en tu lista de amigos_', m);
    }

    user.friends = user.friends.filter(friend => friend !== mentionedJid);
    user.amigos = user.friends.length; // Actualiza el contador de amigos

    let profileInfo = `*🚷 @${m.sender.split('@')[0]} ha eliminado a @${mentionedJid.split('@')[0]} de su lista de amigos 🚷*`;
    await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, mentionedJid] } : {});
}

handler.command = /^(delfriend)$/i;
export default handler;
