import enet from 'enet.js'
import { ClientAddr } from '../enet'
import { encodePacket } from '../network/packet/packet.encode'

export async function handle(host: number, client: ClientAddr, data: any) {
  const worldDataNotify = await encodePacket('WorldDataNotify', {
    propMap: {
      '1': {
        type: 1,
        ival: 8
      },
      '2': {
        type: 2,
        ival: 0
      }
    }
  })

  const scenePlayerInfoNotify = await encodePacket('ScenePlayerInfoNotify', {
    playerInfoList: [
      {
        uid: 61,
        peerId: 1,
        name: 'andromeda',
        sceneId: 3,
        onlinePlayerInfo: {
          uid: 61,
          nickname: 'andromeda',
        },
      }
    ]
  })

  const playerEnterSceneInfoNotify = await encodePacket('PlayerEnterSceneInfoNotify', {
    "curAvatarEntityId": 16777432,
    "avatarEnterInfo": [
      {
        "avatarGuid": "2664326143951479019",
        "avatarEntityId": 16777432,
        "avatarAbilityInfo": {},
        "weaponGuid": "2664326143951285785",
        "weaponEntityId": 100663513,
        "weaponAbilityInfo": {}
      }
    ],
    "teamEnterInfo": {
      "teamEntityId": 150995153,
      "teamAbilityInfo": {},
      "abilityControlBlock": {}
    },
    "mpLevelEntityInfo": {
      "entityId": 184549594,
      "authorityPeerId": 1,
      "abilityInfo": {}
    },
  })

  const sceneDataNotify = await encodePacket('SceneDataNotify', {})

  const sceneTeamUpdateNotify = await encodePacket('SceneTeamUpdateNotify', {
    sceneTeamAvatarList: [
      {
        playerUid: 61,
        avatarGuid: {
          "low": 237803,
          "high": 620336771,
          "unsigned": true
        },
        sceneId: 3,
        entityId: 16777432,
      }
    ]
  })

  const worldPlayerInfoNotify = await encodePacket('WorldPlayerInfoNotify', {
    playerInfoList: [
      {
        uid: 61,
        nickname: 'andromeda',
      }
    ],
    playerUidList: [61],
  })

  const hostPlayerNotify = await encodePacket('HostPlayerNotify', {
    hostUid: 61,
    hostPeerId: 1,
  })

  const sceneTimeNotify = await encodePacket('SceneTimeNotify', {
    sceneId: 3,
    sceneTime: 0,
    isPaused: false,
  })

  const playerGameTimeNotify = await encodePacket('PlayerGameTimeNotify', {
    uid: 61,
    gameTime: 0,
  })

  const rsp = await encodePacket('SceneInitFinishRsp', {
    retcode: 0
  })

  enet.enet_peer_send(host, client.host, client.port, worldDataNotify)
  enet.enet_peer_send(host, client.host, client.port, hostPlayerNotify)
  enet.enet_peer_send(host, client.host, client.port, sceneTimeNotify)
  enet.enet_peer_send(host, client.host, client.port, playerGameTimeNotify)
  enet.enet_peer_send(host, client.host, client.port, sceneDataNotify)
  enet.enet_peer_send(host, client.host, client.port, worldPlayerInfoNotify)
  enet.enet_peer_send(host, client.host, client.port, scenePlayerInfoNotify)
  enet.enet_peer_send(host, client.host, client.port, sceneTeamUpdateNotify)
  enet.enet_peer_send(host, client.host, client.port, playerEnterSceneInfoNotify)
  enet.enet_peer_send(host, client.host, client.port, rsp)
}