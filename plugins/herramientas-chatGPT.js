import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ organization: global.openai_org_id, apiKey: global.openai_key });
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (usedPrefix == 'a' || usedPrefix == 'A') return;
    if (!text) throw `*¡Uy, parece que lo usaste mal! 😱, Guíate de estos ejemplos para conversar con ChatGPT:*\n${usedPrefix + command} ¡Dame un top de 10 películas de comedia! 🍿\n${usedPrefix + command} ¿Qué es el amor? 💖`;

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        let sistema1 = `¡Hola, soy RobleBOT! 🌳`; 

        async function getOpenAIChatCompletion(texto) {
            const openaiAPIKey = global.openai_key;
            let chgptdb = global.chatgpt.data.users[m.sender];
            chgptdb.push({ role: 'user', content: texto });
            const url = "https://api.openai.com/v1/chat/completions";
            const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${openaiAPIKey}` };
            const data = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    { "role": "system", "content": sistema1 },
                    ...chgptdb.map(msg => ({ "role": msg.role, "content": `¡Hola, soy RobleBOT! 🌳 ${msg.content}` })) 
                ]
            };
            const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
            const result = await response.json();
            const finalResponse = result.choices[0].message.content;
            return finalResponse;
        };

        let respuesta = await getOpenAIChatCompletion(text);
        if (respuesta == 'error' || respuesta == '' || !respuesta) return '😅 ¡Ups, algo salió mal! Intenta de nuevo.'; 
        m.reply(`${respuesta}`.trim());
    } catch {
        try {
            const botIA222 = await openai.createCompletion({ model: 'text-davinci-003', prompt: text, temperature: 0.3, max_tokens: 4097, stop: ['Ai:', 'Human:'], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0 });
            if (botIA222.data.choices[0].text == 'error' || botIA222.data.choices[0].text == '' || !botIA222.data.choices[0].text) return '😅 ¡Ups, algo salió mal! Intenta de nuevo.'; 
            m.reply(botIA222.data.choices[0].text.trim());
        } catch {
            try {
                const syms1 = `¡Hola, soy RobleBOT! 🌳 ${text}`; 
                const Empireapi1 = await fetch(`https://api.cafirexos.com/api/chatgpt?text=${text}&name=${m.name}&prompt=${syms1}`);
                const empireApijson1 = await Empireapi1.json();
                if (empireApijson1.resultado == 'error' || empireApijson1.resultado == '' || !empireApijson1.resultado) return '😅 ¡Ups, algo salió mal! Intenta de nuevo.'; 
                m.reply(`${empireApijson1.resultado}`.trim());
            } catch {
               
            }
        }
    }
};

handler.command = /^(ia|roble|roblebot)$/i;
export default handler;