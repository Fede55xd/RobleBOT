let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender] || {};
    let apodo = args.join(' ');

    if (!apodo) {
        return conn.reply(m.chat, `Por favor, proporciona un apodo.`, m);
    }

    if (apodo.length > 10) {
        return conn.reply(m.chat, `El apodo no puede tener más de 10 caracteres.`, m);
    }

    user.apodos = user.apodos || {};
    user.apodos.apodo = apodo;

    await conn.reply(m.chat, `Tu apodo ha sido establecido a: ${apodo}`, m);
}

handler.help = ['apodo'];
handler.tags = ['perfil'];
handler.command = /^(apodo)$/i;

export default handler;
