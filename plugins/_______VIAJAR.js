// Créditos a RobleUY
let destinos = [
  { nombre: "París,	Francia", descripcion: "La ciudad del amor y las luces.", imagen: "https://i.pinimg.com/736x/d1/dc/d9/d1dcd98923e5e6298a98d85c4b16e642.jpg" },
  { nombre: "Tokio, Japón", descripcion: "La vibrante capital de Japón.", imagen: "https://i.pinimg.com/736x/08/be/27/08be27f6ae638d649543d1784cbe90fa.jpg" },
  { nombre: "Nueva York, Estados Unidos", descripcion: "La ciudad que nunca duerme.", imagen: "https://i.pinimg.com/736x/8d/1e/11/8d1e11b6fbd84bea73d35ba5e06e2ce4.jpg" },
  { nombre: "Roma, Italia", descripcion: "Cuna de la antigua civilización romana.", imagen: "https://i.pinimg.com/736x/29/74/18/297418b70fdaab9e6bf0d4bd84b64c89.jpg" },
];

let handler = async (m, { conn, text, command }) => {
  if (command === 'viajar') {
    let destino = destinos[Math.floor(Math.random() * destinos.length)];

    let str = `✈️ *Viajeros* ✈️

📌 *@${m.sender.split("@")[0]}*
*ha viajado a ${destino.nombre}.* 🌍

👇 *Detalles del destino:*
*Nombre:* ${destino.nombre}
*Descripción:* ${destino.descripcion}

Buen viaje! 🌟`;

    let response = await fetch(destino.imagen);
    let buffer = await response.arrayBuffer();
    let thumbnailBase64 = Buffer.from(buffer).toString('base64');

    await conn.sendMessage(m.chat, {
      text: str,
      contextInfo: {
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: [m.sender],
        "externalAdReply": {
          "showAdAttribution": true,
          "renderLargerThumbnail": true,
          "thumbnail": thumbnailBase64,
          "title": `RobleBOT`,
          "containsAutoReply": true,
          "mediaType": 1,
        }
      }
    });
  }
}

handler.command = /^viajar/i;
export default handler;
