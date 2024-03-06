let handler = async (m, { conn }) => {
let usedPrefix = '';
    if (global.db.data.eventoActivo) {
        return m.reply("¡Ya se ha iniciado una prueba de eventos de catástrofes! Espera a que termine antes de iniciar otra.");
    }

    global.db.data.eventoActivo = true;
    conn.sendMessage(
        m.chat,
        "RobleUY -> Prueba de mensajes automáticos para eventos de catástrofes naturales",
        null,
        { contextInfo: null }
    );

    let intervalo = setInterval(() => {
        conn.sendMessage(
            m.chat,
            "RobleUY -> Prueba de mensajes automáticos para eventos de catástrofes naturales",
            null,
            { contextInfo: null }
        );
    }, 10000); // Activar cada 10 segundos

    setTimeout(() => {
        clearInterval(intervalo); // Detener la repetición después de 30 segundos
        delete global.db.data.eventoActivo;
    }, 30000); // Duración total de la prueba: 30 segundos
};

handler.command = /^pruebacatastrofes$/i;
handler.tags = ['game'];
handler.help = ['pruebacatastrofes'];
export default handler;
