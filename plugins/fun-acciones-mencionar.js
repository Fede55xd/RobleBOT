let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text)
      throw `*Para usar este comando tienes que etiquetar a alguien o escribir un texto.*\n\n_Ejemplos:_\n.love @usuario\n.besar a mi novi@`;

  // --------------------------
  if (command == "love") {
      let juego =
          `(っ◔◡◔)っ *Medidor de Amor* 💘\n \n*♡ @${m.sender.split('@')[0]} y ${text} se aman un ${(100).getRandom()}% ♡*\n
  ░░▄███▄███▄ 
  ░░█████████ 
  ░░▒▀█████▀ 
  ░░▒░░▀█▀ `.trim();

      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );

  }

  // --------------------------
  if (command == "besar") {
      let juego =
          `*@${m.sender.split('@')[0]} beso 😙 a ${text}*`.trim();

      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );

  }
  // -----------------

  if (command == "calcular") {
      let juego =
          `*${text}* *--> Resultado:* *${(100).getRandom()}%*
  `.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // ------------------------

  if (command == "calcular2") {
      let juego =
          `*${text}* *--> Resultado:* *${(100).getRandom()} CM*
  `.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // -----------------------

  if (command == "calcular3") {
      let juego =
          `*${text}* *--> Resultado:* *${(100).getRandom()}*
  `.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // --------------------------
    if (command == "lindo") {
      let juego =
          `*${text}* *es* *${(100).getRandom()}% lindo* 😍
`.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // ------------------------

  if (command == "linda") {
      let juego =
          `*${text}* *es* *${(100).getRandom()}% linda* 😍
`.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }

  // ---------------
};
handler.help = [
  "calcular",
  "calcular2",
  "calcular3",
  "love",
  "besar",
  "lindo",
  "linda",
].map((v) => v + " @tag | nombre");
handler.tags = ["calculator"];
handler.command =
  /^love|calcular|calcular2|calcular3|besar|lindo|linda/i;
handler.exp = 0;
export default handler;