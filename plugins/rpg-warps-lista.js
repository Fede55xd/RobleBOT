let Handler = async (m, { conn }) => {

  let mensaje = `*Lista de Warps Disponibles:*\n\n⛏️ Minas\n🎣 Pesca\n🗝️ Llaves\n🏠 Lobby`;

  await conn.reply(m.chat, mensaje, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

Handler.help = ['warps'];
Handler.tags = ['warp'];
Handler.command = /^warps$/i;

export default Handler;
