import enet from 'enet.js'

import { ClientAddr } from '../enet'
import { encodePacket } from '../network/packet/packet.encode'

export async function handle(host: number, client: ClientAddr, data: any) {
  const enterScenePeerNotify = await encodePacket('EnterScenePeerNotify', {
    destSceneId: 3,
    peerId: 1,
    hostPeerId: 1,
  })

  enet.enet_peer_send(host, client.host, client.port, enterScenePeerNotify)

  const rsp = await encodePacket('EnterSceneReadyRsp', {
    retcode: 0,
  })

  enet.enet_peer_send(host, client.host, client.port, rsp)
}