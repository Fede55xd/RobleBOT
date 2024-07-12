//                  LA LOTERIA 
//              👇 CRÉDITOS PARA 👇          
//           👉  ROBLEUY - N4MECIT4  👈
//                                          |
//  (robleuy) PROGRAMADOR | TUVO LA IDEA (n4mecit4)
//
let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('*❌ ERROR ❌*\n*Por favor, proporciona los números elegidos.*'); 
    }

    let user = global.db.data.users[m.sender];
    let chosenNumbers = text.trim().split(' ').map(Number);

    if (user.money < 100)
        return m.reply('*❌ ERROR ❌*\n_No tienes suficientes_ *ROBLECOINS* _para participar en la lotería. El costo es de_ *100 ROBLECOINS.*'); 
    if (chosenNumbers.length !== 5 || new Set(chosenNumbers).size !== 5)
        return m.reply('*❌ ERROR ❌\n*Debes elegir exactamente 5 números diferentes del 1 al 10.*'); 

    let { key } = await conn.sendMessage(m.chat, { text: "*Los resultados estarán disponibles en 5...*", options: { isBold: true } }, { quoted: m });

    const countdown = [5, 4, 3, 2, 1];
    for (let num of countdown) {
        await conn.sendMessage(m.chat, { text: `*Los resultados estarán disponibles en ${num}...*`, options: { isBold: true }, edit: key }, { quoted: m });
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    }

    let drawnNumbers = [];
    while (drawnNumbers.length < 5) {
        let newNumber = Math.floor(Math.random() * 10) + 1;
        if (!drawnNumbers.includes(newNumber)) {
            drawnNumbers.push(newNumber);
        }
    }

    let resultMessage = `
*🎰 Números elegidos por el usuario:*
${chosenNumbers.map(num => getEmoji(num)).join(' ')}
*🎉 Números sorteados:*
${drawnNumbers.map(num => getEmoji(num)).join(' ')}
`;

    let winnings = calculateWinnings(chosenNumbers, drawnNumbers);
    user.money += winnings;

    resultMessage += `
*💰 Ganancias o pérdidas:*
${winnings} ROBLECOINS
*💸 Saldo actual:*
${user.money} ROBLECOINS
`;

    return m.reply(resultMessage);
};

function getEmoji(num) {
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    return emojis[num - 1];
}

function calculateWinnings(chosenNumbers, drawnNumbers) {
    let correctNumbers = chosenNumbers.filter(num => drawnNumbers.includes(num));

    if (correctNumbers.length === 5) {
        return 10000;
    } else if (correctNumbers.length === 4) {
        return 1000;
    } else if (correctNumbers.length === 3) {
        return 100;
    } else if (correctNumbers.length === 2) {
        return 50;
    }

    return -100; 
}

handler.help = ['loteria', 'loterìa', 'loto', '5deoro'];
handler.tags = ['juego', 'loteria'];
handler.command = /^(loteria|loto|5deoro)$/i;

export default handler;
