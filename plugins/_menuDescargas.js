let handler = async (m, { conn, usedPrefix }) => {
  try {
    // Retrieve user data from global database
    let user = global.db.data.users[m.sender];

    // Menu text
    const menuText = `*_Menú de busquedas y descargas._*
    
*⊜ Nombre:* ${user.registered ? user.name : 'No registrado'}
*⊜ Registrado:* ${user.registered ? 'SI ✅' : `NO ❌ _Para registrarte usa:_ \`${usedPrefix}reg1 nombre edad\``}
*_comandos_*
⬇️⬇️⬇️⬇️
┃🚀➺ _${usedPrefix}imagen *texto*_
┃🚀➺ _${usedPrefix}play *titulo o link*_
┃🚀➺ _${usedPrefix}pinterest *texto*_
┃🔍➺ _${usedPrefix}google *texto*_
┃🔍➺ _${usedPrefix}letra | lirik *texto*_
┃🔍➺ _${usedPrefix}ytsearch | yts *texto*_`.trim();
    // Send the menu as a reply
    await conn.sendFile(m.chat, gataVidMenu.getRandom(), 'gata.mp4', menuText, m);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    throw error;
  }
};

handler.command = /^(menudyb)$/i;
export default handler;
