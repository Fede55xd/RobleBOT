let handler = async (m, { conn, text, command, isAdmin }) => {
  if (command === 'spam') {
    if (!text || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(text)) {
      await conn.sendMessage(m.chat, {
        text: '*Por favor, proporciona un enlace válido. Ejemplo: https://www.youtube.com/*',
      }, { quoted: m });
      return;
    }

    let lastUsed = global.spamCommandUsage[m.sender] || 0;
    let now = Date.now();

    // Verifica si el usuario es admin o si ha pasado una hora desde el último uso
    if (!isAdmin && (now - lastUsed < 3600000)) {
      await conn.sendMessage(m.chat, {
        text: '*Solo puedes usar este comando una vez por hora.*',
      }, { quoted: m });
      return;
    }

    global.spamCommandUsage[m.sender] = now;  // Actualiza el tiempo de uso para el usuario

    let str = `📌 *@${m.sender.split("@")[0]}* compartió un enlace. 📎

✨ *Enlace:* ${text}
`;

    await conn.sendMessage(m.chat, {
      text: str,
      contextInfo: {
        mentionedJid: [m.sender],
      }
    }, { quoted: m });
  }
}

handler.command = /^spam/i;

// Inicializa el objeto global para rastrear el uso del comando
if (typeof global.spamCommandUsage === 'undefined') {
  global.spamCommandUsage = {};
}

export default handler;
