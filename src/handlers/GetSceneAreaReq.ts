import enet from 'enet.js'
import { ClientAddr } from '../enet'
import { encodePacket } from '../network/packet/packet.encode'

export async function handle(host: number, client: ClientAddr, data: any) {
  const rsp = await encodePacket('GetSceneAreaRsp', {
    sceneId: data.sceneId,
    areaIdList: new Array(200).fill(0).map((item, index) => index),
  })

  enet.enet_peer_send(host, client.host, client.port, rsp)
}