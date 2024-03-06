let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let cooldown = 3600000; 

    if (user.lastAdventure && new Date() - user.lastAdventure < cooldown) {
        let timeLeft = cooldown - (new Date() - user.lastAdventure);
        let minutesLeft = Math.floor(timeLeft / 60000);
        let secondsLeft = Math.floor((timeLeft % 60000) / 1000);

        let timeLeftMessage = "";
        if (minutesLeft > 0) {
            timeLeftMessage += `Debes esperar *${minutesLeft} minutos*`;
            if (secondsLeft > 0) {
                timeLeftMessage += ` y *${secondsLeft} segundos*`;
            }
        } else {
            timeLeftMessage += `Debes esperar *${secondsLeft} segundos*`;
        }

        timeLeftMessage += " antes de realizar otra aventura. ⏳";
        
        return await conn.reply(m.chat, timeLeftMessage, m, { contextInfo: { mentionedJid: [m.sender, ...m.mentionedJid] } });
    }

    let locations = ["A París", "A las montañas", "A la jungla", "A una ciudad abandonada", "A la playa", "A un bosque encantado", "Al desierto", "A explorar unas cuevas misteriosas", "La gran ciudad submarina", "La selva oscura"];
    let activities = ["A trabajar en una joyería 💍", "A explorar cuevas 🕵️‍♂️", "A buscar tesoros perdidos 🏴‍☠️", "A nadar en el mar 🏊", "A escalar montañas 🧗", "A buscar artefactos antiguos 🏺", "A hacer surf 🏄", "A avistar aves raras 🦜", "A pescar en el río 🎣", "A acampar bajo las estrellas ⛺"];
    let rewards = [
        { name: "RobleCoins 💰", key: "money", min: 10000, max: 20000 },
        { name: "Piedra 🪨", key: "rpgpiedra", min: 1000, max: 2000 },
        { name: "Madera 🌳", key: "rpgmadera", min: 1050, max: 3000 },
        { name: "Plata 🥈", key: "rpgplata", min: 70, max: 130 },
        { name: "Oro 🥇", key: "rpgoro", min: 20, max: 80 },
        { name: "Diamante 💎", key: "rpgdiamante", min: 12, max: 30 }
    ];

    let randomLocation = locations[Math.floor(Math.random() * locations.length)];
    let randomActivity = activities[Math.floor(Math.random() * activities.length)];
    let randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    let rewardAmount = Math.floor(Math.random() * (randomReward.max - randomReward.min + 1)) + randomReward.min;

    user[randomReward.key] += rewardAmount;

    let adventureMessage = `*@${m.sender.split('@')[0]},* _Fuiste_ *${randomActivity}*\n_Recibiste de la exploracion:_\n*${rewardAmount} ${randomReward.name}*.`;

    user.lastAdventure = new Date();
    
    return await conn.reply(m.chat, adventureMessage, m, { contextInfo: { mentionedJid: [m.sender, ...m.mentionedJid] } });
}

handler.help = ['aventura'];
handler.tags = ['economy'];
handler.command = /^(aventura)$/i;
export default handler;
