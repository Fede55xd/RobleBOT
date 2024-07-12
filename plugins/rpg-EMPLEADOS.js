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

    if (command === 'buyempleados') {
        // Costo de cada empleado
        const costoEmpleado = 1000000;

        // Determina el número de empleados que el usuario quiere comprar, por defecto es 1
        let cantidadEmpleados = parseInt(args[0]) || 1;

        // Limita la compra máxima de empleados a 1,000,000
        if (cantidadEmpleados > 1000000) {
            return m.reply(`🚫 *No puedes comprar más de 1,000,000 empleados a la vez.*`, null, { contextInfo: fkontak });
        }

        // Calcula el costo total para comprar los empleados solicitados
        let costoTotal = cantidadEmpleados * costoEmpleado;

        // Verifica si el usuario tiene suficiente dinero
        if (global.db.data.users[m.sender].money < costoTotal) {
            let dineroFaltante = costoTotal - global.db.data.users[m.sender].money;
            return m.reply(`🚫 *Saldo insuficiente.*\nDinero faltante: ${dineroFaltante}`, null, { contextInfo: fkontak });
        }

        // Deduce el costo del balance del usuario y agrega los empleados a su inventario
        global.db.data.users[m.sender].money -= costoTotal;
        if (!global.db.data.users[m.sender].empleados) {
            global.db.data.users[m.sender].empleados = 0;
        }
        global.db.data.users[m.sender].empleados += cantidadEmpleados;

        // Actualiza el tiempo del último uso del comando para el usuario
        cooldowns[m.sender] = now;

        return m.reply(`✅ *Has comprado ${cantidadEmpleados} empleado(s) 👷‍♂️ por ${costoTotal} Monedas.*\n\n👷‍♂️ Empleados totales: ${global.db.data.users[m.sender].empleados}\n💰 Nuevo balance: ${global.db.data.users[m.sender].money}`, null, { contextInfo: null });
    }
}

handler.help = ['buyempleados'];
handler.tags = ['games'];
handler.command = /^(buyempleados)$/i;

export default handler;
