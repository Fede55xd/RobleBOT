import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let timeout = 30000;
let poin = 500;

let handler = async (m, { conn, usedPrefix }) => {
    conn.preguntas = conn.preguntas ? conn.preguntas : {};
    let id = m.chat;

    let preguntasFilePath = path.join(__dirname, '..', 'src', 'game', 'preguntas.json');
    console.log('Ruta del archivo de preguntas:', preguntasFilePath);

    if (!fs.existsSync(preguntasFilePath)) {
        console.error('ERROR: El archivo de preguntas no existe en la ruta especificada.');
        throw false;
    }

    let tekateki = JSON.parse(fs.readFileSync(preguntasFilePath, 'utf8'));

    if (id in conn.preguntas) {
        let [message, user, respuestaCorrecta, poin, timeoutId] = conn.preguntas[id];
        // Verificar si el usuario actual es el que inició el juego
        if (user === m.sender) {
            conn.reply(m.chat, 'Todavía hay una pregunta sin responder en este chat', message);
            throw false;
        }
    }

    let json = tekateki[Math.floor(Math.random() * tekateki.length)];

    // Construir las opciones y barajarlas
    let opciones = [json.options[0], json.options[1], json.options[2]];
    shuffleArray(opciones);

    let caption = `
ⷮ *${json.question}*

A. ${opciones[0]}
B. ${opciones[1]}
C. ${opciones[2]}

*• Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim();

    let respuestaCorrecta = json.options[json.answer]; // Respuesta correcta

    let message = await conn.reply(m.chat, caption, m);

    conn.preguntas[id] = [
        message,
        m.sender, // Almacenar el ID del usuario que inició el juego
        respuestaCorrecta, poin,
        setTimeout(async () => {
            if (conn.preguntas[id] && conn.preguntas[id][1] === m.sender) {
                // Verificar que el usuario que inició el juego sea el que responde
                await conn.reply(m.chat, `Se acabó el tiempo!\n*Respuesta Correcta:* ${respuestaCorrecta}`, message);
                delete conn.preguntas[id];
            }
        }, timeout)
    ];
};

handler.help = ['responder'];
handler.tags = ['game'];
handler.command = /^(responder|answer)$/i;

export default handler;

function shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
