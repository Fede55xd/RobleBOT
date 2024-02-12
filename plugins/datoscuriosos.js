import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat;
    let datosCuriosos = JSON.parse(fs.readFileSync('./src/game/datoscuriosos.json'));
    let randomDato = datosCuriosos[Math.floor(Math.random() * datosCuriosos.length)];
    let mensaje = `🌟 _Aquí te va un dato curioso_ 🌟\n*${randomDato.fact}*`;
    conn.reply(m.chat, mensaje, m);
};

handler.help = ['datocurioso'];
handler.tags = ['game'];
handler.command = /^(datocurioso)$/i;

export default handler;
