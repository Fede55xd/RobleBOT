let cooldowns = {};
let fiestas = {};
let fiestaCooldowns = {}; // Para controlar la creación de fiestas por usuario

let handlerFiesta = async (m, { conn, command }) => {
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    const fiestaCooldownTime = 3600000; // 1 hora en milisegundos
    const lastFiesta = fiestaCooldowns[m.sender] || 0;
    const now = Date.now();

    if (!global.db.data.users[m.sender].casas || global.db.data.users[m.sender].casas < 1) {
        return m.reply(`🚫 *Necesitas al menos una casa para organizar una fiesta.*`, null, { contextInfo: fkontak });
    }

    if (fiestas[m.sender]) {
        return m.reply(`🚫 *Ya tienes una fiesta en curso.*`, null, { contextInfo: fkontak });
    }

    if (now - lastFiesta < fiestaCooldownTime) {
        let remainingTime = Math.ceil((fiestaCooldownTime - (now - lastFiesta)) / 60000);
        return m.reply(`⏳ *Espera ${remainingTime} minutos antes de organizar otra fiesta.*`, null, { contextInfo: fkontak });
    }

    fiestaCooldowns[m.sender] = now;
    fiestas[m.sender] = {
        anfitrion: m.sender,
        participantes: [],
        maxParticipantes: 5
    };

    return conn.sendMessage(m.chat, {
        text: `🎉 *${m.sender.split('@')[0]} ha organizado una fiesta!*\nUsa el comando .entrarfiesta @${m.sender.split('@')[0]} para unirte y ganar entre 50,000 y 100,000 monedas!`,
        mentions: [m.sender]
    });
}

let handlerEntrarFiesta = async (m, { conn, command, args }) => {
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    if (args.length === 0) {
        return m.reply(`🚫 *Debes mencionar al usuario que organizó la fiesta.*`, null, { contextInfo: fkontak });
    }

    let anfitrion = args[0].replace('@', '') + '@s.whatsapp.net';
    if (!fiestas[anfitrion]) {
        return m.reply(`🚫 *No se encontró una fiesta organizada por ese usuario.*`, null, { contextInfo: fkontak });
    }

    let fiesta = fiestas[anfitrion];
    if (fiesta.participantes.includes(m.sender)) {
        return m.reply(`🚫 *Ya estás participando en esta fiesta.*`, null, { contextInfo: fkontak });
    }

    if (fiesta.participantes.length >= fiesta.maxParticipantes) {
        return m.reply(`🚫 *La fiesta ya ha alcanzado el número máximo de participantes.*`, null, { contextInfo: fkontak });
    }

    fiesta.participantes.push(m.sender);
    let recompensa = Math.floor(Math.random() * 50001) + 50000;
    global.db.data.users[m.sender].money += recompensa;

    if (fiesta.participantes.length >= fiesta.maxParticipantes) {
        delete fiestas[anfitrion];
        return conn.sendMessage(m.chat, {
            text: `🎉 *La fiesta organizada por ${anfitrion.split('@')[0]} ha terminado!*\nGracias a todos los que participaron!`,
            mentions: [anfitrion]
        });
    }

    return m.reply(`✅ *Te has unido a la fiesta organizada por ${anfitrion.split('@')[0]} y has ganado ${recompensa} monedas!*`, null, { contextInfo: null });
}

handlerFiesta.help = ['fiesta'];
handlerFiesta.tags = ['games'];
handlerFiesta.command = /^(fiesta)$/i;

handlerEntrarFiesta.help = ['entrarfiesta'];
handlerEntrarFiesta.tags = ['games'];
handlerEntrarFiesta.command = /^(entrarfiesta)$/i;

export { handlerFiesta, handlerEntrarFiesta };
