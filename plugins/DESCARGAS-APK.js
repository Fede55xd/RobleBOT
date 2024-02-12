import { search, download } from 'aptoide-scraper';


const mid = {
    smsAvisoMG: () => "❌ *ERROR* ❌\n",
    smsApk: "_Falto proporcionar el titulo de la app que deseas descargar._",
    
};

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
    if (command !== 'apk') return; 

    if (!text) throw `${mid.smsAvisoMG()} *${mid.smsApk}*`;

    try {
        const searchA = await search(text);
        const data5 = await download(searchA[0].id);

        let response = `*Nombre del APK*: _${data5.name}_\n*Peso del APK:* _${data5.size}_\n\n*Descargando APK, por favor espere...*\n\n_Recuerda usar:_ *.menu*\n_Para ver mis otras funciones._ 🚀🚀🚀\n⚠️ *AVISO, CLICK EN LEER MAS PARA SABER COMO INSTALAR LA APP* ⚠️\n👇👇👇\n${readMore}\n_Para poder instalar la app debes seguir estos pasos:_\n*Paso #1:* _Ve a tu explorador de archivos de preferencia o puedes usar el que viene por defecto en tu dispositivo móvil._\n*Paso #2:* _Busca la carpeta llamada "Android"_\n*Paso #3:* _Dentro de la carpeta Android busca la carpeta "media" y luego pulsa en la carpeta "com.whatsapp", luego en "WhatsApp", luego en "media", luego en "documents"_\n\nPuede que la app te aparezca ahí mismo o puede que necesites entrar a la carpeta "Prívate", en una de esas dos debe estar la app.`;

        await conn.sendMessage(m.chat, { image: { url: data5.icon }, caption: response }, { quoted: m });

        if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
            return await conn.sendMessage(m.chat, { text: mid.smsApk4 }, { quoted: m });
        }

        await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null }, { quoted: m });
    } catch (e) {
        await conn.reply(m.chat, `${mid.smsMalError3()} #report ${mid.smsMensError2()} ${prefix + command}\n\n${wm}`, m);
        console.log(`❗❗ ${mid.smsMensError2()} ${prefix + command} ❗❗`);
        console.log(e);
    }
};

handler.command = /^apk$/i; 
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
