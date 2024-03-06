let handler = async (m, { conn, text, args, command }) => {
    if (!text) throw '*✖️ ERROR ✖️*\n_Debes proporcionar un color y texto para crear el sticker._\n*Ejemplo: .cstr rojo hola*';

    const colorMap = {
        rojo: 'FF0000',
        verde: '00FF00',
        azul: '0000FF',
        negro: '000000',
        blanco: 'FFFFFF',
        amarillo: 'FFFF00',
        naranja: 'FFA500',
        rosa: 'FFC0CB',
        morado: '800080',
        marron: '8B4513',
        gris: '808080',
        celeste: '87CEEB',
        verdeLima: '00FF00',
        cyan: '00FFFF',
        
    };

    const argsSplit = args.join(' ').split(' ');
    const color = argsSplit[0].toLowerCase();
    const texto = argsSplit.slice(1).join(' ');

    if (!colorMap[color]) throw '*✖️ ERROR ✖️*\n_El color proporcionado no es válido. Prueba con rojo, verde, azul, etc._';
    if (!texto) throw '*✖️ ERROR ✖️*\n_Debe proporcionar un texto para crear el sticker.';

    const colorHex = colorMap[color];
    const teks = encodeURI(texto);

    conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=9b817532fadff8fc7cb86862&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
}

handler.command = handler.help = ['cstr'];
handler.tags = ['sticker'];
export default handler;
