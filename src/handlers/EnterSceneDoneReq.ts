import enet from 'enet.js'
import { ClientAddr } from '../enet'
import { encodePacket } from '../network/packet/packet.encode'

export async function handle(host: number, client: ClientAddr, data: any) {
  try {
    const sceneEntityAppearNotify = await encodePacket('SceneEntityAppearNotify', {
      entityList: [
        {
          entityType: 1,
          entityId: 16777432,
          motionInfo: {
            pos: { X: 0, Y: 300, Z: 0 },
            rot: { Y: 0, },
            speed: {}
          },
          fightPropList: {},
          propMap: {
            '4001': 70,
          },
          lifeState: 1,
          avatar: {
            uid: 61,
            avatarId: 10000026,
            guid: "2664326143951479019",
            peerId: 1,
            skillDepotId: 2601,
            equipIdList: [],
            weapon: {
              entityId: 100663513,
              gadgetId: 50013404,
              itemId: 13404,
              guid: '2664326143951285785',
              level: 80,
              promoteLevel: 5,
              abilityInfo: {},
              affixMap: {},
            },
            reliquaryList: [],
            inherentProudSkillList: [],
            skillLevelMap: {},
            proudSkillExtraLevelMap: {},
            teamResonanceList: [],
            bornTime: 1620699348,
          }
        }
      ],
      appearType: 12
    })

    const rsp = await encodePacket('EnterSceneDoneRsp', {
      retcode: 0,
    })


    enet.enet_peer_send(host, client.host, client.port, sceneEntityAppearNotify)
    enet.enet_peer_send(host, client.host, client.port, rsp)
  } catch (e) {
    console.log(e)
  }
}