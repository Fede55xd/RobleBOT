import { Buffer } from 'buffer';

const rangos = [
    'Novato', 'Aprendiz', 'Soldado', 'Cabo', 'Sargento', 'Teniente', 'Capitan', 'Comandante', 'Coronel', 'General', 'Mariscal', 'Vanguardia', 'Elite', 'Titan', 'Leyenda', 'Maestro', 'SemiDios', 'DIOS'
];

const precios = {
    'Novato': 5000, 'Aprendiz': 10000, 'Soldado': 25000, 'Cabo': 50000, 'Sargento': 75000, 'Teniente': 100000, 'Capitan': 115000, 'Comandante': 150000, 'Coronel': 180000, 'General': 220000, 'Mariscal': 280000, 'Vanguardia': '325000', 'Elite': 370000, 'Titan': 430000, 'Leyenda': 480000, 'Maestro': 525000, 'SemiDios': 600000, 'DIOS': 2000000
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

        if (user.uprank.rango === 'DIOS') {
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
