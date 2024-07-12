let handler = async (m, { conn, text }) => {
  try {
    if (!text) {
      console.error("Texto no proporcionado");
      return await conn.reply(
        m.chat,
        '*_Debes proporcionar dos opciones separadas por "o" después de ".elegir._*\n*Ejemplo: .elegir ser batman o escuchar música*',
        null,
        m
      );
    }

    // Separar las dos opciones usando el patrón " o "
    const opciones = text.split(" o ");

    // Verificar que haya exactamente dos opciones
    if (opciones.length !== 2) {
      console.error("Número incorrecto de opciones");
      return await conn.reply(
        m.chat,
        '*_Debes proporcionar exactamente dos opciones separadas por "o" después de ".elegir._*\n*Ejemplo: .elegir ser batman o escuchar música*',
        null,
        m
      );
    }

    // Elegir una de las opciones al azar
    const eleccion = Math.floor(Math.random() * opciones.length);
    const respuesta = opciones[eleccion];

    // Preparar mensaje con decoraciones y opciones
    const mensajeRespuesta = `
*🎮 ºOpciones:*
1. ${opciones[0]} 
2. ${opciones[1]} 

*Elegí*: ${respuesta} ${eleccion === 0 ? '' : ''}
`;

    console.log("Mensaje:", mensajeRespuesta);

    await conn.reply(m.chat, mensajeRespuesta.trim(), "markdown", { quoted: m });
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    throw error;
  }
};

handler.help = ["elegir"];
handler.tags = ["games"];
handler.command = /^(elegir)$/i;

export default handler;
