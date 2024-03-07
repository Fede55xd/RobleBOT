let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Paso 1: Agregar la propiedad pico si no existe
    if (!user.pico) user.pico = 1;

    let timeDiff = new Date() - user.lastMine;
    let waitTime = 60000;

    if (timeDiff < waitTime)
        return await conn.reply(m.chat, `*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE MINAR NUEVAMENTE.*`, m, { contextInfo: null });

    let minerales = [
        { nombre: "oro", rareza: 15, emoji: "💰", min: 4, max: 8 },
        { nombre: "diamante", rareza: 10, emoji: "💎", min: 1, max: 5 },
        { nombre: "plata", rareza: 18, emoji: "🥈", min: 10, max: 15 },
        { nombre: "piedra", rareza: 20, emoji: "🪨", min: 50, max: 100 },
    ];

    let recursosConseguidos = `*@${m.sender.split('@')[0]} fuiste a minar con un pico de nivel ${user.pico} y conseguiste:*\n`;

    // Paso 2 y 3: Calcular porcentaje de ganancia adicional y aplicarlo
    minerales.forEach(recursoAleatorio => {
        let cantidadAleatoria = Math.floor(Math.random() * (recursoAleatorio.max - recursoAleatorio.min + 1)) + recursoAleatorio.min;

        // Calcular ganancia adicional basada en el nivel del pico
        let gananciaAdicional = 0.05 * user.pico * cantidadAleatoria;

        // Aplicar el porcentaje de ganancia adicional
        cantidadAleatoria += gananciaAdicional;

        // Paso 3: Agregar los recursos obtenidos al inventario del usuario
        user[`rpg${recursoAleatorio.nombre}`] += cantidadAleatoria;
        
        recursosConseguidos += `+${cantidadAleatoria.toFixed(2)} ${recursoAleatorio.emoji} ${recursoAleatorio.nombre.charAt(0).toUpperCase() + recursoAleatorio.nombre.slice(1)}\n`;
    });

    // Paso 4: Actualizar el nivel del pico al final de la función
    user.pico++;

    user.lastMine = new Date();

    let profileInfo = `${recursosConseguidos}`;

    return await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = /^(minar)$/i;
export default handler;
