let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    if (user.pescados <= 0) {
        return m.reply('No tienes pescados para vender. Puedes conseguir pescados pescando con el comando `.pescar`.');
    }

    let totalGanado = user.pescados * 200; // Cada pescado vale 200 monedas
    user.money += totalGanado;
    user.pescados = 0; // Se borran todos los pescados

    return m.reply(`*Vendiste todos tus pescados por un total de ${totalGanado} Monedas.*\n💰 Nuevo balance: ${user.money}`);
}

handler.help = ['venderpescado'];
handler.tags = ['economy'];
handler.command = /^(venderpescado)$/i;
export default handler;
