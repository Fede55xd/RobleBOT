import fs from 'fs'

let timeout = 10000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavía hay un juego sin terminar en este chat', conn.tekateki[id][0])
        throw false
    }
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/emojis.json`))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let _clue = json.response
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `
ⷮ ${json.question}

💫 Tienes 10 segundos para responder a este mensaje con el mismo emoji ✅

*• Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*• Bono:* +${poin} RobleCoins
`.trim()
    conn.tekateki[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!\n*La respuesta es:* ${json.response}`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}

handler.help = ['emoji']
handler.tags = ['game']
handler.command = /^(remoji)$/i

export default handler
