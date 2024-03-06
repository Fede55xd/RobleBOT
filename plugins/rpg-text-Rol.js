let handler = async (m, { conn, usedPrefix, command, args }) => {
    let user = global.db.data.users[m.sender];


    let bang = m.key.id; //Kurt18
    let delet = m.key.participant; //Kurt18


    if (command === 'me') {        
        if (!args[0]) {
            return m.reply(`*❌ Debes incluir un mensaje después del comando.*\n\nEjemplo: ${usedPrefix}me se choca con un auto`, null, { contextInfo: null });
        }
        let targetUser = m.sender;
        let message = `*@${m.sender.split('@')[0]} ${args.join(' ')}*`;


        //Kurt18 - Envia mensaje
        await conn.sendMessage(m.chat, { text: message, mentions: [m.sender, targetUser, ...m.mentionedJid]});
                
        //Kurt18 - elimina
        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: bang,
                participant: delet,
            },
        });

        return;
    }

    if (command === 'do') {
        if (!args[0]) {
            return m.reply(`*❌ Debes incluir un mensaje después del comando.*\n\nEjemplo: ${usedPrefix}do estás bien?`, null, { contextInfo: null });
        }
        let targetUser = m.sender;
        let message = `*@${m.sender.split('@')[0]} dice: ${args.join(' ')}*`;
        //return conn.reply(m.chat, message, m, m.mentionedJid ? { mentions: [m.sender, targetUser, ...m.mentionedJid] } : {});

        
        //Kurt18 - Envia mensaje
        await conn.sendMessage(m.chat, { text: message, mentions: [m.sender, targetUser, ...m.mentionedJid]});
        
        //Kurt18 - elimina
        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: bang,
                participant: delet,
            },
        });



    }

    if (command === 'decir') {
        if (!m.mentionedJid || args.length < 2) {
            return m.reply(`*❌ Debes mencionar a un usuario y proporcionar un mensaje.*\n\nEjemplo: ${usedPrefix}decir @usuario ¿Cuántos años tienes?`, null, { contextInfo: null });
        }
        let mentionedUser = m.mentionedJid[0];
        let targetUser = m.sender;
        let message = args.slice(1).join(' ');


        //await conn.reply(m.chat, `*@${mentionedUser.split('@')[0]} el usuario @${m.sender.split('@')[0]} te dijo: ${message}*`, null, { mentions: [mentionedUser, targetUser, ...m.mentionedJid] });

        
        //Kurt18 - Envia mensaje
        await conn.sendMessage(m.chat, { text: `*@${mentionedUser.split('@')[0]} el usuario @${m.sender.split('@')[0]} te dijo: ${message}*`, mentions: [m.sender, targetUser, ...m.mentionedJid]});
        
        //Kurt18 - elimina
        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: bang,
                participant: delet,
            },
        });

        return;
    }
}

handler.help = ['me <mensaje>', 'do <mensaje>', 'decir @usuario <mensaje>'];
handler.tags = ['juego', 'rol'];
handler.command = /^(me|do|decir)$/i;
export default handler;
