const comandosGenerales = /piedra|papel|tijera|estado|verificar|code|jadibot --code|--code|creadora|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|reg1|nombre|name|nombre2|name2|edad|age|edad2|age2|genero|género|gender|identidad|pasatiempo|hobby|identify|finalizar|pas2|pas3|pas4|pas5|registroc|deletesesion|registror|jadibot/i;

const comandosPersonalizados = [
  "darmedalla",
  "pescar",
  "llaves"
  "abrircaja",
  "aventura",
  "viajar",
  "talar",
  "suerte",
  "minar",
  "pareja",
  "carreras",
  "aceptar",
  "rechazar",
  "terminar",
  "clima",
  "mipareja",
  "golf",
  "suerte",
  "viajar",
  "roble",
  "roblebot",
  "apostar2",
  "carreras",
  "penales",
  "cautos",
  "cpersonas",
  "cmotos",
  "cbicis",
  "ccaballos",
  "do",
  "apostar2",
  "decir",
  "me",
  "besar",
  "ruleta",
  "lindo",
  "linda",
  "aventura",
  "salud",
  "curar",
  "mvender",
  "mvender all",
  "entretenimiento",
  "allmenu",
  "descargas",
  "herramientas",
  "rpg",
  "rpgmenu",
  "creador",
  "tav",
  "fuentes",
  "videofree",
  "myp",
  "buyp",
  "protecciones",
  "remoji",
  "minar",
  "recursos",
  "talar",
  "tala",
  "golf",
  "fb",
  "facebook",
  "ig",
  "instagram",
  "google",
  "search",
  "internet",
  "logo",
  "wikipedia",
  "apk",
  "antonimos",
  "antónimos",
  "queprefieres",
  "datocurioso",
  "adivinarlab",
  "completarlap",
  "encontrarlap",
  "love",
  "audio",
  "dlpinterest",
  "pinterestdl",
  "preguntas",
  "bard",
  "toimg",
  "jpg",
  "iavoz",
  "lindo",
  "linda",
  "felizcumple",
  "calcular",
  "calcular2",
  "calcular3",
  "chapar",
  "golpear",
  "disparar",
  "trad",
  "traducir",
  "trivia",
  "pregunta",
  "palabra",
  "ordenar",
  "crímen",
  "chatgpt",
  "calc",
  "hackearcoins",
  "hackearcriptos",
  "imagenia",
  "iaimagen",
  "friends",
  "amigos",
  "addfriend",
  "img",
  "delfriend",
  "siono",
  "/",
  "#",
  ".",
  "menu",
  "cadahora",
  "cadadia",
  "crimen",
  "crime",
  "todos",
  "notify",
  "invocar",
  "hidetag",
  "robar",
  "m",
  "iguser",
  "menú",
  "ayuda",
  "help",
  "depositar",
  "depositar all",
  "retirar",
  "retirar all",
  "apostar",
  "apostar all",
  "work",
  "afk",
  "on",
  "off",
  "trabajar",
  "crime",
  "hackearcoins",
  "darcoins",
  "topcoins",
  "perfil",
  "comprarcripto",
  "vendercripto",
  "vendercripto all",
  "rankup",
  "rankup all",
  "sticker",
  "s",
  "attp",
  "hd",
  "play",
  "video",
  "imagen",
  "pinterest",
  "ia",
  "emojimix"
];

export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner, usedPrefix, command }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (!m.message) return !0;


  if (m.isGroup) {
    if (
      m.text.startsWith("/") ||
      m.text.startsWith(".") ||
      m.text.startsWith("#") 
    ) {
      const comando = m.text.slice(1).trim().split(" ")[0].toLowerCase();
  
      if (comandosGenerales.test(comando) || comandosPersonalizados.includes(comando)) {
        console.log(`Comando: ${comando}`);
      } else {
        await conn.reply(m.chat, `_Lo siento_ *@${m.sender.split('@')[0]}*, _pero ese comando no_ _existe._\n_Utiliza_ *.menu* _para ver la lista de comandos._`, m, { mentions: [m.sender] });
      }
  
    }
    return !1
  }



    let chat, user, bot, mensaje;
    chat = global.db.data.chats[m.chat];
    user = global.db.data.users[m.sender];
    bot = global.db.data.settings[this.user.jid] || {};

    if (bot.antiPrivate && !isOwner && !isROwner) {
      if (user.counterPrivate === 0) {
        mensaje = `_Hola_ *@${m.sender.split`@`[0]}*, _Este bot solo puede ser utilizado en los grupos asignados por mi creador RobleUY._\n_Grupo oficial de_ _*RobleBOT*_: https://chat.whatsapp.com/HoYx0dhtoTXIOIthHbwDsZ

Advertencia #1
Si tienes 3 advertencias serás bloquead@.`;
        await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] });
      } else if (user.counterPrivate === 1) {
        let grupos = ["nn", "nnn", "nnnt", "nnntt", "nnnttt"].getRandom();
        mensaje = `_Hola_ *@${m.sender.split`@`[0]}*, _Este bot solo puede ser utilizado en los grupos asignados por mi creador RobleUY._\n_Grupo oficial de_ _*RobleBOT*_: https://chat.whatsapp.com/HoYx0dhtoTXIOIthHbwDsZ

Advertencia #2
Si tienes 3 advertencias serás bloquead@.`;
        await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] });
      } else if (user.counterPrivate === 2) {
        mensaje = `⚠️ *ADVERTENCIA* ⚠️
_Serás bloquead@_

*Razón:* Obtener 3 advertencias por escribir en este chat privado.

_El BOT solo puede ser utilizado en los grupos asignados por mi creador RobleUY. Te recomiendo unirte a este grupo para que puedas utilizarlo._
https://chat.whatsapp.com/HoYx0dhtoTXIOIthHbwDsZ

*Si tienes problemas contacta a mi creador:*

Número: Wa.me/+59893900470`;
        await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] });

        user.counterPrivate = -1;
        await this.updateBlockStatus(m.sender, 'block'); //Bloquea usuario
      }
      user.counterPrivate++;
    }
    return !1; 
}
