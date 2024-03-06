let hackearCoinsCooldown = {};

let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];

    if (!args[0]) {
        return m.reply(`*❌ Debes mencionar a un usuario para el hackeo de monedas.*\n\nEjemplo: ${usedPrefix}hackearcoins @usuario`, null, { contextInfo: null });
    }

    let targetUser = conn.user.jid;
    try {
        targetUser = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    } catch (error) {
        return m.reply(`*❌ Menciona a un usuario válido.*\n\nEjemplo: ${usedPrefix}hackearcoins @usuario`, null, { contextInfo: null });
    }

    if (targetUser === m.sender) {
        return m.reply('*❌ No puedes realizar el hackeo de monedas a ti mismo.*', null, { contextInfo: null });
    }

    if (hackearCoinsCooldown[m.sender] && Date.now() - hackearCoinsCooldown[m.sender] < 300000) {
        let timeLeft = (300000 - (Date.now() - hackearCoinsCooldown[m.sender])) / 1000; // tiempo restante en segundos
        let minutesLeft = Math.floor(timeLeft / 60);
        let secondsLeft = Math.floor(timeLeft % 60);

        return m.reply(`*❌ Debes esperar ${minutesLeft} minutos y ${secondsLeft} segundos antes de poder hackear monedas de nuevo.*`, null, { contextInfo: null });
    }

    let targetUserData = global.db.data.users[targetUser];

    if (Math.random() > 0.25) {
        let amountToHack = Math.floor(Math.random() * (500 - 100 + 1)) + 100; // entre 1000 y 5000 coins
        user.money += amountToHack;
        targetUserData.money -= amountToHack;

        hackearCoinsCooldown[m.sender] = Date.now();

        let message = `
*🚨 ¡HACKEO DE MONEDAS! 🚨*

*💸 Cantidad hackeada:* ${amountToHack} MONEDAS
*👤 Usuario hackeado:* ${args[0]}
`;

        return m.reply(message, null, { mentions: conn.parseMention(message), contextInfo: null });
    } else {
        return m.reply('*❌ Fallaste en tu intento de hackeo. La seguridad del usuario es fuerte.*', null, { contextInfo: null });
    }
}

handler.help = ['hackearcoins @usuario'];
handler.tags = ['economy'];
handler.command = /^(hackearcoins)$/i;

export default handler;
