let handler = async (m, { conn }) => {
    
    let user = global.db.data.users[m.sender] ||{};

    


    let herramientas = `𝐑𝐨𝐛𝐥𝐞𝐁𝐎𝐓  • _*Menú completo*_ ☘️
*Hola @${m.sender.split('@')[0]},*
_Aquí tienes la lista de comandos._
┌───────────────────┐
[✓] _.creador_
└───────────────────┘
┌───────────────────┐
⚙️ *👇 HERRAMIENTAS 👇*  
      *Y DESCARGAS*  
└───────────────────┘
┌───────────────────┐
🏜️ *DESCARGAR IMAGENES*  🏜️
➜ _.imagen_ [ *texto* ]
➜ _.pinterest_ [ *texto* ]
└───────────────────┘
┌───────────────────┐
🎥 *DESCARGAR VIDEOS*   🎥 
➜ _.video_ [ *texto o link* ]
➜ _.videofast_ [ *texto o link* ]
└───────────────────┘
┌───────────────────┐
💽 *DESCARGAR AUDIOS*   🎧
➜ _.play_ [ *titulo o link* ]
➜ _.audio_ [ *titulo o link* ]
└───────────────────┘
┌───────────────────┐
🤳 *DESCARGAR APPS*     📱
➜ _.apk_ [ *nombre* ]
└───────────────────┘
┌───────────────────┐
🎴 *CREAR STICKERS*     🍭
➜ _.s | .sticker
➜ _.attp_ [ *texto* ]
➜ _.emojimix_ [ *emoji+emoji* ]
└───────────────────┘
┌───────────────────┐
🔊 *DE TEXTO A VOZ*     🗣️
➜ _.tav_ [ *texto* ]
└───────────────────┘
┌───────────────────┐
🆎 *MODIFICAR TEXTOS*   🔠
➜ _.fuentes_ [ *texto* ]
└───────────────────┘
┌───────────────────┐
❇️ *CREAR LOGOS*        🪄
➜ _.logo_
└───────────────────┘
┌───────────────────┐
✌️ *MEJORAR CALIDAD*    🔆
➜ _.hd_
└───────────────────┘
┌───────────────────┐
📷 *DE STICKER A IMÁGEN* 🖼️
➜ _.img_
└───────────────────┘
┌───────────────────┐
💬 *TRADUCTOR*           ✈️
➜ _.traducir_ [ *idioma  - texto* ]
└───────────────────┘
┌───────────────────┐
🤸 *MODO AFK (INACTIV@)*   🛌
➜ _.afk_ [ *motivo* ]
└───────────────────┘
┌───────────────────┐
🤳 *IAS (ChataGPT)*      🤖
➜ _.ia_ [ *texto* ] (ChataGPT) 🔴
➜ _.bard_ [ *texto* ] (Ia Bard)  🟢
└───────────────────┘
┌───────────────────┐
🚀 * 👇ENTRETENIMIENTO 👇* 
└───────────────────┘
┌───────────────────┐
🏁 *JUEGOS DE CARRERAS*   🏁
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
└───────────────────┘
┌───────────────────┐
🎢 * 👇FUNCIONES RPG 👇*    
└───────────────────┘
┌───────────────────┐
👥 *COMANDOS DE ROL*    💭
_realizar una acción 👇_
➜ _.me_ [ *texto* ]
_decir algo en general 👇_
➜ _.do_ [ *texto* ]
_decir algo a alguien específico 👇_
➜ _.decir_ [ *@usuario - texto* ]
└───────────────────┘
┌───────────────────┐
✈️ *AVENTURAS*           🏜️
➜ _.aventura_
└───────────────────┘
┌───────────────────┐
💵 *BANCO*              🏦
➜ _.depositar_ [ *cantidad | all* ]
➜ _.retirar_ [ *cantidad | all* ]
└───────────────────┘
┌───────────────────┐
🎲 *CASINO*             🎰
➜ _.apostar_ [ *cantidad | all* ]
➜ _.apostar2_ [ *color* ] 
└───────────────────┘
┌───────────────────┐
⛏️ *TRABAJOS*           👷
➜ _.trabajar | .work_ 
└───────────────────┘
┌───────────────────┐
🚨 *CRÍMENES*           🃏
➜ _.crimen | .crime_ 
➜ _.hackearcoins_ [ *@usuario*  ]
➜ _.hackearcriptos_ [ *@usuario* ]
└───────────────────┘
┌───────────────────┐
👩‍💻 *CRIPTOMONEDAS*   🪙
➜ _.comprarcriptos_ [ *cantidad* ]
➜ _.vendercriptos_ [ *cantidad | all* ]
└───────────────────┘
┌───────────────────┐
🪨 *RECURSOS*           🪵
➜ _.recursos_
➜ _.talar_
➜ _.minar_
➜ _.mvender all_
└───────────────────┘
┌───────────────────┐
⚙️ *HERRAMIENTAS RPG*   🎢
➜ _.addfriend_ [ *@usuario* ]
➜ _.delfriend_ [ *@usuario* ]
➜ _.rankup_  
➜ _.perfil_ 
➜ _.darcoins_ [ *@usuario - cantidad* ]
➜ _.topcoins_ 
└───────────────────┘`;
    
    await conn.reply(m.chat, herramientas, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['menuall', 'allmenu'];
handler.tags = ['menu'];
handler.command = /^(allmenu|allmenú)$/i;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
