let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];

  // Verificar si 'ubiactual' está definido y tiene la propiedad 'ubicacion'
  if (!user.ubiactual || !user.ubiactual.ubicacion || user.ubiactual.ubicacion.toLowerCase() !== 'minas') {
      return await conn.reply(m.chat, '*⚠️ Debes estar en el warp "Minas" para minar.*\nUsa *.warp Minas* para ir.', m, { contextInfo: null });
  }

  let timeDiff = new Date() - user.lastMine;
  let waitTime = 10;

  if (timeDiff < waitTime)
      return await conn.reply(m.chat, `*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE MINAR NUEVAMENTE.*`, m, { contextInfo: null });

  let minerales = [
      { nombre: "oro", rareza: 15, emoji: "💰", min: 4, max: 8 },
      { nombre: "diamante", rareza: 10, emoji: "💎", min: 1, max: 5 },
      { nombre: "plata", rareza: 18, emoji: "🥈", min: 10, max: 15 },
      { nombre: "piedra", rareza: 20, emoji: "🪨", min: 50, max: 100 },
  ];

  // Obtener el factor de aumento basado en el rango del usuario
  let factorAumentoRango = obtenerFactorAumentoRango(user.uprank.rango);

  // Obtener el factor de aumento basado en el nivel del pico
  let factorAumentoPico = obtenerFactorAumentoPico(user.pico);

  let recursosConseguidos = `*@${m.sender.split('@')[0]} (${user.uprank.rango}), fuiste a minar con un pico de nivel ${user.pico} y conseguiste:*\n\n`;

  // Calcular porcentaje de ganancia adicional y aplicarlo
  minerales.forEach(recursoAleatorio => {
      let cantidadAleatoria = Math.floor(Math.random() * (recursoAleatorio.max - recursoAleatorio.min + 1)) + recursoAleatorio.min;

      // Calcular ganancia adicional basada en el nivel del pico
      let gananciaAdicionalPico = cantidadAleatoria * (factorAumentoPico - 1);

      // Redondear a un número entero
      gananciaAdicionalPico = Math.round(gananciaAdicionalPico);

      // Agregar la ganancia adicional al total obtenido
      cantidadAleatoria += gananciaAdicionalPico;

      // Aplicar el factor de aumento basado en el rango del usuario
      cantidadAleatoria *= factorAumentoRango;

      // Redondear a un número entero
      cantidadAleatoria = Math.round(cantidadAleatoria);

      // Agregar los recursos obtenidos al inventario del usuario
      user[`rpg${recursoAleatorio.nombre}`] += cantidadAleatoria;

      recursosConseguidos += `+${cantidadAleatoria} ${recursoAleatorio.emoji} ${recursoAleatorio.nombre.charAt(0).toUpperCase() + recursoAleatorio.nombre.slice(1)}\n`;
  });

  // Mostrar el aumento por rango y por nivel del pico al final del mensaje
  let aumentoPorRango = `Aumento por tu rango: ${Math.floor((factorAumentoRango - 1) * 100)}%`;
  let aumentoPorPico = `Aumento por nivel del pico: ${Math.floor((factorAumentoPico - 1) * 100)}%`;

  // Actualizar el tiempo de la última minería al final de la función
  user.lastMine = new Date();

  let profileInfo = `${recursosConseguidos}\n${aumentoPorRango}\n${aumentoPorPico}`;

  return await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = /^(minar)$/i;
export default handler;

// Función para obtener el factor de aumento basado en el rango del usuario
function obtenerFactorAumentoRango(rango) {
    switch (rango) {
        case 'Novato':
            return 1.0;
        case 'Aprendiz':
            return 1.1; // Aumento del 10%
        case 'Soldado':
            return 1.2; // Aumento del 20%
        case 'Cabo':
            return 1.3; // Aumento del 30%
        case 'Sargento':
            return 1.4; // Aumento del 40%
        case 'Teniente':
            return 1.5; // Aumento del 50%
        case 'Capitan':
            return 1.6; // Aumento del 60%
        case 'Comandante':
            return 1.7; // Aumento del 70%
        case 'Coronel':
            return 1.8; // Aumento del 80%
        case 'General':
            return 1.9; // Aumento del 90%
        case 'Mariscal':
            return 2.0; // Aumento del 100%
        case 'Vanguardia':
            return 2.1; // Aumento del 110%
        case 'Elite':
            return 2.2; // Aumento del 120%
        case 'Titan':
            return 2.3; // Aumento del 130%
        case 'Leyenda':
            return 2.4; // Aumento del 140%
        case 'Maestro':
            return 2.5; // Aumento del 150%
        case 'SemiDios':
            return 2.6; // Aumento del 160%
        case 'DIOS':
            return 3.0; // Aumento del 200%
        default:
            return 1.0; // Sin aumento por defecto
    }
}

// Función para obtener el factor de aumento basado en el nivel del pico
function obtenerFactorAumentoPico(nivelPico) {
    // Aumento del 5% por nivel, máximo 100 niveles
    // El primer nivel no tiene aumento
    return 1.0 + ((nivelPico - 1) * 0.05);
}
