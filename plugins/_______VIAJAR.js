let cooldowns = {}; // Definición del objeto cooldowns

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
  let fkontak = { 
      "key": { 
          "participants": "0@s.whatsapp.net", 
          "remoteJid": "status@broadcast", 
          "fromMe": false, 
          "id": "Halo" 
      }, 
      "message": { 
          "contactMessage": { 
              "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
          } 
      }, 
      "participant": "0@s.whatsapp.net" 
  };

  const cooldownTime = 15000; // 15 segundos
  const lastUsed = cooldowns[m.sender] || 0;
  const now = Date.now();

  if (now - lastUsed < cooldownTime) {
      let remainingTime = Math.ceil((cooldownTime - (now - lastUsed)) / 1000);
      return m.reply(`⏳ *Espera ${remainingTime} segundos antes de usar el comando nuevamente.*`, null, { contextInfo: fkontak });
  }

  // Actualizar el tiempo de la última vez que el usuario usó el comando
  cooldowns[m.sender] = now;

  if (command === 'viajar') {
    // Obtener la cantidad de nafta y kilómetros desde la base de datos
    let nafta = global.db.data.users[m.sender].nafta || 0;
    let kilometrosRecorridos = global.db.data.users[m.sender].kilometros || 0;

    // Obtener la cantidad de kilómetros a recorrer desde los argumentos
    let kilometrosARecorrer = parseInt(args[0]);

    if (isNaN(kilometrosARecorrer) || kilometrosARecorrer <= 0) {
      return m.reply('🚫 Por favor, ingresa una cantidad válida de kilómetros a recorrer.');
    }

    // Verificar si hay suficiente nafta para recorrer la distancia solicitada
    if (kilometrosARecorrer > nafta) {
      return m.reply(`⛽ No tienes suficiente nafta para recorrer ${kilometrosARecorrer} kilómetros. Tienes ${nafta} litros de nafta.`);
    }

    // Actualizar la distancia recorrida y la nafta en la base de datos
    global.db.data.users[m.sender].kilometros = kilometrosRecorridos + kilometrosARecorrer;
    global.db.data.users[m.sender].nafta -= kilometrosARecorrer;

    return m.reply(`*🚙 Has recorrido ${kilometrosARecorrer} kilómetros.*\n_En total, has recorrido ${global.db.data.users[m.sender].kilometros} kilómetros._\n_Quedan ${global.db.data.users[m.sender].nafta} litros de nafta._`, null, { contextInfo: fkontak });
  }

  if (command === 'buynafta') {
    // Obtener la cantidad de nafta a comprar
    let cantidad = parseInt(args[0]);
    let precioPorLitro = 10000;

    if (isNaN(cantidad) || cantidad <= 0) {
      return m.reply('🚫 Por favor, ingresa una cantidad válida de nafta a comprar.');
    }

    // Obtener el dinero del usuario
    let dinero = global.db.data.users[m.sender].money || 0;

    // Calcular el costo total de la nafta
    let costoTotal = cantidad * precioPorLitro;

    // Verificar si el usuario tiene suficiente dinero
    if (dinero < costoTotal) {
      return m.reply('💸 No tienes suficiente dinero para comprar esa cantidad de nafta.');
    }

    // Actualizar el dinero del usuario y la cantidad de nafta
    global.db.data.users[m.sender].money -= costoTotal;
    global.db.data.users[m.sender].nafta = (global.db.data.users[m.sender].nafta || 0) + cantidad;

    return m.reply(`🛢️ Has comprado ${cantidad} litros de nafta.\n_El costo total es ${costoTotal}._\n_Tu saldo actual es ${global.db.data.users[m.sender].money}._\n_Tienes ${global.db.data.users[m.sender].nafta} litros de nafta._`);
  }
}

handler.help = ['viajar', 'buynafta'];
handler.tags = ['games', 'economy'];
handler.command = /^(viajar|buynafta)$/i;
export default handler;
