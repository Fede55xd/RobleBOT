let hackingCooldown = {};

let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];

    if (!args[0]) {
        return m.reply(`*❌ Debes mencionar a un usuario para el hackeo de criptomonedas.*\n\nEjemplo: ${usedPrefix}hackearcriptos @usuario`, null, { contextInfo: null });
    }

    let targetUser = conn.user.jid;
    try {
        targetUser = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    } catch (error) {
        return m.reply(`*❌ Menciona a un usuario válido.*\n\nEjemplo: ${usedPrefix}hackearcriptos @usuario`, null, { contextInfo: null });
    }

    if (targetUser === m.sender) {
        return m.reply('*❌ No puedes realizar el hackeo de criptomonedas a ti mismo.*', null, { contextInfo: null });
    }

    if (hackingCooldown[m.sender] && Date.now() - hackingCooldown[m.sender] < 7200000) {
        let timeLeft = (7200000 - (Date.now() - hackingCooldown[m.sender])) / 1000; // tiempo restante en segundos
        let minutesLeft = Math.floor(timeLeft / 60);
        let secondsLeft = Math.floor(timeLeft % 60);

        return m.reply(`*❌ Debes esperar ${minutesLeft} minutos y ${secondsLeft} segundos antes de poder hackear de nuevo.*`, null, { contextInfo: null });
    }

    let targetUserData = global.db.data.users[targetUser];

    if (Math.random() > 0.25) {
        let amountToHack = Math.min(targetUserData.fideos, 1); // Máximo se puede robar 1 unidad
        user.fideos += amountToHack;
        targetUserData.fideos -= amountToHack;

        hackingCooldown[m.sender] = Date.now();

        let message = `
*🚨 ¡HACKEO DE CRIPTOMONEDAS! 🚨*

*💸 Cantidad hackeada:* ${amountToHack} CRIPTOMONEDAS
*👤 Usuario hackeado:* ${args[0]}
`;

        return m.reply(message, null, { mentions: conn.parseMention(message), contextInfo: null });
    } else {
        return m.reply('*❌ Fallaste en tu intento de hackeo. La seguridad del usuario es fuerte.*', null, { contextInfo: null });
    }
}

handler.help = ['hackearcriptos @usuario'];
handler.tags = ['economy'];
handler.command = /^(hackearcriptos)$/i;
export default handler;
