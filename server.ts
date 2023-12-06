import * as ping from 'ping'
import wol from 'wake_on_lan'
import Express from 'express'
import expressWs from 'express-ws'
import { log } from 'console'
const wss = expressWs(Express())
const app = wss.app

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.ws('/ws', (ws) => {
  ws.on('message', (msg) => {
    log('Received: %s', msg)
    if (msg.toString() === 'wol') {
      wol.wake('00:11:22:33:44:55', (err) => {
        if (err) {
          log(err)
        } else {
          log('WOL sent')
        }
      })
    }
  })

  ws.on('close', () => {
    log('Client disconnected')
  })
})

app.listen(8080)

ping.sys.probe('ujep.cz', (isAlive) => {
  if (isAlive) {
    console.log('Host is alive')
  }
})
console.log('Hello from server.ts')
