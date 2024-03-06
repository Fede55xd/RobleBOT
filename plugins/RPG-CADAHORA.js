// En el archivo que contiene el plugin de trabajos (puedes renombrarlo según tu estructura)
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let currentTime = new Date();
    let timeDiff = currentTime - user.lastCadahora;
    let waitTime = 3600000; // 1 hora en milisegundos

    if (timeDiff < waitTime)
        return m.reply(`*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE USAR "CADAHORA" NUEVAMENTE.*\n*ℹ️ Veces utilizadas: ${user.cadahoraCount}*`, null, { contextInfo: null });

    let coinsClaimed = 20000;

    user.money += coinsClaimed;
    user.lastCadahora = currentTime;
    user.cadahoraCount = user.cadahoraCount ? user.cadahoraCount + 1 : 1; // Contador de veces utilizadas

    let cadahoraMessage = `
*💰 HAS OBTENIDO 20000 DE ROBLECOINS AL USAR "CADA HORA" 💰*

*💰 BALANCE ACTUALIZADO:*\n*${user.money} ROBLECOINS*

*ℹ️ Veces utilizadas: ${user.cadahoraCount}*\n*⏰ Puedes usar "cadahora" nuevamente en 1 hora*
`;

    return m.reply(cadahoraMessage, null, { contextInfo: null });
}

handler.help = ['cadahora'];
handler.tags = ['economy'];
handler.command = /^cadahora$/i;
export default handler;
