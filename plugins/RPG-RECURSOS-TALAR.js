let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let timeDiff = new Date() - user.lastChop;
    let waitTime = 60000;

    if (timeDiff < waitTime)
        return await conn.reply(m.chat, `*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE VOLVER A TALAR.*`, m, { contextInfo: null });

    let tiposArboles = ["pino", "roble", "cedro", "abeto", "haya", "nogal", "cerezo", "manzano", "almez", "olivo"];
    let tipoArbol = tiposArboles[Math.floor(Math.random() * tiposArboles.length)];
    let maderaObtenida = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    user.rpgmadera += maderaObtenida;
    user.lastChop = new Date();

    let profileInfo = `*@${m.sender.split('@')[0]} fuiste al bosque y talaste un ${tipoArbol}, obteniendo ${maderaObtenida} unidades de madera.*`;

    return await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['talar'];
handler.tags = ['economy'];
handler.command = /^(talar)$/i;
export default handler;
