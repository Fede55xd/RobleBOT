let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let timeDiff = new Date() - (user.lastFish || 0);
    let waitTime = 60000; // 1 minuto de espera

    if (timeDiff < waitTime)
        return await conn.reply(m.chat, `*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE PESCAR NUEVAMENTE.*`, m, { contextInfo: null });

    let rarezaMensaje = '';
    let ganancia = 0;
    let probabilidad = Math.random() * 100;

    if (probabilidad < 70) {
        ganancia = 1; // Pescado
        rarezaMensaje = 'Pesca normal 🎣';
        user.pescados = (user.pescados || 0) + 1;
    } else if (probabilidad < 70 + 50) {
        ganancia = Math.floor(Math.random() * (600 - 100 + 1)) + 100; // Monedas entre 100 y 600
        rarezaMensaje = 'Pesca aceptable 💰';
        user.money += ganancia;
    } else if (probabilidad < 70 + 50 + 20) {
        ganancia = 0; // No se gana directamente, se suma una llave común
        user.llavecomun = (user.llavecomun || 0) + 1;
        rarezaMensaje = 'Pesca interesante 🔆';
    } else if (probabilidad < 70 + 50 + 20 + 10) {
        ganancia = 0; // No se gana directamente, se suma una llave rara
        user.llaverara = (user.llaverara || 0) + 1;
        rarezaMensaje = 'Pesca emocionante 🌟';
    } else if (probabilidad < 70 + 50 + 20 + 10 + 5) {
        ganancia = 0; // No se gana directamente, se suma una llave especial
        user.llaveespecial = (user.llaveespecial || 0) + 1;
        rarezaMensaje = 'Pesca especial ✨';
    } else if (probabilidad < 70 + 50 + 20 + 10 + 5 + 1) {
        ganancia = 0; // No se gana directamente, se suma una llave celestial
        user.llavecelestial = (user.llavecelestial || 0) + 1;
        rarezaMensaje = 'Pesca increíble 🔮';
    }

    user.lastFish = new Date();

    let profileInfo = `*@${m.sender.split('@')[0]}* ${getPescaMessage(ganancia, rarezaMensaje, probabilidad.toFixed(2))}`;

    return await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

function getPescaMessage(ganancia, rarezaMensaje, probabilidad) {
    switch (rarezaMensaje) {
        case 'Pesca normal 🎣':
            return `*logró atrapar un pescado*\n*Rareza*: ${rarezaMensaje}\n*Probabilidad*: ${probabilidad}%`;
        case 'Pesca aceptable 💰':
            return `*pescó ${ganancia} Monedas*\n*Rareza*: ${rarezaMensaje}\n*Probabilidad*: ${probabilidad}%`;
        case 'Pesca interesante 🔆':
            return `*pescó una llave de caja común*\n*Rareza*: ${rarezaMensaje}\n*Probabilidad*: ${probabilidad}%`;
        case 'Pesca emocionante 🌟':
            return `*pescó una llave de caja rara*\n*Rareza*: ${rarezaMensaje}\n*Probabilidad*: ${probabilidad}%`;
        case 'Pesca especial ✨':
            return `*pescó una llave de caja especial*\n*Rareza*: ${rarezaMensaje}\n*Probabilidad*: ${probabilidad}%`;
        case 'Pesca increíble 🔮':
            return `*pescó una llave de caja celestial*\n*Rareza*: ${rarezaMensaje}\n*Probabilidad*: ${probabilidad}%`;
        default:
            return ''; // Mensaje vacío en caso de rareza desconocida
    }
}

handler.help = ['pescar'];
handler.tags = ['economy'];
handler.command = /^(pescar)$/i;
export default handler;
