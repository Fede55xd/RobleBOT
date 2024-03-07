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

    // Nuevo comando para subir de nivel el pico
    if (command === 'picoup') {
        let costoSubida = (global.db.data.users[m.sender].pico || 0) * 10000 + 10000; // Costo por nivel: 10,000 ROBLECOINS por nivel, iniciando en 10,000

        if (global.db.data.users[m.sender].money < costoSubida) {
            let nivelActual = global.db.data.users[m.sender].pico || 0;
            let dineroFaltante = costoSubida - global.db.data.users[m.sender].money;

            return m.reply(`🚫 *Saldo insuficiente.*\nDinero faltante: ${dineroFaltante`, null, { contextInfo: fkontak });
        }

        global.db.data.users[m.sender].money -= costoSubida;
        global.db.data.users[m.sender].pico = (global.db.data.users[m.sender].pico || 0) + 1;

        return m.reply(`✅ *Has subido tu pico al nivel ${global.db.data.users[m.sender].pico} por un total de ${costoSubida} Monedas.*\n\n💰 Nuevo balance: ${global.db.data.users[m.sender].money}`, null, { contextInfo: null });
    }

    

}



handler.help = ['picoup'];
handler.tags = ['games'];
handler.command = /^(picoup)$/i;
export default handler;
