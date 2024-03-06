import yts from "yt-search";
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const cooldowns = {};

let handler = async (m, { conn, args, usedPrefix }) => {
    const cost = 0; 

    if (!args[0]) {
        return m.reply(`❌ *ERROR* ❌\n_Por favor, proporciona el título del audio que deseas descargar._\n\n_Para más opciones, puedes usar el comando:_ *${usedPrefix}menu*`);
    }

    let user = global.db.data.users[m.sender];
    if (!user) user = global.db.data.users[m.sender] = {};
    
    if (!isNumber(user.money)) user.money = 15000;

    if (user.money < cost) {
        return m.reply(`❌ *ERROR* ❌\n_No tienes suficientes RobleCoins para descargar el audio._\n*Necesitas al menos ${cost} RobleCoins.*\n_Tu saldo actual es de:_ *${user.money}* _RobleCoins._\n\n_Para más opciones, puedes usar el comando:_ *${usedPrefix}menu*`);
    }

    try {
        const yt_play = await search(args.join(" "));

        // Verificar si la duración del audio supera los 30 minutos (1800 segundos)
        if (yt_play[0].seconds > 1800) {
            return m.reply(`❌ *ERROR* ❌\n_El audio supera los 30 minutos de duración y no puede ser descargado._\n_Por favor, elige un audio más corto._`);
        }
        
        const realUploadDate = new Date(yt_play[0].uploaded).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

        const audioInfo = `*Audio Encontrado* 🎵\n➔ *Título:* ${yt_play[0].title}\n➔ *Autor:* ${yt_play[0].author.name}\n➔ *Duración:* ${yt_play[0].timestamp}\n➔ *Costo de envío:* GRATIS\n\nEnviando audio, por favor espere... 📤\n\nPuedes usar *${usedPrefix}menu*\npara ver mis demás funciones.\n\n*RobleBOT* fue desarrollado por: *@robleuy*`;

        await m.reply(audioInfo);

        user.money -= cost;

        let q = '128kbps';
        let v = yt_play[0].url;
        const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
        const dl_url = await yt.audio[q].download();
        await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg' }, { quoted: m });

    } catch {
        // Manejo de errores
        return m.reply(`❌ *ERROR* ❌\n_No se pudo obtener información del audio o ha ocurrido un error durante la descarga._`);
    }
};

handler.command = ['play', 'audio'];
export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}
