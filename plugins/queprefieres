import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat;
    let queprefieres = JSON.parse(fs.readFileSync('./src/game/queprefieres.json'));
    let queprefieresa = queprefieres[Math.floor(Math.random() * queprefieres.length)];
    let mensaje = `🌟 _¿Que prefieres?_ 🌟\n*${queprefieresa.question}*`;
    conn.reply(m.chat, mensaje, m);
};

handler.help = ['queprefieres'];
handler.tags = ['game'];
handler.command = /^(queprefieres)$/i;

export default handler;
