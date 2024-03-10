let Handler = async (m, { conn }) => {

  let listaRangos = `*Lista de Rangos:*\n\n*Novato*\n*Aprendiz*\n*Soldado*\n*Cabo*\n*Sargento*\n*Teniente*\n*Capitan*\n*Comandante*\n*Coronel*\n*General*\n*Mariscal*\n*Vanguardia*\n*Elite*\n*Titan*\n*Leyenda*\n*Maestro*\n*SemiDios*\n*DIOS*`;

  await conn.reply(m.chat, listaRangos, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

Handler.help = ['ranks', 'rangos'];
Handler.tags = ['rango'];
Handler.command = /^rangos?$/i;

export default Handler;
