import enet from 'enet.js'
import { ClientAddr } from '../enet'
import { encodePacket } from '../network/packet/packet.encode'

export async function handle(host: number, client: ClientAddr, data: any) {
  const rsp = await encodePacket('PingRsp', {
    clientTime: data.clientTime,
    seq: data.seq,
  })

  enet.enet_peer_send(host, client.host, client.port, rsp)
}