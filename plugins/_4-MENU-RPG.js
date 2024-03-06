let handler = async (m, { conn }) => {
    
    let user = global.db.data.users[m.sender] ||{};

    
    let rpgmenu = `𝐑𝐨𝐛𝐥𝐞𝐁𝐎𝐓 *MENÚ RPG*
*Hola @${m.sender.split('@')[0]},*
_Aquí tienes la lista de comandos._
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
💵 *RECOMPENSAS*   🪙
➜ _.cadadia_
➜ _.cadahora_
➜ _.suerte
└───────────────────┘
┌───────────────────┐
✈️ *AVENTURAS Y VIAJES*     🏜️
➜ _.aventura_
➜ _.viajar_
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
    
    await conn.reply(m.chat, rpgmenu, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['rpgmenu', 'rpg'];
handler.tags = ['rpg'];
handler.command = /^(rpg|rpgmenu)$/i;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
