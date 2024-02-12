let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user.friends || user.friends.length === 0) {
        return conn.reply(m.chat, '_No tienes amigos en tu lista_', m);
    }

    let friendList = user.friends.map(friend => `*@${friend.split('@')[0]}*`).join(', ');
    let profileInfo = `Hola *@${m.sender.split('@')[0]}*, aquí está tu lista de amigos:\nLista de amigos: ${friendList}`;
    
    await conn.reply(m.chat, profileInfo, m, { mentions: [m.sender] });
}

handler.command = /^(amigos|friends)$/i;
export default handler;
