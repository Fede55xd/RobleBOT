import TicTacToe from '../lib/tictactoe.js' 
let handler = async (m, { conn, usedPrefix, command, text }) => {
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}

conn.game = conn.game ? conn.game : {}
if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw `${lenguajeGB['smsAvisoAG']()}𝙏𝙊𝘿𝘼𝙑𝙄𝘼 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙀𝙎𝙏𝘼 𝙅𝙐𝙂𝘼𝙈𝘿𝙊 𝙀𝙉 𝙇𝘼 𝙎𝘼𝙇𝘼 𝙎𝙄 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘼𝘽𝘼𝙉𝘿𝙊𝙉𝘼𝙍 𝙀𝙎𝘾𝙍𝙄𝘽𝘼 *salir*\n𝙏𝘼𝙈𝘽𝙄𝙀𝙉 𝙋𝙐𝙀𝘿𝙀𝙎 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍 𝙇𝘼 𝙎𝘼𝙇𝘼 𝙐𝙎𝘼𝙉𝘿𝙊 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 *${usedPrefix}delttt*`
if (!text) throw `${lenguajeGB['smsAvisoFG']()}𝘿𝙀𝘽𝙀 𝘿𝙀 𝘼𝙂𝙍𝙀𝙂𝘼𝙍 𝙐𝙉 𝙉𝙊𝙈𝘽𝙍𝙀 𝘼 𝙇𝘼 𝙎𝘼𝙇𝘼\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} Sala GataBot*\n\n𝙔𝙊𝙐 𝙈𝙐𝙎𝙏 𝘼𝘿𝘿 𝘼 𝙉𝘼𝙈𝙀 𝙏𝙊 𝙏𝙃𝙀 𝙍𝙊𝙊𝙈\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} Room GataBot*`
let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true)) 
if (room) {
await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙎𝙀 𝙃𝘼 𝙐𝙉𝙄𝘿𝙊 𝘼 𝙇𝘼 𝙎𝘼𝙇𝘼 *${text}*\n𝙔𝘼 𝙋𝙐𝙀𝘿𝙀𝙉 𝙅𝙐𝙂𝘼𝙍!! 😼\n\n𝙎𝙊𝙈𝙀𝙊𝙉𝙀 𝙃𝘼𝙎 𝙅𝙊𝙄𝙉𝙀𝘿 𝙏𝙃𝙀 𝙍𝙊𝙊𝙈 *${text}*\n𝙔𝙊𝙐 𝘾𝘼𝙉 𝙋𝙇𝘼𝙔 𝙉𝙊𝙒!! 👀`, fkontak, m)
//await conn.sendButton(m.chat, `${lenguajeGB['smsAvisoEG']()}𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙎𝙀 𝙃𝘼 𝙐𝙉𝙄𝘿𝙊 𝘼 𝙇𝘼 𝙎𝘼𝙇𝘼 *${text}*\n𝙔𝘼 𝙋𝙐𝙀𝘿𝙀𝙉 𝙅𝙐𝙂𝘼𝙍!! 😼`, wm, null, [['𝙌𝙪𝙚 𝙂𝙖𝙣𝙚 𝙚𝙡 𝙈𝙚𝙟𝙤𝙧 🤝', '👻'] ], fkontak, m)
await conn.reply(m.chat, `${lenguajeGB['smsAvisoRG']()}⭕️ *Clásico Juego del Gato o 3 en raya* ❌\n\n*¿Cómo jugar?*\n_Responde al Juego con un Número, el mensaje debe contener la posiscion en la que quieras estar (1,2,3,4,5,6,7,8,9)_`, fkontak, m)
//await conn.sendButton(m.chat, `${lenguajeGB['smsAvisoRG']()}⭕️ *Clásico Juego del Gato o 3 en raya* ❌\n\n*¿Cómo jugar?*\n_Responde al Juego con un Número, el mensaje debe contener la posiscion en la que quieras estar (1,2,3,4,5,6,7,8,9)_\n\n*How to play?*\n_Answer the Game with a Number, the message must contain the position you want to be in (1,2,3,4,5,6,7,8,9)_`, wm, null, [['😽 𝙊𝙆 𝙂𝙍𝘼𝘾𝙄𝘼𝙎', 'ok'] ], fkontak, m)

room.o = m.chat
room.game.playerO = m.sender
room.state = 'PLAYING'
let arr = room.game.render().map(v => {
return {
X: '❎',
O: '⭕',
1: '1️⃣',
2: '2️⃣',
3: '3️⃣',
4: '4️⃣',
5: '5️⃣',
6: '6️⃣',
7: '7️⃣',
8: '8️⃣',
9: '9️⃣',
}[v]})
let str = `💖 𝙅𝙐𝙀𝙂𝙊 𝙏𝙍𝙀𝙎 𝙀𝙉 𝙍𝘼𝙔𝘼 | 𝙂𝘼𝙈𝙀
🫂 𝙅𝙐𝙂𝘼𝘿𝙊𝙍𝙀𝙎 *:* 𝙋𝙇𝘼𝙔𝙀𝙍𝙎
*┈┈┈┈┈┈┈┈┈*
❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}
*┈┈┈┈┈┈┈┈┈*
     ${arr.slice(0, 3).join('')}
     ${arr.slice(3, 6).join('')}
     ${arr.slice(6).join('')}
*┈┈┈┈┈┈┈┈┈*
𝙏𝙐𝙍𝙉𝙊 𝘿𝙀 *:* 𝙏𝙐𝙍𝙉 𝙊𝙁 
@${room.game.currentTurn.split('@')[0]}
`.trim()

if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str)}, { quoted: fkontak, m })
await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str)}, { quoted: fkontak, m })
        
} else {
room = {
id: 'tictactoe-' + (+new Date),
x: m.chat,
o: '',
game: new TicTacToe(m.sender, 'o'),
state: 'WAITING' }
        
if (text) room.name = text     
let imgplay = `https://img.freepik.com/vector-premium/juego-tres-raya-icono-contorno-lineal-neon_7280-2422.jpg`
conn.sendMessage(m.chat, { image: { url: imgplay }, caption: `😼 𝙅𝙐𝙀𝙂𝙊 𝙏𝙍𝙀𝙎 𝙀𝙉 𝙍𝘼𝙔𝘼 | 𝙂𝘼𝙈𝙀

🐈 𝙀𝙎𝙋𝙀𝙍𝘼𝙉𝘿𝙊 𝘼𝙇 𝙎𝙀𝙂𝙐𝙉𝘿𝙊 𝙅𝙐𝙂𝘼𝘿𝙊𝙍 𝙋𝙐𝙀𝘿𝙀 𝙄𝙉𝙂𝙍𝙀𝙎𝘼𝙍 𝙐𝙎𝘼𝙉𝘿𝙊 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊:
*${usedPrefix + command} ${text}*

𝙎𝙄 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘼𝘽𝘼𝙉𝘿𝙊𝙉𝘼𝙍 𝙇𝘼 𝙎𝘼𝙇𝘼 𝙐𝙎𝘼 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 *${usedPrefix}delttt*

𝙒𝘼𝙄𝙏𝙄𝙉𝙂 𝙁𝙊𝙍 𝙏𝙃𝙀 𝙎𝙀𝘾𝙊𝙉𝘿 𝙋𝙇𝘼𝙔𝙀𝙍 𝙔𝙊𝙐 𝘾𝘼𝙉 𝙀𝙉𝙏𝙀𝙍 𝙒𝙄𝙏𝙃 𝙏𝙃𝙀 𝘽𝙐𝙏𝙏𝙊𝙉 𝘽𝙀𝙇𝙊𝙒 𝙊𝙍 𝙐𝙎𝙄𝙉𝙂 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿
*${usedPrefix + command} ${text}*

𝙄𝙁 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝙇𝙀𝘼𝙑𝙀 𝙏𝙃𝙀 𝙍𝙊𝙊𝙈 𝙐𝙎𝙀 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 *${usedPrefix}delttt*` }, { mentions: conn.parseMention(text), quoted: fkontak })
/*conn.sendButton(m.chat, `😼 𝙅𝙐𝙀𝙂𝙊 𝙏𝙍𝙀𝙎 𝙀𝙉 𝙍𝘼𝙔𝘼 | 𝙂𝘼𝙈𝙀

🐈 𝙀𝙎𝙋𝙀𝙍𝘼𝙉𝘿𝙊 𝘼𝙇 𝙎𝙀𝙂𝙐𝙉𝘿𝙊 𝙅𝙐𝙂𝘼𝘿𝙊𝙍 𝙋𝙐𝙀𝘿𝙀 𝙄𝙉𝙂𝙍𝙀𝙎𝘼𝙍 𝘾𝙊𝙉 𝙀𝙇 𝘽𝙊𝙏𝙊𝙉 𝘿𝙀 𝘼𝘽𝘼𝙅𝙊 𝙊 𝙐𝙎𝘼𝙉𝘿𝙊 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 
*${usedPrefix + command} ${text}*

𝙎𝙄 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘼𝘽𝘼𝙉𝘿𝙊𝙉𝘼𝙍 𝙇𝘼 𝙎𝘼𝙇𝘼 𝙐𝙎𝘼 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 *${usedPrefix}delttt*


𝙒𝘼𝙄𝙏𝙄𝙉𝙂 𝙁𝙊𝙍 𝙏𝙃𝙀 𝙎𝙀𝘾𝙊𝙉𝘿 𝙋𝙇𝘼𝙔𝙀𝙍 𝙔𝙊𝙐 𝘾𝘼𝙉 𝙀𝙉𝙏𝙀𝙍 𝙒𝙄𝙏𝙃 𝙏𝙃𝙀 𝘽𝙐𝙏𝙏𝙊𝙉 𝘽𝙀𝙇𝙊𝙒 𝙊𝙍 𝙐𝙎𝙄𝙉𝙂 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿
*${usedPrefix + command} ${text}*

𝙄𝙁 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝙇𝙀𝘼𝙑𝙀 𝙏𝙃𝙀 𝙍𝙊𝙊𝙈 𝙐𝙎𝙀 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 *${usedPrefix}delttt*`, wm, imgplay, [['😎 𝙐𝙉𝙄𝙍𝙈𝙀 𝘼𝙇 𝙅𝙐𝙀𝙂𝙊 | 𝙅𝙊𝙄𝙉 𝙂𝘼𝙈𝙀', `${usedPrefix + command} ${text}`]], fkontak, m, { mentions: conn.parseMention(text) })*/
conn.game[room.id] = room
}}
handler.command = /^(tictactoe|ttc|ttt|xo)$/i
export default handler
