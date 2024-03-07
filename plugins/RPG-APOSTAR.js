let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" }
    let lastApostarTime = global.db.data.users[m.sender].wait || 0;
    let cooldown = 5000; // 5 segundos de espera

    let elapsedTime = new Date() - new Date(lastApostarTime);
    let remainingTime = cooldown - elapsedTime;

    let textos = `*💱 Te faltó agregar la cantidad a apostar.*\n_Ejemplos:_\n.apostar 100\n.apostar all (esto apuesta todo tu dinero)`;

    // Verificar tiempo de espera
    if (remainingTime > 0) {
        let waitTimeSeconds = Math.ceil(remainingTime / 1000);
        return m.reply(`*🕓 Debes esperar ${waitTimeSeconds} segundos para apostar nuevamente.*`, null, { contextInfo: fkontak });
    }

    if (global.db.data.users[m.sender].money <= 0) {
        return m.reply('*🚫 Dinero insuficiente. Revisa tu banco o usa .work*', null, { contextInfo: fkontak });
    }
    
    if (!args[0]) {
        return m.reply(textos, null, { contextInfo: fkontak });
    }

    let apuesta;
    if (args[0].toLowerCase() === 'all') {
        apuesta = global.db.data.users[m.sender].money;
    } else {
        apuesta = parseInt(args[0]);
        if (isNaN(apuesta) || apuesta <= 0 || apuesta > global.db.data.users[m.sender].money) {
            return m.reply('*🚫 Ingresa una cantidad válida para apostar.*', null, { contextInfo: fkontak });
        }
    }

    let ganancia = Math.random() < 0.6 ? apuesta : -apuesta;
    global.db.data.users[m.sender].money += ganancia;

    let resultado = ganancia > 0 ? `La moneda cayó en cara y ganaste ${ganancia} Ahora tienes: ${global.db.data.users[m.sender].money} ROBLECOINS 🥳` : `La moneda cayó en cruz y perdiste ${-ganancia} Ahora tienes: ${global.db.data.users[m.sender].money} ROBLECOINS 😥`;

    // Actualizar tiempo de espera
    global.db.data.users[m.sender].wait = new Date();

    return m.reply(`🎲 *${resultado}*`, null, { contextInfo: null });
}

handler.help = ['apostar (cantidad)', 'apostar all'];
handler.tags = ['games'];
handler.command = /^(apostar)$/i;
export default handler;
