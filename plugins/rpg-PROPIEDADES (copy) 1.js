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

    if (command === 'buycasa') {
        // Costo de cada casa
        const costoCasa = 10000000;

        // Determina el número de casas que el usuario quiere comprar, por defecto es 1
        let cantidadCasas = parseInt(args[0]) || 1;

        // Limita la compra máxima de casas a 1,000,000
        if (cantidadCasas > 1000000) {
            return m.reply(`🚫 *No puedes comprar más de 1,000,000 casas a la vez.*`, null, { contextInfo: fkontak });
        }

        // Calcula el costo total para comprar las casas solicitadas
        let costoTotal = cantidadCasas * costoCasa;

        // Verifica si el usuario tiene suficiente dinero
        if (global.db.data.users[m.sender].money < costoTotal) {
            let dineroFaltante = costoTotal - global.db.data.users[m.sender].money;
            return m.reply(`🚫 *Saldo insuficiente.*\nDinero faltante: ${dineroFaltante}`, null, { contextInfo: fkontak });
        }

        // Deduce el costo del balance del usuario y agrega las casas a su inventario
        global.db.data.users[m.sender].money -= costoTotal;
        if (!global.db.data.users[m.sender].casas) {
            global.db.data.users[m.sender].casas = 0;
        }
        global.db.data.users[m.sender].casas += cantidadCasas;

        // Actualiza el tiempo del último uso del comando para el usuario
        cooldowns[m.sender] = now;

        return m.reply(`✅ *Has comprado ${cantidadCasas} casa(s) por ${costoTotal} Monedas.*\n\n🏡 Casas totales: ${global.db.data.users[m.sender].casas}\n💰 Nuevo balance: ${global.db.data.users[m.sender].money}`, null, { contextInfo: null });
    }
}

handler.help = ['buycasa'];
handler.tags = ['games'];
handler.command = /^(buycasa)$/i;

export default handler;
