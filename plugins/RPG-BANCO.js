let handler = async (m, { usedPrefix, command, args }) => {
    let fkontak = {
        "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },
        "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } },
        "participant": "0@s.whatsapp.net"
    };

    let user = global.db.data.users[m.sender];

    if (command === 'depositar') {
        if (!args[0]) {
            return m.reply('*🚫 DEBES INGRESAR LA CANTIDAD A DEPOSITAR O "all" PARA DEPOSITAR TODO.*', null, { contextInfo: fkontak });
        }

        let cantidad;
        if (args[0].toLowerCase() === 'all') {
            cantidad = user.money;
        } else if (args[0].endsWith('%')) {
            let percentage = parseInt(args[0].slice(0, -1));
            if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
                return m.reply('*🚫 Porcentaje inválido. Debe estar entre 1% y 100%.*', null, { contextInfo: fkontak });
            }
            cantidad = Math.floor(user.money * (percentage / 100));
        } else {
            cantidad = parseInt(args[0]);
            if (isNaN(cantidad) || cantidad <= 0 || cantidad > user.money) {
                return m.reply('*🚫 Debes ingresar una cantidad válida para depositar.*', null, { contextInfo: fkontak });
            }
        }

        user.money -= cantidad;
        user.bank += cantidad;

        let mensaje = `💰 *Has depositado ${cantidad} ROBLECOINS en tu banco.*`;

        return m.reply(mensaje, null, { contextInfo: null });
    }

    if (command === 'retirar') {
        if (!args[0]) {
            return m.reply('*🚫 Debes ingresar la cantidad a retirar o "all" para retirar todo.*', null, { contextInfo: fkontak });
        }

        let cantidad;
        if (args[0].toLowerCase() === 'all') {
            cantidad = user.bank;
        } else if (args[0].endsWith('%')) {
            let percentage = parseInt(args[0].slice(0, -1));
            if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
                return m.reply('*🚫 Porcentaje inválido. Debe estar entre 1% y 100%.*', null, { contextInfo: fkontak });
            }
            cantidad = Math.floor(user.bank * (percentage / 100));
        } else {
            cantidad = parseInt(args[0]);
            if (isNaN(cantidad) || cantidad <= 0 || cantidad > user.bank) {
                return m.reply('*🚫 Ingresa una cantidad válida para retirar.*', null, { contextInfo: fkontak });
            }
        }

        user.money += cantidad;
        user.bank -= cantidad;

        let mensaje = `💸 *Has retirado ${cantidad} ROBLECOINS de tu banco.*`;

        return m.reply(mensaje, null, { contextInfo: null });
    }

    // Agregar más comandos o lógica aquí según sea necesario
    // ...

    return m.reply('*🚫 COMANDO DESCONOCIDO. LOS COMANDOS DISPONIBLES SON:\n- #depositar\n- #depositar all\n- #depositar (porcentaje)\n- #retirar\n- #retirar all\n- #retirar (porcentaje).\n\n*Estos comandos te permiten gestionar tu cuenta bancaria en ROBLECOINS.*', null, { contextInfo: fkontak });
}

handler.help = ['depositar (cantidad)', 'depositar all', 'depositar (porcentaje)', 'retirar (cantidad)', 'retirar all', 'retirar (porcentaje)'];
handler.tags = ['economía'];
handler.command = /^(depositar|retirar)(?:\s(all|\d+%))?\s?$/i;
export default handler;
