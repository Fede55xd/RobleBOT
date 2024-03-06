let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" };

    let recursos = {
        "madera": 15,
        "piedra": 20,
        "plata": 25,
        "oro": 30,
        "diamante": 40
    };

    if (command === 'mvender' || command === 'sellresource') {
        if (args[0] === 'all') {
            let totalGanado = 0;
            let mensajeResultado = '';

            Object.keys(recursos).forEach(recurso => {
                let cantidadRecursos = global.db.data.users[m.sender]['rpg' + recurso];
                if (cantidadRecursos > 0) {
                    let valorVenta = recursos[recurso] * cantidadRecursos;
                    totalGanado += valorVenta;
                    global.db.data.users[m.sender]['rpg' + recurso] = 0;
                    mensajeResultado += `✅ Has vendido todas tus ${recurso} por un total de ${valorVenta} ROBLECOINS.\n`;
                }
            });

            global.db.data.users[m.sender].money += totalGanado;

            return m.reply(`${mensajeResultado}💰 Nuevo balance: ${global.db.data.users[m.sender].money} ROBLECOINS`, null, { contextInfo: null });
        }

        if (!args[0] || isNaN(args[0]) || args[0] <= 0 || !recursos[args[1]]) {
            return m.reply('*🚫 INGRESA UNA CANTIDAD VÁLIDA DE RECURSOS PARA VENDER*', null, { contextInfo: fkontak });
        }

        let recurso = args[1];
        let cantidad = parseInt(args[0]);

        if (cantidad < 10 && args[0] !== 'all') {
            return m.reply('*🚫 EL MÍNIMO PARA VENDER POR UNIDAD ES 10*', null, { contextInfo: fkontak });
        }

        if (cantidad > global.db.data.users[m.sender]['rpg' + recurso] || global.db.data.users[m.sender]['rpg' + recurso] <= 0) {
            return m.reply('*🚫 NO TIENES SUFICIENTES RECURSOS PARA VENDER*', null, { contextInfo: fkontak });
        }

        let valorVenta = recursos[recurso] * cantidad;
        global.db.data.users[m.sender].money += valorVenta;
        global.db.data.users[m.sender]['rpg' + recurso] -= cantidad;

        return m.reply(`✅ Has vendido ${cantidad} ${recurso} por un total de ${valorVenta} ROBLECOINS.\n💰 Nuevo balance: ${global.db.data.users[m.sender].money} ROBLECOINS\n💹 ${recurso} en posesión: ${global.db.data.users[m.sender]['rpg' + recurso]}`, null, { contextInfo: null });
    }

}

handler.help = ['mvender (cantidad)', 'mvender (recurso) (cantidad)', 'sellresource (cantidad)', 'sellresource (recurso) (cantidad)', 'mvender all'];
handler.tags = ['games'];
handler.command = /^(mvender|sellresource)$/i;
export default handler;
