let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    if (!user.llavecomun && !user.llaverara && !user.llaveespecial && !user.llavecelestial) {
        return m.reply('No tienes ninguna llave. Puedes conseguir llaves pescando con el comando `.pescar`.');
    }

    return m.reply(
        `*Llaves*\n` +
        `Caja Común: ${user.llavecomun || 0}\n` +
        `Caja Rara: ${user.llaverara || 0}\n` +
        `Caja Especial: ${user.llaveespecial || 0}\n` +
        `Caja Celestial: ${user.llavecelestial || 0}`,
    );
}

handler.help = ['llaves'];
handler.tags = ['games'];
handler.command = /^(llaves)$/i;
export default handler;
