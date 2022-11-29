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
            pos: { X: 0, Y: 600, Z: 0 },
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
            equipIdList: [
              88543,
              91523,
              91553,
              91513,
              91433,
              13303,
            ],
            weapon: {
              entityId: 100663513,
              gadgetId: 50012502,
              itemId: 12502,
              guid: '2664326143951285785',
              level: 80,
              promoteLevel: 5,
              abilityInfo: {},
              affixMap: {
                113303: 4,
              },
            },
            reliquaryList: [
              {
                itemId: 88543,
                guid: '2664326143951336725',
                level: 21,
              },
              {
                itemId: 91523,
                guid: '2664326143951481191',
                level: 21,
              },
              {
                itemId: 91553,
                guid: '2664326143951577623',
                level: 21,
              },
              {
                itemId: 91513,
                guid: '2664326143951545289',
                level: 21,
              },
              {
                itemId: 91433,
                guid: '2664326143951599549',
                level: 17,
              },
            ],
            inherentProudSkillList: [
              462101,
              462201,
              462301,
            ],
            skillLevelMap: {
              10461: 2,
              10462: 6,
              10463: 6,
            },
            proudSkillExtraLevelMap: {
              4631: 1,
            },
            teamResonanceList: [
              10801,
            ],
            wearingFlycloakId: 140005,
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