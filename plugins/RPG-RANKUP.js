// Importar las funciones necesarias y el módulo Buffer
import { Buffer } from 'buffer';

// Definir los rangos y sus precios
const rangos = [
    'BRONCE I', 'BRONCE II', 'BRONCE III', 'BRONCE IV', 'BRONCE V',
    'PLATA I', 'PLATA II', 'PLATA III', 'PLATA IV', 'PLATA V',
    'ORO I', 'ORO II', 'ORO III', 'ORO IV', 'ORO V',
    'PLATINO I', 'PLATINO II', 'PLATINO III', 'PLATINO IV', 'PLATINO V',
    'DIAMANTE I', 'DIAMANTE II', 'DIAMANTE III', 'DIAMANTE IV', 'DIAMANTE V',
    'LAVA I', 'LAVA II', 'LAVA III', 'LAVA IV', 'LAVA V',
    'ROBLEBOSS'
];

const precios = {
    'BRONCE I': 10, 'BRONCE II': 20, 'BRONCE III': 40, 'BRONCE IV': 80, 'BRONCE V': 160,
    'PLATA I': 320, 'PLATA II': 640, 'PLATA III': 1280, 'PLATA IV': 2560, 'PLATA V': 5120,
    'ORO I': 10240, 'ORO II': 20480, 'ORO III': 40960, 'ORO IV': 81920, 'ORO V': 163840,
    'PLATINO I': 327680, 'PLATINO II': 655360, 'PLATINO III': 1310720, 'PLATINO IV': 2621440, 'PLATINO V': 5242880,
    'DIAMANTE I': 10485760, 'DIAMANTE II': 20971520, 'DIAMANTE III': 41943040, 'DIAMANTE IV': 83886080, 'DIAMANTE V': 167772160,
    'LAVA I': 335544320, 'LAVA II': 671088640, 'LAVA III': 1342177280, 'LAVA IV': 2684354560, 'LAVA V': 5368709120,
    'ROBLEBOSS': Infinity
};

// Función para calcular el precio del siguiente rango
function calcularPrecioRango(rangoActual) {
    return precios[rangoActual];
}

// Función para obtener el siguiente rango
function obtenerSiguienteRango(rangoActual) {
    const indiceActual = rangos.indexOf(rangoActual);
    return rangos[indiceActual + 1];
}

// Función principal del comando
let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    // Obtener el usuario desde la base de datos
    let user = global.db.data.users[m.sender];

    const comando = command.toLowerCase(); // Convertir el comando a minúsculas

    // Asignar 'BRONCE I' como rango predeterminado si no tiene uno asignado
    if (!user.uprank.rango) {
        user.uprank.rango = 'BRONCE I';
    }

    if (comando === 'rankup') {
        let precio = calcularPrecioRango(user.uprank.rango);

        if (user.money < precio) {
            let dineroFaltante = precio - user.money;
            let mensajeError = `Hey @${m.sender.split('@')[0]}, *🚫 No tienes suficiente dinero para subir de rango.*\n\n💸 *Necesitas: ${precio} RobleCoins*\n*Falta: ${dineroFaltante} RobleCoins*`;
            return conn.reply(m.chat, mensajeError, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
        }

        user.money -= precio; // Restar el precio del dinero del usuario
        user.uprank.rango = obtenerSiguienteRango(user.uprank.rango); // Obtener el siguiente rango

        let mensajeExito = `Hey @${m.sender.split('@')[0]}, *✅ Gastaste ${precio} RobleCoins para subir al rango ${user.uprank.rango}.*\n\n💸 *RobleCoins restantes: ${user.money}*`;
        return conn.reply(m.chat, mensajeExito, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
    } else if (comando === 'rankup all') {
        let dineroTotal = 0;
        let rangoAlcanzado;

        while (user.uprank.rango !== 'ROBLEBOSS') {
            let precio = calcularPrecioRango(user.uprank.rango);

            if (user.money < precio) {
                break;
            }

            user.money -= precio;
            rangoAlcanzado = user.uprank.rango; // Guardar el rango alcanzado en cada iteración
            user.uprank.rango = obtenerSiguienteRango(user.uprank.rango);
            dineroTotal += precio;
        }

        if (dineroTotal > 0) {
            let mensajeExito = `Hey @${m.sender.split('@')[0]}, *✅ Gastaste ${dineroTotal} RobleCoins para subir hasta el rango ${rangoAlcanzado}.*\n\n💸 *RobleCoins restantes: ${user.money}*`;
            return conn.reply(m.chat, mensajeExito, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
        } else {
            let mensajeError = `Hey @${m.sender.split('@')[0]}, *🚫 No tienes suficiente dinero para subir de rango.*\n\n💸 *RobleCoins restantes: ${user.money}*`;
            return conn.reply(m.chat, mensajeError, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
        }
    } else {
        let mensajeError = `Hey @${m.sender.split('@')[0]}, *🚫 Comando incorrecto. Utiliza ${usedPrefix}rankup para subir de rango o ${usedPrefix}rankup all para subir todos los rangos posibles.*`;
        return conn.reply(m.chat, mensajeError, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
    }
}

// Definir la ayuda y las etiquetas del comando
handler.help = ['rankup', 'rankup all'];
handler.tags = ['games'];

// Definir los comandos válidos para activar este handler
handler.command = /^(rankup|rankup all)$/i;

// Exportar el handler para ser utilizado en otros módulos
export default handler;
