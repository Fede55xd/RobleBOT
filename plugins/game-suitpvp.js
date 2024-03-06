let handler = m => m
handler.before = async function (m) {
let pp = 'https://i.pinimg.com/236x/85/3e/3d/853e3d0c88d9f5179a9c1394bf7b93e6.jpg'
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
this.suit = this.suit ? this.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = ''
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|Aceptar|acerta|aceptar|gas|aceptare?|nao|Rechazar|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `${lenguajeGB['smsAvisoAG']()} @${room.p2.split`@`[0]} *Rechazo el PvP.*`
m.reply(textno, null, {mentions: this.parseMention(textno)})
delete this.suit[room.id]
return !0 }
room.status = 'play' 
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `${lenguajeGB['smsAvisoIIG']()}🎮 *El juego comienza ya!. Las opciones fueron enviadas a los chats de:*  @${room.p.split`@`[0]} 𝙔 @${room.p2.split`@`[0]}\n\n*Elijan una opcion y regresen al grupo.\n\n*Elegir opción en wa.me/${conn.user.jid.split`@`[0]}*`
m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)})
let comienzop = `${lenguajeGB['smsAvisoIIG']()}𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙎𝙀𝙇𝙀𝘾𝘾𝙄𝙊𝙉𝙀 𝙐𝙉𝘼 𝘿𝙀 𝙇𝘼𝙎 𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀𝙎 𝙊𝙋𝘾𝙄𝙊𝙉𝙀𝙎\n\nღ Piedra\nდ Papel\nღ Tijera\n\n*Responda al mensaje con la opción*`
let comienzop2 = `${lenguajeGB['smsAvisoIIG']()}𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙎𝙀𝙇𝙀𝘾𝘾𝙄𝙊𝙉𝙀 𝙐𝙉𝘼 𝘿𝙀 𝙇𝘼𝙎 𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀𝙎 𝙊𝙋𝘾𝙄𝙊𝙉𝙀𝙎\n\nღ Piedra\nღ Papel\nღ Tijera\n\n*Responda al mensaje con la opción*`
   
if (!room.pilih) this.sendMessage(room.p, { text: comienzop }, { quoted: fkontak })  
if (!room.pilih2) this.sendMessage(room.p2, { text: comienzop2 }, { quoted: fkontak })
room.waktu_milih = setTimeout(() => {
let iniciativa = `${lenguajeGB['smsAvisoAG']()}El Juego se cancela por falta de iniciativa por parte de los usuarios.`                              
if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, { text: iniciativa }, { quoted: fkontak })
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `${lenguajeGB['smsAvisoAG']()} @${(room.pilih ? room.p2 : room.p).split`@`[0]} *El juego termino, no elegiste ninguna opcion.*`
this.sendMessage(m.chat, { text: textnull }, { quoted: fkontak }, { mentions: this.parseMention(textnull) })
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete this.suit[room.id]
return !0
}, room.timeout)}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`✅  *Has elegido: *${m.text}, *Regresa al grupo y* ${room.pilih2 ? `*Observa los resultados.*` : '*Espera por los resultados*'}`) 
if (!room.pilih2) this.reply(room.p2, `${lenguajeGB['smsAvisoIIG']()}*Tu oponente ya selecciono una opcion.*`, fkontak, 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`✅ *Elegiste:* ${m.text}, *Ve al grupo y mira los resultados* ${room.pilih ? `*Observa los resultados*` : '*Espera los resultados.*'}`)
if (!room.pilih) this.reply(room.p, `${lenguajeGB['smsAvisoIIG']()}*Tu oponente ya selecciono una opcion.*`, fkontak, 0)}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true 

this.reply(room.asal, `🥳 *resultados*\n\n${tie ? '🥴 *EMPATE!!*' : ''} *@${room.p.split`@`[0]} (${room.text})* ${tie ? '' : room.p == win ? ` *GANASTE 🥳 ${room.poin} XP*` : ` *́PERDISTE 🤡 ${room.poin_lose} XP*`}
*@${room.p2.split`@`[0]} (${room.text2})* ${tie ? '' : room.p2 == win ? `*GANASTE 🥳 ${room.poin} XP*` : ` *́PERDISTE 🤡 ${room.poin_lose} XP*`}
`.trim(), m, { mentions: [room.p, room.p2] } )
if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete this.suit[room.id]}}
return !0
}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}
