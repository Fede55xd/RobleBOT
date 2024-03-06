let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" };

    // Nuevo comando para comprar criptomonedas
    if (command === 'comprarcripto' || command === 'buycrypto') {
        if (!args[0] || isNaN(args[0]) || args[0] <= 0) {
            return m.reply('*🚫 INGRESA UNA CANTIDAD VÁLIDA DE CRIPTOMONEDAS PARA COMPRAR*', null, { contextInfo: fkontak });
        }

        let cantidadCripto = parseInt(args[0]);
        let costoTotal = cantidadCripto * 10000000; // Valor por criptomoneda: 10,000,000 ROBLECOINS

        if (global.db.data.users[m.sender].money < costoTotal) {
            let valorCripto = 10000000; // Valor de cada criptomoneda: 10,000,000 ROBLECOINS
            let dineroFaltante = costoTotal - global.db.data.users[m.sender].money;

            return m.reply(`🚫 *NO TIENES SUFICIENTES ROBLECOINS PARA COMPRAR ESAS CRIPTOMONEDAS*\n\nValor de una criptomoneda: ${valorCripto} ROBLECOINS\nDinero faltante: ${dineroFaltante} ROBLECOINS`, null, { contextInfo: fkontak });
        }

        global.db.data.users[m.sender].money -= costoTotal;
        global.db.data.users[m.sender].fideos += cantidadCripto;

        return m.reply(`✅ *Has comprado ${cantidadCripto} criptomonedas por un total de ${costoTotal} ROBLECOINS.*\n\n💰 Nuevo balance: ${global.db.data.users[m.sender].money} ROBLECOINS\n💹 Criptomonedas en posesión: ${global.db.data.users[m.sender].fideos}`, null, { contextInfo: null });
    }

    // Nuevo comando para comprar la mayor cantidad posible de criptomonedas
    if (command === 'comprarcripto all' || command === 'buycrypto all') {
        let dineroDisponible = global.db.data.users[m.sender].money;
        let valorCripto = 10000000; // Valor de cada criptomoneda: 10,000,000 ROBLECOINS
        let cantidadMaxima = Math.floor(dineroDisponible / valorCripto);

        if (cantidadMaxima <= 0) {
            return m.reply('*🚫 NO TIENES SUFICIENTES ROBLECOINS PARA COMPRAR CRIPTOMONEDAS*', null, { contextInfo: fkontak });
        }

        let costoTotal = cantidadMaxima * valorCripto;
        global.db.data.users[m.sender].money -= costoTotal;
        global.db.data.users[m.sender].fideos += cantidadMaxima;

        return m.reply(`✅ *Has comprado la mayor cantidad posible de criptomonedas por un total de ${costoTotal} ROBLECOINS.*\n\n💰 Nuevo balance: ${global.db.data.users[m.sender].money} ROBLECOINS\n💹 Criptomonedas en posesión: ${global.db.data.users[m.sender].fideos}`, null, { contextInfo: null });
    }
}

handler.help = ['comprarcripto (cantidad)', 'buycrypto (cantidad)', 'comprarcripto all', 'buycrypto all'];
handler.tags = ['games'];
handler.command = /^(comprarcripto|buycrypto|comprarcripto all|buycrypto all)$/i;
export default handler;
