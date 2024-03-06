let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" }
    let lastApostarTime = global.db.data.users[m.sender].wait || 0;
    let cooldown = 5000; // 5 segundos de espera

    let elapsedTime = new Date() - new Date(lastApostarTime);
    let remainingTime = cooldown - elapsedTime;

    let textos = `
*🚦 APUESTA AL SEMÁFORO 🚦*

PARA APOSTAR, USA EL COMANDO Y GANA UN 25% MÁS:
.semaforo (color)
Ejemplo: .apostar2 verde

Los colores válidos son:
----------------------------------------
_- Rojo 🔴 Precio: 100000_
*Probabilidad de ganar: 40%*
*Ganancia: +125000*
----------------------------------------
_- Amarillo 🟡 Precio: 50000_
*Probabilidad de ganar: 50%*
*Ganancia: +62500*
----------------------------------------
_- Verde 🟢 Precio: 30000_
*Probabilidad de ganar: 60%*
*Ganancia: +37500*
----------------------------------------`;

    // Verificar tiempo de espera
    if (remainingTime > 0) {
        let waitTimeSeconds = Math.ceil(remainingTime / 1000);
        return m.reply(`*🕓 ESPERA ${waitTimeSeconds} SEGUNDOS PARA JUGAR DE NUEVO*`, null, { contextInfo: fkontak });
    }

    if (global.db.data.users[m.sender].money <= 0) {
        return m.reply('*🚫 Dinero insuficiente. Revisa tu banco o usa .work*', null, { contextInfo: fkontak });
    }
    
    if (!args[0]) {
        return m.reply(`*🚫 Debes especificar un color para apostar. Para ver la lista de colores válidos y cómo apostar, usa el siguiente formato:*\n\n${textos}`, null, { contextInfo: fkontak });
    }

    let color = args[0].toLowerCase();
    let apuesta, probabilidad, gananciaPotencial;

    if (color === 'rojo') {
        apuesta = 100000;
        probabilidad = 0.4;
        gananciaPotencial = 125000;
    } else if (color === 'amarillo') {
        apuesta = 50000;
        probabilidad = 0.5;
        gananciaPotencial = 62500;
    } else if (color === 'verde') {
        apuesta = 30000;
        probabilidad = 0.6;
        gananciaPotencial = 37500;
    } else {
        return m.reply('*🚫 Color no válido. Utiliza uno de los colores válidos: rojo, amarillo o verde.*', null, { contextInfo: fkontak });
    }

    if (global.db.data.users[m.sender].money < apuesta) {
        return m.reply(`*🚫 No tienes suficiente dinero para apostar a este color. El precio de la apuesta para el color ${color.toUpperCase()} es de ${apuesta} ROBLECOINS.*`, null, { contextInfo: fkontak });
    }

    global.db.data.users[m.sender].money -= apuesta;

    let ganancia = Math.random() < probabilidad ? apuesta + gananciaPotencial : 0;
    global.db.data.users[m.sender].money += ganancia;

    let resultado = ganancia > 0 ? `¡Felicidades! Apostaste al color *${color.toUpperCase()}* y ganaste *${ganancia} ROBLECOINS*. Ahora tienes *${global.db.data.users[m.sender].money} ROBLECOINS* 🥳` : `Lo siento, apostaste al color *${color.toUpperCase()}* y perdiste tu apuesta de *${apuesta} ROBLECOINS*. Ahora tienes *${global.db.data.users[m.sender].money} ROBLECOINS* 😥`;

    // Actualizar tiempo de espera
    global.db.data.users[m.sender].wait = new Date();

    return m.reply(`🎲 ${resultado}`, null, { contextInfo: null });
}

handler.help = ['apostar2 (color)'];
handler.tags = ['games'];
handler.command = /^(apostar2)$/i;
export default handler;
