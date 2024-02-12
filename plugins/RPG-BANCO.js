let handler = async (m, { usedPrefix, command, args }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" }

    if (command === 'depositar') {
        if (!args[0]) {
            return m.reply('*🚫 DEBES INGRESAR LA CANTIDAD A DEPOSITAR O "all" PARA DEPOSITAR TODO.*', null, { contextInfo: fkontak });
        }

        let cantidad;
        if (args[0].toLowerCase() === 'all') {
            cantidad = global.db.data.users[m.sender].money;
        } else {
            cantidad = parseInt(args[0]);
            if (isNaN(cantidad) || cantidad <= 0 || cantidad > global.db.data.users[m.sender].money) {
                return m.reply('*🚫 Debes ingresar una cantidad válida para depositar.*', null, { contextInfo: fkontak });
            }
        }

        global.db.data.users[m.sender].money -= cantidad;
        global.db.data.users[m.sender].bank += cantidad;

        let mensaje = `💰 *Has depositado ${cantidad} ROBLECOINS en tu banco.*`;

        return m.reply(mensaje, null, { contextInfo: null });
    }

    if (command === 'retirar') {
        if (!args[0]) {
            return m.reply('*🚫 debes ingresar la cantidad a retirar o all para retirar todo.*', null, { contextInfo: fkontak });
        }

        let cantidad;
        if (args[0].toLowerCase() === 'all') {
            cantidad = global.db.data.users[m.sender].bank;
        } else {
            cantidad = parseInt(args[0]);
            if (isNaN(cantidad) || cantidad <= 0 || cantidad > global.db.data.users[m.sender].bank) {
                return m.reply('*🚫 INGRESA UNA CANTIDAD VÁLIDA PARA RETIRAR.*', null, { contextInfo: fkontak });
            }
        }

        global.db.data.users[m.sender].money += cantidad;
        global.db.data.users[m.sender].bank -= cantidad;

        let mensaje = `💸 *Has retirado ${cantidad} ROBLECOINS de tu banco.*`;

        return m.reply(mensaje, null, { contextInfo: null });
    }

    // Agregar más comandos o lógica aquí según sea necesario
    // ...

    return m.reply('*🚫 COMANDO DESCONOCIDO. LOS COMANDOS DISPONIBLES SON:\n- #depositar\n- #depositar all\n- #retirar\n- #retirar all.\n\n*Estos comandos te permiten gestionar tu cuenta bancaria en ROBLECOINS.*', null, { contextInfo: fkontak });
}

handler.help = ['depositar (cantidad)', 'depositar all', 'retirar (cantidad)', 'retirar all'];
handler.tags = ['economía'];
handler.command = /^(depositar|retirar)(?:\s(all))?\s?$/i;
export default handler;
