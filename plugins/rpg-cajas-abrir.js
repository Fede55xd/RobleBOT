let handler = async (m, { conn, text, command, args }) => {
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

    let tiposCaja = ['comun', 'rara', 'especial', 'celestial'];
    let tipoCaja = args[0]?.toLowerCase();

    if (!tiposCaja.includes(tipoCaja)) {
        return m.reply('*🚫 Ingresa un tipo de caja válido: común, rara, especial o celestial.*', null, { contextInfo: fkontak });
    }

    let tipoLlave = 'llave' + tipoCaja;
    let tipoCajaCapitalizado = tipoCaja.charAt(0).toUpperCase() + tipoCaja.slice(1);

    if (!global.db.data.users[m.sender][tipoLlave] || global.db.data.users[m.sender][tipoLlave] <= 0) {
        return m.reply(`*🚫 No tienes llaves de caja ${tipoCajaCapitalizado} para abrir.*`, null, { contextInfo: fkontak });
    }

    // Lógica para abrir la caja y obtener recompensas (puedes personalizar según tus necesidades)
    let recompensaObtenida = null;
    let cantidadMonedas = 0;
    let cantidadPescado = 0;
    let cantidadPiedra = 0;
    let cantidadPlata = 0;
    let cantidadLlavesComun = 0;
    let cantidadLlavesRara = 0;
    let cantidadLlavesEspecial = 0;
    let cantidadSubirPico = 0;

    if (tipoCaja === 'comun') {
        let probabilidades = {
            piedra: 40,
            plata: 20,
            pescados: 50,
            monedas: 75,
            llavesComunes: 15
        };

        let resultado = Math.random() * 100;

        if (resultado < probabilidades.piedra) {
            cantidadPiedra = Math.floor(Math.random() * (150 - 60 + 1)) + 60;
            recompensaObtenida = `Entre ${60} y ${150} de piedra`;
        } else if (resultado < probabilidades.piedra + probabilidades.plata) {
            cantidadPlata = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
            recompensaObtenida = `Entre ${20} y ${100} de plata`;
        } else if (resultado < probabilidades.piedra + probabilidades.plata + probabilidades.pescados) {
            cantidadPescado = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            recompensaObtenida = `Entre ${5} y ${10} de pescado`;
        } else if (resultado < probabilidades.piedra + probabilidades.plata + probabilidades.pescados + probabilidades.monedas) {
            cantidadMonedas = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
            recompensaObtenida = `Entre ${3000} y ${5000} monedas`;
        } else if (resultado < probabilidades.piedra + probabilidades.plata + probabilidades.pescados + probabilidades.monedas + probabilidades.llavesComunes) {
            cantidadLlavesComun = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            recompensaObtenida = `${cantidadLlavesComun} llave${cantidadLlavesComun > 1 ? 's' : ''} de caja común`;
        }
    } else if (tipoCaja === 'rara') {
        let probabilidades = {
            plata: 20,
            pescados: 10,
            monedas: 55,
            llavesComunes: 20,
            llavesRaras: 10
        };

        let resultado = Math.random() * 100;

        if (resultado < probabilidades.plata) {
            cantidadPlata = Math.floor(Math.random() * (70 - 60 + 1)) + 60;
            recompensaObtenida = `Entre ${60} y ${70} de plata`;
        } else if (resultado < probabilidades.plata + probabilidades.pescados) {
            cantidadPescado = Math.floor(Math.random() * (13 - 8 + 1)) + 8;
            recompensaObtenida = `Entre ${8} y ${13} de pescado`;
        } else if (resultado < probabilidades.plata + probabilidades.pescados + probabilidades.monedas) {
            cantidadMonedas = Math.floor(Math.random() * (7500 - 5000 + 1)) + 5000;
            recompensaObtenida = `Entre ${5000} y ${7500} monedas`;
        } else if (resultado < probabilidades.plata + probabilidades.pescados + probabilidades.monedas + probabilidades.llavesComunes) {
            cantidadLlavesComun = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            recompensaObtenida = `${cantidadLlavesComun} llave${cantidadLlavesComun > 1 ? 's' : ''} de caja común`;
        } else if (resultado < probabilidades.plata + probabilidades.pescados + probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras) {
            cantidadLlavesRara = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            recompensaObtenida = `${cantidadLlavesRara} llave${cantidadLlavesRara > 1 ? 's' : ''} de caja rara`;
        }
    } else if (tipoCaja === 'especial') {
        let probabilidades = {
            pescados: 20,
            monedas: 40,
            llavesComunes: 30,
            llavesRaras: 20,
            llavesEspeciales: 10,
            subirPico: 15
        };

        let resultado = Math.random() * 100;

        if (resultado < probabilidades.pescados) {
            cantidadPescado = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
            recompensaObtenida = `Entre ${30} y ${60} de pescado`;
        } else if (resultado < probabilidades.pescados + probabilidades.monedas) {
            cantidadMonedas = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000;
            recompensaObtenida = `Entre ${15000} y ${25000} monedas`;
        } else if (resultado < probabilidades.pescados + probabilidades.monedas + probabilidades.llavesComunes) {
            cantidadLlavesComun = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            recompensaObtenida = `${cantidadLlavesComun} llave${cantidadLlavesComun > 1 ? 's' : ''} de caja común`;
        } else if (resultado < probabilidades.pescados + probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras) {
            cantidadLlavesRara = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            recompensaObtenida = `${cantidadLlavesRara} llave${cantidadLlavesRara > 1 ? 's' : ''} de caja rara`;
        } else if (resultado < probabilidades.pescados + probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras + probabilidades.llavesEspeciales) {
            cantidadLlavesEspecial = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            recompensaObtenida = `${cantidadLlavesEspecial} llave${cantidadLlavesEspecial > 1 ? 's' : ''} de caja especial`;
        } else if (resultado < probabilidades.pescados + probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras + probabilidades.llavesEspeciales + probabilidades.subirPico) {
            cantidadSubirPico = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            recompensaObtenida = `Subir ${cantidadSubirPico} nivel${cantidadSubirPico > 1 ? 'es' : ''} al pico`;
        }
    } else if (tipoCaja === 'celestial') {
        let probabilidades = {
            monedas: 55,
            llavesComunes: 70,
            llavesRaras: 50,
            llavesEspeciales: 40,
            llavesCelestiales: 20,
            subirPico: 5
        };

        let resultado = Math.random() * 100;

        if (resultado < probabilidades.monedas) {
            cantidadMonedas = Math.floor(Math.random() * (160000 - 80000 + 1)) + 80000;
            recompensaObtenida = `Entre ${80000} y ${160000} monedas`;
        } else if (resultado < probabilidades.monedas + probabilidades.llavesComunes) {
            cantidadLlavesComun = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
            recompensaObtenida = `${cantidadLlavesComun} llave${cantidadLlavesComun > 1 ? 's' : ''} de caja común`;
        } else if (resultado < probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras) {
            cantidadLlavesRara = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
            recompensaObtenida = `${cantidadLlavesRara} llave${cantidadLlavesRara > 1 ? 's' : ''} de caja rara`;
        } else if (resultado < probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras + probabilidades.llavesEspeciales) {
            cantidadLlavesEspecial = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            recompensaObtenida = `${cantidadLlavesEspecial} llave${cantidadLlavesEspecial > 1 ? 's' : ''} de caja especial`;
        } else if (resultado < probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras + probabilidades.llavesEspeciales + probabilidades.llavesCelestiales) {
            cantidadLlavesCelestial = Math.floor(Math.random() * (1 - 1 + 1)) + 1;
            recompensaObtenida = `1 llave celestial de caja`;
        } else if (resultado < probabilidades.monedas + probabilidades.llavesComunes + probabilidades.llavesRaras + probabilidades.llavesEspeciales + probabilidades.llavesCelestiales + probabilidades.subirPico) {
            cantidadSubirPico = Math.floor(Math.random() * (1 - 1 + 1)) + 1;
            recompensaObtenida = `Subir el pico al máximo (nivel 100)`;
        }
    }

    // Actualizar llaves y entregar recompensa (puedes personalizar según tus necesidades)
    global.db.data.users[m.sender][tipoLlave] -= 1;

    // Entregar la recompensa al usuario
    if (cantidadMonedas > 0) {
        global.db.data.users[m.sender].money += cantidadMonedas;
    } else if (cantidadPescado > 0) {
        global.db.data.users[m.sender].pescados = (global.db.data.users[m.sender].pescados || 0) + cantidadPescado;
    } else if (cantidadPiedra > 0) {
        // Agrega aquí la lógica para entregar piedras al usuario
    } else if (cantidadPlata > 0) {
        // Agrega aquí la lógica para entregar plata al usuario
    } else if (cantidadLlavesComun > 0) {
        global.db.data.users[m.sender].llavecomun = (global.db.data.users[m.sender].llavecomun || 0) + cantidadLlavesComun;
    } else if (cantidadLlavesRara > 0) {
        global.db.data.users[m.sender].llaverara = (global.db.data.users[m.sender].llaverara || 0) + cantidadLlavesRara;
    } else if (cantidadLlavesEspecial > 0) {
        global.db.data.users[m.sender].llaveespecial = (global.db.data.users[m.sender].llaveespecial || 0) + cantidadLlavesEspecial;
    } else if (cantidadSubirPico > 0) {
        // Agrega aquí la lógica para subir el pico del usuario
    }

    // Enviar mensaje con la recompensa obtenida
    return m.reply(`*📦 ¡Has abierto una caja ${tipoCajaCapitalizado} y obtuviste!* \n\n${recompensaObtenida}`, null, { contextInfo: fkontak });
}

handler.command = /^(abrircaja)$/i;
handler.help = ['abrircaja (tipo de caja)'];
handler.tags = ['economy'];
export default handler;
