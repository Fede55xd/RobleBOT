let handler = async (m, { conn }) => {
    let usedPrefix = '';
    let user = global.db.data.users[m.sender] || {};

    let profileInfo = `░▒▓█►  𝐌𝐞𝐧𝐮 𝐝𝐞 𝐑𝐨𝐛𝐥𝐞𝐁𝐎𝐓 ◄█▓▒░

┌───────────────────┐
        🎰 Casino:
➜ _.apostar_ *cantidad - all*
└───────────────────┘
┌───────────────────┐
        🏦 Banco:
➜ _.depositar_ *cantidad - all*
➜ _.retirar_ *cantidad - all*
➜ _.darcoins_ *@usuario cantidad*
➜ _.misorteo_ *cantidad*
└───────────────────┘
┌───────────────────┐
        🎁 Recompensas:
➜ _.cadadia_
➜ _.work_
└───────────────────┘
┌───────────────────┐
        👮‍♀️ Crimenes:
➜ _.robar_ *@usuario*
➜ _.crimen_
└───────────────────┘
┌───────────────────┐
        👥 Amigos:
➜ _.addfriend_ *@usuario*
➜ _.delfriend_ *@usuario*
└───────────────────┘
┌───────────────────┐
        ⏫ Subir de rango:
➜ _.rankup_
└───────────────────┘
┌───────────────────┐
        ⛏ Mineria:
➜ _.minar_
➜ _.mvender_
➜ _.picoup_ *cantidad*
└───────────────────┘
┌───────────────────┐
        🏆 Tops de Usuarios:
➜ _.topcoins_
➜ _.topkm_
└───────────────────┘
┌───────────────────┐
        🚙 Viajes:
➜ _.viajar_ *cantidad*
➜ _.buynafta_ *cantidad*
└───────────────────┘
┌───────────────────┐
        👤 Estadisticas:
➜ _.perfil_
➜ _.saldo_
└───────────────────┘
┌───────────────────┐
        🎮 Juegos:
➜ _.trivia_
➜ _.carreras_
➜ _.penales_
➜ _.love_ *nombre - @usuario*
➜ _.besar_ *nombre - @usuario*
➜ _.lindo | linda_ *nombre - @usuario*
➜ _.siono_ *texto*
➜ _.elegir_ *texto1 o texto2* 
➜ _.calcular_ *texto* [%]
➜ _.calcular2_ *texto* [CM]
➜ _.calcular3_ *texto* [NUM.]
└───────────────────┘
┌───────────────────┐
        ⬇ Descargas:
➜ _.imagen | pinterest_ *texto*
➜ _.play | audio_ *titulo*
➜ _.video_ *titulo*
└───────────────────┘
┌───────────────────┐
        ⚙ Herramientas:
➜ _.ia | chatgpt_ *texto*
➜ _.tav_ *texto*
➜ _.s_
➜ _.toimg_
➜ _.hd_
➜ _.fuentes_ *texto*
➜ _.traducir es_ *texto en ingles*
➜ _.traducir en_ *texto en español*
└───────────────────┘
┌───────────────────┐
        💎 Spam Perfil:
➜ _.iguser_ *usuario* (sin @)
└───────────────────┘
┌───────────────────┐
        💎 Spam Global:
➜ _.spam_ *link* (no +18)
└───────────────────┘`;
    
    await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['mensu', 'mesnú'];
handler.tags = ['mesnu'];
handler.command = /^(menu|menú|help|ayuda)$/i;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
