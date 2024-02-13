let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let currentTime = new Date();
    let timeDiff = currentTime - user.lastCadadia;
    let waitTime = 86400000; 

    if (timeDiff < waitTime) {
        let remainingTime = waitTime - timeDiff;
        let hours = Math.floor(remainingTime / 3600000);
        let minutes = Math.floor((remainingTime % 3600000) / 60000);
        let seconds = Math.floor((remainingTime % 60000) / 1000);

        let timeMessage = "";

        if (hours > 0) {
            timeMessage += `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
            if (minutes > 0) timeMessage += ` y ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        } else if (minutes > 0) {
            timeMessage += `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
            if (seconds > 0) timeMessage += ` y ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
        }

        return m.reply(`*⏰ Debes esperar: ${timeMessage} para reclamar esta recompensa nuevamente.*`, null, { contextInfo: null });
    }

    let coinsClaimed = 100000; 

    user.money += coinsClaimed;
    user.lastCadadia = currentTime;
    user.cadadiaCount = user.cadadiaCount ? user.cadadiaCount + 1 : 1; 

    let cadadiaMessage = `*💰 Has reclamado tu beneficio de 100000 RobleCoins al día por ser parte de RobleBOT 💰*`;

    return m.reply(cadadiaMessage, null, { contextInfo: null });
}

handler.help = ['cadadia'];
handler.tags = ['economy'];
handler.command = /^cadadia$/i;
export default handler;
