let handler = async (m, { conn }) => {
    let topUsers = Object.entries(global.db.data.users).filter(([_, user]) => user.hasOwnProperty('money')).sort((a, b) => b[1].money - a[1].money).slice(0, 10);

    let emojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    let topInfo = `*🏆 Top 10 Usuarios con Más RobleCoins 🏆*\n\n${topUsers.map(([jid, user], i) => {
        return `${emojis[i]} *${'@' + jid.split('@')[0]}*\n*RobleCoins:* ${user.money}`;
    }).join('\n\n')}`;

    await conn.reply(m.chat, topInfo, null, { mentions: conn.parseMention(topInfo) });
}

handler.help = ['topcoins'];
handler.tags = ['profile'];
handler.command = /^(topcoins)$/i;
export default handler;
