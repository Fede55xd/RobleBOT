let handler = async (m, { conn, command, text }) => {
  let participants = text.trim().split(' ');

  if (participants.length !== 2) {
      throw 'Debes mencionar a dos participantes para el duelo.';
  }

  let player1 = participants[0];
  let player2 = participants[1];

  let story = [];

  const getRandomIntroduction = () => {
      let introductions = [
          `En la tierra de los dragones y las estrellas, ${player1} y ${player2} se preparan para un duelo que será recordado por generaciones. 🐉✨`,
          `Bajo el resplandor del sol naciente, ${player1} y ${player2} se enfrentan en una encrucijada de destinos. ☀️🌌`,
          `En el misterioso bosque encantado, ${player1} y ${player2} cruzan sus destinos en un enfrentamiento mágico. 🌲🔮`,
          `En la ciudad perdida de Atlantis, ${player1} y ${player2} despiertan antiguos poderes para un duelo legendario. 🏛️🌊`,
          `En las tierras de hielo eterno, ${player1} y ${player2} se enfrentan en una batalla bajo la aurora boreal. ❄️🌌`,
          `En el reino de las hadas, ${player1} y ${player2} se desafían en una danza mágica que decidirá el destino de la magia. 🧚🌟`,
          `En el valle de las sombras, ${player1} y ${player2} emergen de la oscuridad para luchar por el control de la noche. 🌑🌌`,
          `Bajo la luna llena, ${player1} y ${player2} se encuentran en un lugar donde los sueños y las pesadillas cobran vida. 🌕💫`,
          `En el antiguo templo de los vientos, ${player1} y ${player2} convocan fuerzas cósmicas para un enfrentamiento cósmico. 🌀🌌`,
          `En la tierra de las mariposas de fuego, ${player1} y ${player2} danzan entre las llamas en un duelo de pasión y poder. 🔥🦋`,
      ];

      return introductions[Math.floor(Math.random() * introductions.length)];
  };

  const getRandomEvent = () => {
      let events = [
          `${player1} canaliza la energía, desatando un poderoso ataque que impacta a ${player2}. 🔥`,
          `${player2} utiliza una habilidad astuta, evitando el ataque de ${player1}. 🤔`,
          `${player1} y ${player2} se unen para realizar un movimiento conjunto, fortaleciéndose y preparándose para el próximo intercambio. 🤝✨`,
          `${player2} desata una fuerza ancestral, causando estragos en ${player1}. 💥`,
          `Un fenómeno místico rodea a ${player1}, brindándole protección y restaurando su vitalidad. 🌟`,
          `${player1} y ${player2} se sumergen en un enfrentamiento estratégico, cada movimiento acompañado por la intensidad de la batalla. ⚔️`,
          `Una reliquia antigua otorga a ${player1} un poder increíble, infligiendo daño significativo a ${player2}. 🏛️`,
          `La magia de ${player2} confunde a ${player1}, haciéndolo vulnerable a un contraataque astuto. 🧙‍♂️`,
          `${player1} y ${player2} son transportados a un reino etéreo, donde la realidad se distorsiona con cada movimiento. 🌌`,
          `${player2} se conecta con la naturaleza, curándose y fortaleciéndose con la energía del entorno. 🌿`,
          `${player1} desata una fuerza elemental, causando un impacto que sacude a ${player2}. 🌪️`,
          `Un portal interdimensional se abre, permitiendo a ${player1} y ${player2} explorar otras realidades brevemente. 🌐`,
          `${player2} manipula el tiempo, alterando la velocidad de la batalla y afectando a ${player1}. ⏳`,
          `${player1} desencadena un cataclismo, infligiendo daño masivo a ${player2}. ☄️`,
          `${player2} invoca guardianes espirituales, protegiéndose y contraatacando con una explosión etérea. 👻`,
          `${player1} y ${player2} se sumergen en el río de la magia, revitalizándose en las corrientes místicas. 🌊`,
          `${player2} utiliza la alquimia ancestral para transformar las sombras en un escudo impenetrable y contraataca con un veneno mágico. ⚗️`,
          `Un eco del pasado resuena cuando ${player1} descubre un antiguo tomo de hechizos, amplificando sus poderes. 📜`,
          `${player2} desafía la gravedad, esquivando ataques mientras lanza rayos arcanos que afectan a ${player1}. ⚡`,
          `${player1} y ${player2} convocan espíritus elementales en una danza encantada, renovando sus fuerzas. 👻🌪️`,
      ];

      return events[Math.floor(Math.random() * events.length)];
  };

  // Conjunto de introducciones para evitar repeticiones
  let usedIntroductions = new Set();

  // Introducción
  let introduction;
  do {
      introduction = getRandomIntroduction();
  } while (usedIntroductions.has(introduction));
  usedIntroductions.add(introduction);
  story.push(introduction);

  // Conjunto de eventos para evitar repeticiones
  let usedEvents = new Set();

  // Realizar 10 turnos (capítulos)
  for (let chapter = 1; chapter <= 10; chapter++) {
      let event;
      do {
          event = getRandomEvent();
      } while (usedEvents.has(event));
      usedEvents.add(event);

      story.push(`\n*Capítulo ${chapter}:* ${event}`);
  }

  // Determinar al ganador
  let winner = Math.random() < 0.5 ? player1 : player2;

  // Crear el mensaje final
  let finalMessage = `*¡La batalla ha concluido!* 🏆\n\n`;

  story.forEach((event, index) => {
      finalMessage += event + '\n';
  });

  finalMessage += `\n*${winner} es el ganador de la pelea!* 🎉`;

  // Enviar el mensaje final
  await conn.reply(m.chat, finalMessage, m, m.mentionedJid ? { mentions: m.mentionedJid } : {});
};

handler.help = ['duelo @jugador1 @jugador2'];
handler.tags = ['game'];
handler.command = /^duelo/i;

export default handler;
