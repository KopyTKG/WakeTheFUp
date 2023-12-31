import * as ping from 'ping'
import wol from 'wake_on_lan'
import Express from 'express'
import * as http from 'http'
import { log } from 'console'
import { Server } from 'socket.io'
import SSH from 'simple-ssh'

const wss = http.createServer(Express())

const app = new Server(wss, {
  cors: {
    origin: '*',
  },
})

app.on('connection', (ws) => {
  ws.on('ping', (rawData) => {
    const ip = rawData.toString()
    ping.sys.probe(ip, (isAlive, error) => {
      if (error) {
        ws.emit('error', error)
      }

      if (isAlive) {
        ws.emit('pong', JSON.stringify({ key: 'pong', ip: ip, value: 'alive' }))
      } else {
        ws.emit('pong', JSON.stringify({ key: 'pong', ip: ip, value: 'dead' }))
      }
    })
  })

  ws.on('wake', (raw) => {
    const mac = raw.toString()
    wol.wake(mac, (err) => {
      if (err) {
        ws.emit('error', err)
      } else {
        ws.emit('woken', 'woken')
      }
    })
  })

  ws.on('off', async (raw) => {
    const parsed = JSON.parse(raw.toString())
    const ip = parsed.ip
    const pass = parsed.pass
    const user = parsed.user
    const command = parsed.command

    const ssh = new SSH({
      host: ip,
      user: user,
      pass: pass,
    })
    ssh.exec(command).start()
  })
})

app.on('close', () => {
  log('✔️ Server closed')
})

wss.listen(8080, () => {
  console.log('✔️ Server listening on port 8080')
})
