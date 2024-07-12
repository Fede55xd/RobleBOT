let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];

    if (!args[0] || !args[1]) {
        return m.reply(`*❌ Debes mencionar a un usuario y la cantidad de ROBLECOINS que deseas dar.*\n\nEjemplo: ${usedPrefix}darcoins @usuario 500 o ${usedPrefix}darcoins @usuario 10%`, null, { contextInfo: null });
    }

    let targetUser = m.mentionedJid[0];
    try {
        if (!targetUser) throw Error("No se mencionó a ningún usuario");
        targetUser = targetUser.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    } catch (error) {
        return m.reply(`*❌ Menciona a un usuario válido.*\n\nEjemplo: ${usedPrefix}darcoins @usuario 500 o ${usedPrefix}darcoins @usuario 10%`, null, { contextInfo: null });
    }

    if (targetUser === m.sender) {
        return m.reply('*❌ No puedes darte ROBLECOINS a ti mismo.*', null, { contextInfo: null });
    }

    let amountArg = args[1];
    let amount;

    if (amountArg.endsWith('%')) {
        let percentage = parseInt(amountArg.slice(0, -1));
        if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
            return m.reply(`*❌ Porcentaje inválido. Debe estar entre 1% y 100%.*`, null, { contextInfo: null });
        }
        amount = Math.floor(user.money * (percentage / 100));
    } else {
        amount = parseInt(amountArg);
    }

    if (isNaN(amount) || amount < 500 || amount > user.money) {
        return m.reply(`*❌ Ingresa una cantidad válida para dar ROBLECOINS.*\n\nRecuerda que el mínimo para dar es 500 ROBLECOINS y no puedes dar más de lo que tienes.`, null, { contextInfo: null });
    }

    user.money -= amount;
    global.db.data.users[targetUser].money += amount;

    let message = `
*🌟 ¡HAS DADO ROBLECOINS! 🌟*

*💸 Cantidad dada:*
*${amount} ROBLECOINS*
*👤 Usuario que recibió: ${args[0]}*
`;

    return m.reply(message, null, { mentions: conn.parseMention(message), contextInfo: null });
}

handler.help = ['darcoins @usuario cantidad'];
handler.tags = ['economía'];
handler.command = /^(darcoins)$/i;
export default handler;
