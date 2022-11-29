import { MT19937_64 } from '../network/mt'
import enet from 'enet.js'
import { ClientAddr } from '../enet'
import { encodePacket } from '../network/packet/packet.encode'

export let key: Buffer

export async function handle(host: number, client: ClientAddr, data: any) {
  const rsp = await encodePacket('GetPlayerTokenRsp', {
    uid: 61,
    accountType: data.accountType,
    accountUid: '61',
    token: data.accountToken,
    gmUid: 61,
    secretKeySeed: 2,
  })

  enet.enet_peer_send(host, client.host, client.port, rsp)

  let generator = new MT19937_64();
  generator.seed(BigInt(2));
  let mtKey = Buffer.alloc(512);
  for (let i = 0; i < 512; i += 8) {
    let val = generator.int64();
    mtKey.writeBigUInt64BE(val, i);
  }

  key = mtKey
}