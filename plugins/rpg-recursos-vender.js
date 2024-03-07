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

    let recursos = {
        "madera": 30,
        "piedra": 40,
        "plata": 50,
        "oro": 60,
        "diamante": 80
    };

    if (command === 'mvender' || command === 'sellresource') {
        let totalGanado = 0;
        let mineralesParaVender = false;

        // Vender todos los minerales
        Object.keys(recursos).forEach(recurso => {
            let cantidadRecursos = global.db.data.users[m.sender]['rpg' + recurso];
            if (cantidadRecursos > 0) {
                mineralesParaVender = true;
                let valorVenta = recursos[recurso] * cantidadRecursos;
                totalGanado += valorVenta;
                global.db.data.users[m.sender]['rpg' + recurso] = 0;
            }
        });

        // Si no hay minerales para vender, mostrar mensaje de error
        if (!mineralesParaVender) {
            return m.reply('🚫 *NO TIENES MINERALES PARA VENDER*', null, { contextInfo: fkontak });
        }

        // Añadir las ganancias al balance del usuario
        global.db.data.users[m.sender].money += totalGanado;

        return m.reply(`Vendiste todos tus minerales por un total de ${totalGanado} Monedas. 💰 Nuevo balance: ${global.db.data.users[m.sender].money}`, null, { contextInfo: null });
    }
}

handler.help = ['mvender'];
handler.tags = ['games'];
handler.command = /^(mvender|sellresource)$/i;
export default handler;
