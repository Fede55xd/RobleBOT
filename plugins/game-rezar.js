let handler = async (m, { conn }) => {
  try {
    // El texto del Padre Nuestro
    const padreNuestro = `
🙏✝️ *Reza un padre nuestro* ✝️🙏

*Padre nuestro que estás en el cielo*
*santificado sea tu nombre*
*venga a nosotros tu reino*
*hágase tu voluntad*
*en la tierra como en el cielo*
*Danos hoy nuestro pan de cada día*
*perdona nuestras ofensas*
*como también nosotros perdonamos*
*a los que nos ofenden*
*no nos dejes caer en la tentación*
*y líbranos del mal. Amén.*

*Ahora tu alma está totalmente purificada y liberada del mal. ☺️✝️*
`;

    // Enviar el Padre Nuestro como respuesta
    await conn.reply(m.chat, padreNuestro, 'markdown', { quoted: m });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    throw error;
  }
};

handler.help = ['rezar'];
handler.tags = ['games'];
handler.command = /^(rezar)$/i;

export default handler;
