import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  let user = db.data.users[m.sender]
  let time = user.lastmining + 5000 // cool down de 5 segundos

  if (new Date - user.lastmiming < 5000) return await conn.reply(m.chat, `❌ *ERROR* ❌\n_Espera unos segundos para usar este comando nuevamente._`, m)

  try {
    // Asegurémonos de que la propiedad user.money esté presente
    if (!isNumber(user.money)) user.money = 15000;

    // Establecer el costo del sticker en 1000 monedas
    const cost = 0;

    // Verificar si el usuario tiene suficientes monedas
    if (user.money < cost) {
      return m.reply(`❌ *ERROR* ❌\n_No tienes suficientes monedas para crear un sticker._\n_Necesitas al menos ${cost} monedas._\n_Tu saldo actual es de:_ *${user.money}* _monedas._`);
    }

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('❌ *ERROR* ❌\n_El vídeo no puede durar más de 6 segundos._')
      let img = await q.download?.()
      if (!img) throw `❌ *ERROR* ❌\n_Para crear un sticker debes responder a una imagen, vídeo (no + de 6 segundos), gif o un enlace tipo .jpg_`

      let out
      try {
        stiker = await sticker(img, false, global.packname, global.author)
      } catch (e) {
        console.error(e)
      } finally {
        // Solo aplicar cool down si el sticker se crea con éxito
        user.lastmiming = new Date * 1;

        /*await conn.reply(m.chat, `✅ *ÉXITO* ✅\n_Se han descontado ${cost} monedas de tu saldo por la creación del sticker._\n\n_Recuerda usar:_\n${usedPrefix}menu para ver las demás funciones.`, m);*/

        // Restar las monedas al usuario
        user.money -= cost;

        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, global.packname, global.author)
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else return m.reply('❌ *ERROR* ❌\n_URL inválido_')
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)
    else throw '❌ *ERROR* ❌\n_Para crear un sticker debes responder a una imagen, vídeo (no + de 6 segundos), gif o un enlace tipo .jpg_'
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}
