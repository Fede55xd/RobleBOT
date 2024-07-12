let handler = async (m, { conn }) => {
    let topUsers = Object.entries(global.db.data.users).filter(([_, user]) => user.hasOwnProperty('kilometros')).sort((a, b) => b[1].kilometros - a[1].kilometros).slice(0, 10);

    let emojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    let topInfo = `*🏆 Top 10 Usuarios con Más Kilometros recorridos 🏆*\n\n${topUsers.map(([jid, user], i) => {
        return `${emojis[i]} *${'@' + jid.split('@')[0]}*\n*Kilometros:* ${user.kilometros}`;
    }).join('\n\n')}`;

    await conn.reply(m.chat, topInfo, null, { mentions: conn.parseMention(topInfo) });
}

handler.help = ['topkm'];
handler.tags = ['profile'];
handler.command = /^(topkm)$/i;
export default handler;
