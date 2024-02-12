//                CARRERA DE PERSONAS
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
  let { key } = await conn.sendMessage(m.chat, { text: "La carrera ha comenzado" }, { quoted: m });

  const arrayWin = [
    "🏁|==========🏃", "🏁|=========🏃", "🏁|========🏃", "🏁|=======🏃", "🏁|======🏃", "🏁|=====🏃", "🏁|====🏃", "🏁|===🏃", "🏁|==🏃", "🏁|=🏃", "🏁|🏃"
  ];
  const arrayLose = [
    "🏁|==========🏃", "🏁|=========🏃", "🏁|========🏃", "🏁|=======🏃", "🏁|=====⛈️🏃"
  ];
  const arrayPolice = [
    "🏁|==========🏃", "🏁|=========🏃", "🏁|========🏃", "🏁|=======🏃", "🏁|======🏃", "🏁|======🏃", "🏁|======👱‍♂️🚕", "🏘️|======👱‍♂️🚕", "🏘️|====👱‍♂️🚕", "🏘️|===👱‍♂️🚕", "🏘️|==👱‍♂️🚕", "🏘️|=👱‍♂️🚕",  "🏘️|👱‍♂️"
  ];

  let randomNumber = Math.random();
  let arrayToUse;
  let message;
  if (randomNumber < 0.5) { 
    arrayToUse = arrayWin;
    message = `🏁 *Carrera Finalizada* 🏁\n*Resultado: 🎊 ¡VICTORIA!* 🎊\n*Ganaste 1000 RobleCoins.*\n\n_Si quieres jugar de nuevo espera 3 segundos._`;
    // Sumar 1000 a la variable "money" en caso de ganar
    global.db.data.users[m.sender].money += 1000;
  } else if (randomNumber < 0.8) { 
    arrayToUse = arrayLose;
    message = '🏁 *Carrera Finalizada* 🏁\n*Resultado: Te alcanzó una tormenta y no pudiste continuar la carrera*\n\n_Si quieres jugar de nuevo espera 3 segundos._';
  } else { 
    arrayToUse = arrayPolice;
    message = '🏁 *Carrera Finalizada* 🏁\n*Resultado: ¡Te aburriste y llamaste un taxi para irte a tu casa*\n\n_Si quieres jugar de nuevo espera 3 segundos._';
  }

  for (let item of arrayToUse) {
    await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 300));
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
  }, cooldown[m.sender] * 1000);

  return conn.sendMessage(m.chat, { text: message, edit: key }, { quoted: m });
};

handler.help = ['cpersona', 'cpersonas'];
handler.tags = ['cpersonas', 'cpersonadi'];
handler.command = /^(cpersonas)$/i;

export default handler;
