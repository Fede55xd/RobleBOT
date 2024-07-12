let cooldowns = {};

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

    const cooldownTime = 15000; // 15 segundos
    const lastUsed = cooldowns[m.sender] || 0;
    const now = Date.now();

    if (now - lastUsed < cooldownTime) {
        let remainingTime = Math.ceil((cooldownTime - (now - lastUsed)) / 1000);
        return m.reply(`⏳ *Espera ${remainingTime} segundos antes de usar el comando nuevamente.*`, null, { contextInfo: fkontak });
    }

    if (command === 'picoup') {
        // Determina el número de niveles que el usuario quiere subir, por defecto es 1
        let nivelesASubir = parseInt(args[0]) || 1;

        // Limita el aumento máximo de niveles a 1,000,000
        if (nivelesASubir > 1000000) {
            return m.reply(`🚫 *No puedes aumentar más de 1,000,000 niveles a la vez.*`, null, { contextInfo: fkontak });
        }

        // Calcula el costo total para subir los niveles solicitados
        let nivelActual = global.db.data.users[m.sender].pico || 0;
        let costoSubida = 0;
        for (let i = 0; i < nivelesASubir; i++) {
            costoSubida += (nivelActual + i) * 10000 + 10000;
        }

        // Verifica si el usuario tiene suficiente dinero
        if (global.db.data.users[m.sender].money < costoSubida) {
            let dineroFaltante = costoSubida - global.db.data.users[m.sender].money;
            return m.reply(`🚫 *Saldo insuficiente.*\nDinero faltante: ${dineroFaltante}`, null, { contextInfo: fkontak });
        }

        // Deduce el costo del balance del usuario y aumenta el nivel del "pico"
        global.db.data.users[m.sender].money -= costoSubida;
        global.db.data.users[m.sender].pico = nivelActual + nivelesASubir;

        // Actualiza el tiempo del último uso del comando para el usuario
        cooldowns[m.sender] = now;

        return m.reply(`✅ *Has subido tu pico al nivel ${global.db.data.users[m.sender].pico} por un total de ${costoSubida} Monedas.*\n\n💰 Nuevo balance: ${global.db.data.users[m.sender].money}`, null, { contextInfo: null });
    }
}

handler.help = ['picoup'];
handler.tags = ['games'];
handler.command = /^(picoup)$/i;

export default handler;
