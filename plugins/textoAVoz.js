import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

const defaultLang = 'es'
let handler = async (m, { conn, args, usedPrefix, command }) => {

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted?.text) text = m.quoted.text

    let res
    try { res = await tav(text, lang) }
    catch (e) {
        m.reply(e + '')
        text = args.join(' ')
        if (!text) throw `${lenguajeGB['smsAvisoMG']()}${m.quoted?.text}\n*${usedPrefix + command} es RoblBOT*`
        await conn.sendPresenceUpdate('recording', m.chat)
        res = await tav(text, defaultLang)
    } finally {
        if (res) conn.sendFile(m.chat, res, 'tav.opus', null, m, true)
    }
}
handler.help = ['tav <lang> <teks>']
handler.tags = ['tools']
handler.command = /^tav$/i
export default handler

function tav(text, lang = 'es') {
    console.log(lang, text)
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang)
            let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav')
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath))
                unlinkSync(filePath)
            })
        } catch (e) { reject(e) }
    })
}
