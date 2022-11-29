import 'dotenv/config'
import protobufjs from 'protobufjs'
import packetIds from './network/packetIds.json'

import { xor } from './network/packet/packet.xor'
import { key } from './handlers/GetPlayerTokenReq'
import { enet_host_create, enet_host_service, Packet } from 'enet.js'

export interface ClientAddr {
  ip: string
  host: string
  port: number
}

export function startEnet() {
  const host = enet_host_create(process.env.GAME_SERVER_HOST!,
    Number(process.env.GAME_SERVER_PORT), 1)

  console.log(`Game server is running at port ${process.env.GAME_SERVER_PORT}`)

  setInterval(async () => {
    const packet: Packet = enet_host_service(host)

    if (!packet || !packet.data) {
      return
    }

    const data: Buffer = xor(packet.data, key)

    const cmdId = data.readUInt16BE(2)
    const name = packetIds[cmdId]

    console.log(`Received ${cmdId} [${name}]`)

    const sliced = Buffer.from(data.subarray(10)).subarray(0, -2);
    let protoData = sliced.subarray(data.readUInt8(5));

    try {
      const proto = await protobufjs.load(`src/proto/${name}.proto`)
      const decoded = proto.lookupTypeOrEnum(name).decode(protoData).toJSON()
      await require(`./handlers/${name}`).handle(host, { ip: packet.ip, host: packet.host, port: packet.port }, decoded)
    } catch (e) { }
  }, 100)
}

export {
  key
}