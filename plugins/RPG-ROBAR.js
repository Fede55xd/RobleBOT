let robberyCooldown = {};

let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];

    if (!args[0]) {
        return m.reply(`*❌ Debes mencionar a un usuario para robarle ROBLECOINS.*\n\nEjemplo: ${usedPrefix}robar @usuario`, null, { contextInfo: null });
    }

    let targetUser = conn.user.jid;
    try {
        targetUser = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    } catch (error) {
        return m.reply(`*❌ Menciona a un usuario válido.*\n\nEjemplo: ${usedPrefix}robar @usuario`, null, { contextInfo: null });
    }

    if (targetUser === m.sender) {
        return m.reply('*❌ No puedes robarle ROBLECOINS a ti mismo.*', null, { contextInfo: null });
    }

    if (user.friends.includes(targetUser)) {
        return m.reply(`*❌ No puedes robarle a un amigo.*`, null, { contextInfo: null });
    }

    if (robberyCooldown[m.sender] && Date.now() - robberyCooldown[m.sender] < 180000) {
        return m.reply('*❌ Debes esperar al menos 3 minutos entre robos.*', null, { contextInfo: null });
    }

    let targetUserData = global.db.data.users[targetUser];

    // Verificar si se pudo obtener la información del usuario destino
    if (!targetUserData) {
        return m.reply('*❌ Error al obtener información del usuario.*', null, { contextInfo: null });
    }

    if (targetUserData.money < 2000) {
        return m.reply('*❌ Este usuario es demasiado pobre para robarle ROBLECOINS.*', null, { contextInfo: null });
    }

    let amountToRob = Math.floor(Math.random() * (500 - 1000 + 1)) + 1000;

    user.money += amountToRob;
    targetUserData.money -= amountToRob;

    robberyCooldown[m.sender] = Date.now();

    let robMessage = `🚨 *@${m.sender.split('@')[0]} le robó ${amountToRob} ROBLECOINS a ${args[0]}* 🕵️‍♂️💰`;

    return conn.reply(m.chat, robMessage, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['robar @usuario'];
handler.tags = ['economy'];
handler.command = /^(robar)$/i;
export default handler;
