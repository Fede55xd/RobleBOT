
let handler = async (m, { conn }) => {
  try {
    // El texto del suiciddio
    const suicidio = `
*Te has suicidado correctamente.*
`;

    // Enviar el suicidio como respuesta
    await conn.reply(m.chat, suicidio, 'markdown', { quoted: m });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    throw error;
  }
};

handler.help = ['suicidarse'];
handler.tags = ['games'];
handler.command = /^(suicidarse)$/i;

export default handler;