let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let timeDiff = new Date() - user.lastWork;
    let waitTime = 60000;

    if (timeDiff < waitTime)
        return await conn.reply(m.chat, `*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE TRABAJAR NUEVAMENTE.*`, m, { contextInfo: null });

    let trabajos = ["programador", "diseñador", "escritor", "mesero", "conductor", "pintor", "jardinero", "chef", "repartidor", "cajero", "vendedor", "músico", "modelo", "actor", "profesor", "ingeniero", "arquitecto", "doctor", "enfermero", "fotógrafo", "astrónomo"];
    let trabajoActual = trabajos[Math.floor(Math.random() * trabajos.length)];
    let ganancia = Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000;

    user.money += ganancia;
    user.lastWork = new Date();
    user.workedHours += 1;
    user.totalWorkedHours += 1;
    user.totalWorkedTimes = user.totalWorkedTimes ? user.totalWorkedTimes + 1 : 1;

    let profileInfo = `*@${m.sender.split('@')[0]} trabajaste de ${trabajoActual} y ganaste ${ganancia} RobleCoins.*`;

    return await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['work', 'trabajar'];
handler.tags = ['economy'];
handler.command = /^(work|trabajar)$/i;
export default handler;
