let handler = async (m, { conn, command, args }) => {
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

    if (command === 'misorteo') {
        // Cantidad de dinero a sortear
        let cantidadSortear = parseInt(args[0]);

        if (isNaN(cantidadSortear) || cantidadSortear <= 0) {
            return m.reply(`🚫 *Por favor ingresa una cantidad válida para sortear.*`, null, { contextInfo: fkontak });
        }

        // Verifica si el usuario tiene suficiente dinero
        if (global.db.data.users[m.sender].money < cantidadSortear) {
            return m.reply(`🚫 *Saldo insuficiente para sortear ${cantidadSortear} Monedas.*`, null, { contextInfo: fkontak });
        }

        // Verifica si el comando se está ejecutando en un grupo
        if (!m.isGroup) {
            return m.reply(`🚫 *Este comando solo se puede usar en un grupo.*`, null, { contextInfo: fkontak });
        }

        // Obtiene la lista de participantes del grupo
        let groupMetadata = await conn.groupMetadata(m.chat);
        let participants = groupMetadata.participants.map(p => p.id);
        // Remueve al propio usuario del sorteo
        participants = participants.filter(id => id !== m.sender);

        if (participants.length === 0) {
            return m.reply(`🚫 *No hay otros participantes en el grupo para realizar el sorteo.*`, null, { contextInfo: fkontak });
        }

        // Elige un ganador al azar
        let ganador = participants[Math.floor(Math.random() * participants.length)];

        // Deduce la cantidad del balance del usuario que hace el sorteo
        global.db.data.users[m.sender].money -= cantidadSortear;
        // Añade la cantidad al balance del ganador
        if (!global.db.data.users[ganador]) {
            global.db.data.users[ganador] = { money: 0 }; // Asegúrate de inicializar el objeto del ganador si no existe
        }
        global.db.data.users[ganador].money += cantidadSortear;

        return m.reply(`🎉 *¡Sorteo realizado!*\n\n💸 *Has sorteado ${cantidadSortear} Monedas.*\n👤 *Ganador:* @${ganador.split('@')[0]}\n\n💰 *Nuevo balance:* ${global.db.data.users[m.sender].money}`, null, { contextInfo: { mentionedJid: [ganador] } });
    }
}

handler.help = ['misorteo <cantidad>'];
handler.tags = ['games'];
handler.command = /^(misorteo)$/i;

export default handler;

