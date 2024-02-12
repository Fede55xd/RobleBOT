let handler = async (m, { conn }) => {
    
    let user = global.db.data.users[m.sender] ||{};

    
    let entretenimiento = `𝐑𝐨𝐛𝐥𝐞𝐁𝐎𝐓 *ENTRETENIMIENTO*
*Hola @${m.sender.split('@')[0]},*
_Aquí tienes la lista de comandos._
┌───────────────────┐
🚀 * 👇ENTRETENIMIENTO 👇* 
└───────────────────┘
┌───────────────────┐
🏁 *JUEGOS DE CARRERAS* 🏁
➜ _.cmotos_
➜ _.cautos_
➜ _.ccaballos_
➜ _.cbicis_
➜ _.cpersonas_
└───────────────────┘
┌───────────────────┐
🏋️‍♂️ *JUEGOS DE DEPORTES* 🏃‍♀️
➜ _.penales_
└───────────────────┘
┌───────────────────┐
⌛ *JUEGOS DE RESPONDER:* ✍️
➜ _.antonimos_
➜ _.adivinarlab_
➜ _.encontrarlap_
➜ _.pregunta_
➜ _.ordenar_
➜ _.completarlap_
└───────────────────┘
┌───────────────────┐
🌍 *APRENDER ALGO NUEVO* 🗺️
➜ _.datocurioso_
➜ _.queprefieres_
└───────────────────┘
┌───────────────────┐
🪡 *JUEGOS DE % Y ACCIONES*  🛼
➜ _.love_ [ *nombre o @usuario* ]
➜ _.besar_ [ *nombre o @usuario* ]
➜ _.lindo_ [ *nombre o @usuario* ]
➜ _.linda_ [ *nombre o @usuario* ]
➜ _.calcular_ [ *nombre o @usuario* ] (%) 
➜ _.calcular2_ [ *nombre o @usuario* ] (CM)
➜ _.calcular3_ [ *nombre o @usuario* ] (num.)
└───────────────────┘`;
    
    await conn.reply(m.chat, entretenimiento, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['entretenimiento', 'juegos'];
handler.tags = ['herramientas'];
handler.command = /^(entretenimiento|jugar|juegos)$/i;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
