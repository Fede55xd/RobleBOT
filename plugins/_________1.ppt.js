let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let message = `💼 *Saldo Disponible* 💼\n\n*Dinero*: ${user.money}\n*Banco*: ${user.bank}`;
    await conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['saldo'];
handler.tags = ['money'];
handler.command = /^(saldo)$/i;

export default handler;
