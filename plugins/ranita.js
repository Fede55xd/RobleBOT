//                      RANITA
//                👇 CRÉDITOS PARA 👇          
//                  👉  ROBLEUY 👈
//                                          
//               (robleuy) PROGRAMADOR
//
let cooldown = {};
let activeRace = {};

let handler = async (m, { conn, usedPrefix, text }) => {
  if (activeRace[m.sender]) return; 

  activeRace[m.sender] = true; 
  let { key } = await conn.sendMessage(m.chat, { text: "ranitaaaaaa" }, { quoted: m });

  const arrayWin = [
    "🚘\n•\n•\n•\n•\n•\n•\n•\n•\n•\n🐸",
    "•\n•\n🚘\n•\n•\n•\n•\n•\n🐸\n•\n•",
    "•\n•\n•\n•\n•\n🚘\n•\n🐸\n•\n•\n•",
    "•\n•\n•\n•\n•\n•\n🚘🐸\n•\n•\n•",
    "•\n•\n•\n•\n•\n•\n🐸\n🚘\n•\n•\n•",
    "•\n•\n•\n•\n•\n•\n🐸\n•\n🚘\n•",
"•\n•\n•\n•\n•\n•\n🐸\n•\n•\n🚘"
];

  const arrayLose = [
    "🚘\n•\n•\n•\n•\n•\n•\n•\n•\n•\n🐸",
    "•\n•\n🚘\n•\n•\n•\n•\n•\n🐸\n•\n•",
    "•\n•\n•\n•\n•\n🚘\n•\n🐸\n•\n•\n•",
    "•\n•\n•\n•\n•\n•\n🐸\n🚘\n•\n•\n•"
  ];
  const arrayPolice = [
    "🚘\n•\n•\n•\n•\n•\n•\n•\n•\n•\n🐸",
    "•\n•\n🚘\n•\n•\n•\n•\n•\n🐸\n•\n•",
    "•\n•\n•\n•\n•\n🚘\n•\n🐸\n•\n•\n•",
    "•\n•\n•\n•\n•\n•\n🐸\n🚘\n•\n•\n•"
  ];

  let randomNumber = Math.random();
  let arrayToUse;
  let message;
  if (randomNumber < 0.5) { 
    arrayToUse = arrayWin;
    message = '*Juego finalizado, la rana se salvo y ganaste 1000 RobleCoins.*\n\n_Si quieres jugar de nuevo espera 3 segundos._';

    global.db.data.users[m.sender].money += 1000;
  } else if (randomNumber < 0.8) { 
    arrayToUse = arrayLose;
    message = '*Juego finalizado, la rana no se salvo.*\n\n_Si quieres jugar de nuevo espera 3 segundos._';
  } else { 
    arrayToUse = arrayPolice;
    message = '*Juego finalizado, la rana no se salvo.*\n\n_Si quieres jugar de nuevo espera 3 segundos._';
  }

  for (let item of arrayToUse) {
    await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  let reply;
  if (cooldown[m.sender]) { 
    if (arrayToUse === arrayWin) { 
      reply = `⚠️ *AVISO* ⚠️\n*Se ha agotado el combustible y se está rellenando el tanque. Estará listo en ${cooldown[m.sender]} segundos.*`;
    } else if (arrayToUse === arrayLose) { 
      reply = `⚠️ *AVISO* ⚠️\n*el auto está siendo reparada debido a los graves daños por la explosión. Estará lista en ${cooldown[m.sender]} segundos.*`;
    } else if (arrayToUse === arrayPolice) { 
      reply = `⚠️ *AVISO* ⚠️\n*Estás siendo procesado por la policía. Tendrás que esperar ${cooldown[m.sender]} segundos.*`;
    }
  }

  cooldown[m.sender] = 3; 
  let interval = setInterval(() => {
    if (cooldown[m.sender] === 0) {
      clearInterval(interval);
      delete cooldown[m.sender];
    } else {
      cooldown[m.sender]--;
    }
  }, 1000);

  setTimeout(() => {
    delete activeRace[m.sender]; 
    if (reply) { 
      conn.reply(m.chat, reply, m);
    }
  }, cooldown[m.sender] * 1000);

  return conn.sendMessage(m.chat, { text: message, edit: key }, { quoted: m });
};

handler.help = ['ranitas', 'ranita'];
handler.tags = ['ranitaxd', 'ranita'];
handler.command = /^(ranita)$/i;

export default handler;
