import TicTacToe from '../lib/tictactoe.js';
let timeout = 60000;
let poin = 600;
let poin_lose = -100;
let poin_bot = 200;
global.suit = global.suit ? global.suit : {};
let MessageType = (await import(global.baileys)).default;

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';
    // Comentamos o eliminamos la siguiente línea para evitar la verificación
    // if (!db.data.chats[m.chat].game) throw `${lenguajeGB['smsAvisoAG']()}Los juegos están desactivados en este grupo.`;

    try {
        if (['ppt', 'pvp', 'suit', 'suitpvp'].includes(command)) {
            let textquien = `${lenguajeGB['smsAvisoMG']()} Piedra, Papel, o Tijera\n\nPuedes usar estos comandos:\n${usedPrefix + command} piedra\n${usedPrefix + command} papel\n${usedPrefix + command} tijera\n\nO puedes etiquetar a una persona:\n${usedPrefix + command} @0`;
            if (!m.mentionedJid[0] && !args[0]) return m.reply(textquien, m.chat, { mentions: conn.parseMention(textquien) }, { quoted: fkontak });

            let who = m.isGroup ? (m.mentionedJid[0] ? m.mentionedJid[0] : m.sender) : m.sender;
            let name = conn.getName(who);
            let astro = Math.random();
            astro = astro < 0.34 ? 'piedra' : (astro < 0.67 ? 'tijera' : 'papel');

            let userChoice = args[0]?.toLowerCase() || text;
            let resultMessage = '';
            let winMoney = 0;
            let loseMoney = 0;

            if (userChoice === astro) {
                resultMessage = `Empate! 🤝\nTú: ${userChoice}\nBot: ${astro}`;
                winMoney = 2;
            } else if ((userChoice === 'piedra' && astro === 'tijera') ||
                       (userChoice === 'tijera' && astro === 'papel') ||
                       (userChoice === 'papel' && astro === 'piedra')) {
                resultMessage = `¡Has ganado! 🎉\nTú: ${userChoice}\nBot: ${astro}`;
                winMoney = Math.floor(Math.random() * 901) + 100; // Random between 100 and 1000
            } else {
                resultMessage = `Has perdido! 🤡\nTú: ${userChoice}\nBot: ${astro}`;
                loseMoney = Math.floor(Math.random() * 301) + 100; // Random between 100 and 400
            }

            global.db.data.users[m.sender].money += winMoney;
            global.db.data.users[m.sender].money -= loseMoney;
            conn.reply(m.chat, `${resultMessage}\nDinero ganado: ${winMoney} GataCoins\nDinero perdido: ${loseMoney} GataCoins\nTu dinero: ${global.db.data.users[m.sender].money} GataCoins`, m, { contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: name, body: wm, previewType: 0, thumbnail: pp, sourceUrl: accountsgb }}});

            if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) {
                return m.reply(`${lenguajeGB['smsAvisoAG']()}Termina tu partida antes de iniciar otra`);
            }
            if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) {
                return m.reply(`${lenguajeGB['smsAvisoIIG']()}La persona a la que quieres desafiar está jugando otra partida`);
            }
        }
    } catch (e) {
        m.reply('Ocurrió un error: ' + e.message);
    }
};

handler.command = /^(ppt|pvp|suit|suitpvp)$/i;
export default handler;
