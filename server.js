import express from 'express' 
import {createServer} from 'http'
import path from 'path'
import {Socket} from 'socket.io'
import {toBuffer} from 'qrcode'
import fetch from 'node-fetch'

function connect(conn, PORT) {
  const app = global.app = express()
  console.log(app)
  const server = global.server = createServer(app)
  let _qr = 'QR invalido, probablemente ya hayas escaneado el QR.'

  conn.ev.on('connection.update', function appQR({qr}) {
    if (qr) _qr = qr
  })

  app.use(async (req, res) => {
    res.setHeader('content-type', 'image/png')
    res.end(await toBuffer(_qr))
  })

  server.listen(PORT, () => {
    console.log('App listened on port', PORT)
    (opts['keepalive'] = true;
  })
}

function pipeEmit(event, event2, prefix = '') {
  const old = event.emit;
  event.emit = function(event, ...args) {
    old.emit(event, ...args)
    event2.emit(prefix + event, ...args)
  }
  return {
    unpipeEmit() {
      event.emit = old
    }}
}

function keepAlive() {
  const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  if (/(\/\/|\.)undefined\./.test(url)) return


  setInterval(async() => {

    console.log("=======================================");

    //console.log(`keepAlive() url ->`, url);

    console.log(`keepAlive() a LocalHost 3000`);

    console.log("=======================================");

    //fetch("http://localhost:3000").catch(console.error);

    const res = await fetch("http://localhost:3000");

    if (res.status === 200) {

      const result = await res.text();

      console.log(`Resultado desde LocalHost 3000`, result);

    }

  }, 5 * 1000 * 60)
