import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
let handler = async(m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `Falto el texto, ejemplo: *${usedPrefix + command} HOLAAA*`
let teks = encodeURI(text)

if (command == 'attp') {
let stiker = await sticker(null,`https://api.erdwpe.com/api/maker/attp?text=${teks}`,global.packname, global.author)
conn.sendFile(m.chat, stiker, null, { asSticker: true })}

if (command == 'ttp') {
let stiker = await sticker(null,`https://api.erdwpe.com/api/maker/ttp?text=${teks}`,global.packname, global.author)
conn.sendFile(m.chat, stiker, null, { asSticker: true })}
}
handler.command = handler.help = ['ttp', 'attp']
handler.tags = ['sticker']
export default handler



