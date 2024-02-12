import similarity from 'similarity';

const threshold = 0.72;

let handler = m => m;

handler.before = async function (m) {
    let id = m.chat;

    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;

    this.tekateki = this.tekateki ? this.tekateki : {};

    if (!(id in this.tekateki)) return m.reply('¡Ese acertijo ya ha terminado!');

    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]));

        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            let user = global.db.data.users[m.sender];
            user.money += this.tekateki[id][2]; // Agregar dinero en lugar de exp
            m.reply(`*¡Respuesta correcta!* 🎉\n+${this.tekateki[id][2]} RobleCoins`);
            clearTimeout(this.tekateki[id][3]);
            delete this.tekateki[id];
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
            m.reply('¡Casi lo logras!');
        } else {
            m.reply('¡Respuesta incorrecta!');
        }
    }

    return !0;
};

handler.exp = 0;

export default handler;
