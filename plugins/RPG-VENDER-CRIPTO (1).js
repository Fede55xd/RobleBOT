let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" };

    // Nuevo comando para vender criptomonedas
    if (command === 'vendercripto' || command === 'sellcrypto') {
        if (args[0] === 'all') {
            let cantidadCripto = global.db.data.users[m.sender].fideos;
            if (cantidadCripto <= 0) {
                return m.reply('*🚫 NO TIENES CRIPTOMONEDAS PARA VENDER*', null, { contextInfo: fkontak });
            }

            let valorVenta = Math.floor(Math.random() * (15000000 - 5000000 + 1) + 5000000); // Valor de venta entre 5,000,000 y 15,000,000 ROBLECOINS
            let dineroGanado = cantidadCripto * valorVenta;
            let inversion = cantidadCripto * 10000000; // Inversión inicial por criptomoneda: 10,000,000 ROBLECOINS

            global.db.data.users[m.sender].money += dineroGanado;
            global.db.data.users[m.sender].fideos = 0;

            let resultado = dineroGanado - inversion;
            let mensajeResultado = resultado >= 0 ? `¡GANANCIA! Has ganado ${resultado} ROBLECOINS.` : `¡PÉRDIDA! Has perdido ${-resultado} ROBLECOINS.`;

            return m.reply(`✅ Has vendido todas tus criptomonedas por un total de ${dineroGanado} ROBLECOINS.\n💰 Nuevo balance: ${global.db.data.users[m.sender].money} ROBLECOINS\n💹 Criptomonedas en posesión: 0\n💸 Inversión inicial: ${inversion} ROBLECOINS\n${mensajeResultado}`, null, { contextInfo: null });
        }

        if (!args[0] || isNaN(args[0]) || args[0] <= 0) {
            return m.reply('*🚫 INGRESA UNA CANTIDAD VÁLIDA DE CRIPTOMONEDAS PARA VENDER*', null, { contextInfo: fkontak });
        }

        let cantidadCripto = parseInt(args[0]);

        if (cantidadCripto > global.db.data.users[m.sender].fideos || global.db.data.users[m.sender].fideos <= 0) {
            return m.reply('*🚫 NO TIENES SUFICIENTES CRIPTOMONEDAS PARA VENDER*', null, { contextInfo: fkontak });
        }

        let valorVenta = Math.floor(Math.random() * (15000000 - 5000000 + 1) + 5000000); // Valor de venta entre 5,000,000 y 15,000,000 ROBLECOINS
        let dineroGanado = cantidadCripto * valorVenta;
        let inversion = cantidadCripto * 10000000; // Inversión inicial por criptomoneda: 10,000,000 ROBLECOINS

        global.db.data.users[m.sender].money += dineroGanado;
        global.db.data.users[m.sender].fideos -= cantidadCripto;

        let resultado = dineroGanado - inversion;
        let mensajeResultado = resultado >= 0 ? `¡GANANCIA! Has ganado ${resultado} ROBLECOINS.` : `¡PÉRDIDA! Has perdido ${-resultado} ROBLECOINS.`;

        return m.reply(`✅ Has vendido ${cantidadCripto} criptomonedas por un total de ${dineroGanado} ROBLECOINS.\n💰 Nuevo balance: ${global.db.data.users[m.sender].money} ROBLECOINS\n💹 Criptomonedas en posesión: ${global.db.data.users[m.sender].fideos}\n💸 Inversión inicial: ${inversion} ROBLECOINS\n${mensajeResultado}`, null, { contextInfo: null });
    }

}

handler.help = ['vendercripto (cantidad)', 'sellcrypto (cantidad)', 'vendercripto all', 'sellcrypto all'];
handler.tags = ['games'];
handler.command = /^(vendercripto|sellcrypto)$/i;
export default handler;
