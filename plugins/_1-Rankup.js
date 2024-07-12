import { Buffer } from 'buffer';

const rangos = [
    'Novato', 'Aprendiz', 'Soldado', 'Cabo', 'Sargento', 'Teniente', 'Capitan', 'Comandante', 'Coronel', 'General', 'Mariscal', 'Vanguardia', 'Elite', 'Titan', 'Leyenda', 'Maestro', 'SemiDios', 'DIOS', 'RobleBOSS',
];

const precios = {
    'Novato': 100000, 'Aprendiz': 200000, 'Soldado': 400000, 'Cabo': 800000, 'Sargento': 1600000, 'Teniente': 3200000, 'Capitan': 8000000, 'Comandante': 16000000, 'Coronel': 32000000, 'General': 64000000, 'Mariscal': 100000000, 'Vanguardia': 200000000, 'Elite': 400000000, 'Titan': 800000000, 'Leyenda': 1000000000, 'Maestro': 2000000000, 'SemiDios': 10000000000, 'DIOS': 50000000000, 'RobleBOSS': 100000000000
};

function calcularPrecioRango(rangoActual) {
    return precios[rangoActual];
}

function obtenerSiguienteRango(rangoActual) {
    const indiceActual = rangos.indexOf(rangoActual);
    return rangos[indiceActual + 1];
}

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];

    const comando = command.toLowerCase(); 

    if (!user.uprank) {
        user.uprank = { rango: 'Novato' };
    } else if (!user.uprank.rango) {
        user.uprank.rango = 'Novato';
    }

    if (comando === 'rankup') {
        let precio = calcularPrecioRango(user.uprank.rango);

        if (user.uprank.rango === 'RobleBOSS') {
            let mensajeMaximo = `*Hey @${m.sender.split('@')[0]}, 🌟 ¡Felicidades! Ya has alcanzado el rango máximo, no hay más rangos para subir.*`;
            return conn.reply(m.chat, mensajeMaximo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
        }

        if (user.money < precio) {
            let dineroFaltante = precio - user.money;
            let mensajeError = `*Hey @${m.sender.split('@')[0]}, 🚫 No tienes suficiente saldo para subir al rango (${obtenerSiguienteRango(user.uprank.rango)}).*\n\n💸 *Necesitas: $${precio}*\n*Falta: $${dineroFaltante}*`;
            return conn.reply(m.chat, mensajeError, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
        }

        user.money -= precio; 
        user.uprank.rango = obtenerSiguienteRango(user.uprank.rango); 

        let mensajeExito = `*Hey @${m.sender.split('@')[0]}, ✅ Gastaste $${precio} para subir al rango ${user.uprank.rango}.*\n\n💸 *Saldo restante: $${user.money}*`;
        return conn.reply(m.chat, mensajeExito, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
    } else {
        let mensajeError = `*Hey @${m.sender.split('@')[0]}, 🚫 Comando incorrecto. Utiliza .rankup para subir de rango.*`;
        return conn.reply(m.chat, mensajeError, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
    }
}

handler.help = ['rankup'];
handler.tags = ['games'];
handler.command = /^rankup$/i;

export default handler;
