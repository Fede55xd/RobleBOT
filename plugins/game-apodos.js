//Creditos a: RobleUY
let handler = async (m, { conn, command }) => {
  // para verificar si se mencionó a alguien
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
      return await conn.reply(m.chat, `*Debes mencionar a alguien para asignarle un apodo.*`, m);
  }

  // bueno esto es para obtener el JID mencionado
  let mentionedJid = m.mentionedJid[0];

  // para erificar si el JID mencionado es válido
  if (!mentionedJid) {
      return await conn.reply(m.chat, `El ID mencionado no es válido.`, m);
  }

  // lista de apodos graciosos
  let apodos = [
      "Profanador/a de heladeras",
      "Peter@",
      "Diabetic@",
      "Culo mimoso",
      "Manicero",
      "Gord@ Lind@",
      "Payasin",
      "Perr@ del grupo",
      "Mugrient@",
      "Ratita",
      "Sensible",
      "Loc@ pobre",
      "Loc@ millonari@",
      "Indefens@",
      "Estrellita",
      "Cara de sarten",
      "Mamahuevo",
      "Canceros@",
      "Idiota",
      "Guap@",
      "Cantante",
      "Traga sable",
      "Ingenier@",
      "Mentiros@",
      "Asesin@",
      "Bonit@",
      "Bot",
      "Copion/a",
      "Papelera",
      "Pajarit@",
      "Saltamontes",
      "Girasol",
      "Asqueroso por demas",
      "El/La que no sirve para nada",
      "Menorcit@",
      "Violin",
      "Violent@",
      // agrega más apodos aquí
  ];

  // elegir un apodo al azar
  let apodo = pickRandom(apodos);

  // para obtener el nombre mencionado
  let name = `@${mentionedJid.split('@')[0]}`;

  // para enviar el apodo a la persona mencionada
  try {
    await conn.reply(m.chat, `*El nuevo apodo de ${name} es: ${apodo}* 😄`, m, { contextInfo: { mentionedJid: [mentionedJid] } });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}

handler.help = ['apodo'];
handler.tags = ['diversión'];
handler.command = /^(apodo)$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
