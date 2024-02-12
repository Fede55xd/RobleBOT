// En el archivo que contiene el plugin de trabajos (puedes renombrarlo según tu estructura)
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let currentTime = new Date();
    let timeDiff = currentTime - user.lastCadadia;
    let waitTime = 86400000; // 24 horas en milisegundos

    if (timeDiff < waitTime)
        return m.reply(`*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE USAR "CADA DÍA" NUEVAMENTE.*\n*ℹ️ Veces utilizadas: ${user.cadadiaCount}*`, null, { contextInfo: null });

    let coinsClaimed = 100000; // Cambiado a 5,000,000 para representar una recompensa diaria más grande

    user.money += coinsClaimed;
    user.lastCadadia = currentTime;
    user.cadadiaCount = user.cadadiaCount ? user.cadadiaCount + 1 : 1; // Contador de veces utilizadas

    let cadadiaMessage = `
*💰 HAS OBTENIDO 100000 DE ROBLECOINS AL USAR "CADA DÍA" 💰*

*💰 BALANCE ACTUALIZADO:*\n*${user.money} ROBLECOINS*

*ℹ️ Veces utilizadas: ${user.cadadiaCount}*\n*⏰ Puedes usar "cadadia" nuevamente en 24 horas*
`;

    return m.reply(cadadiaMessage, null, { contextInfo: null });
}

handler.help = ['cadadia'];
handler.tags = ['economy'];
handler.command = /^cadadia$/i;
export default handler;
