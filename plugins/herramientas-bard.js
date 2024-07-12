import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `INGRESE UN TEXTO!`;

    try {
        // Obtenemos la respuesta de la API original
        var apii = await fetch(`https://aemt.me/bard?text=${encodeURIComponent(text)}`);
        var res = await apii.json();
        var originalResponse = res.result;

        // Traducimos la respuesta al español
        var translatedResponse = await translate(originalResponse, { to: 'es' });

        // Enviamos la respuesta traducida
        await m.reply(translatedResponse.text);
    } catch (error) {
        console.error(error);
        throw 'OCURRIÓ UN ERROR';
    }
};

handler.command = ['bard', 'ia2'];
handler.help = ['bard'];
handler.tags = ['herramientas'];
handler.premium = false;

export default handler;
