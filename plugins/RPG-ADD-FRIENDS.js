let handler = async (m, { conn, args }) => {
    if (!args[0] || !args[0].startsWith('@')) {
        return conn.reply(m.chat, '_Debes mencionar a un usuario válido para agregarlo como amigo_', m);
    }

    let mentionedJid = args[0].split('@')[1] + '@s.whatsapp.net';

    let user = global.db.data.users[m.sender];

    if (user.friends.includes(mentionedJid)) {
        return conn.reply(m.chat, '_Este usuario ya es tu amigo_', m);
    }

    user.friends.push(mentionedJid);
    user.amigos = user.friends.length; // Actualiza el contador de amigos

    let profileInfo = `*🤝 @${m.sender.split('@')[0]} agregaste como amigo a @${mentionedJid.split('@')[0]} 🤝*`;
    await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, mentionedJid] } : {});
}

handler.command = /^(addfriend)$/i;
export default handler;
