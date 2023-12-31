import Phaser from 'phaser'
import { nailCast, nailDoom, nailStatements, nailThunder} from '../nailMechanics';
import { gameOver } from '../components';
import { setupArena, setupControls, setupOrders, setupSprites, setupStatements } from './nailPhase.helper';
import { beamBackground, chariotBackground } from '../constants';

const playerVelo = 250

export class NailPhaseScene extends Phaser.Scene {
  constructor() {
    super('scene-nailPhase')
    this.dps1
    this.dps2
    this.dps3
    this.dps4
    this.healer1
    this.healer2
    this.tank1
    this.tank2
    this.npcAllies
    this.stackTarget

    this.player
    this.playerRole
    this.nail
    this.arena
    this.nailCastObject
    this.nailCastText

    this.doomCleaseOrder
    this.doomPuddleOrder
    this.thunderOrder
    this.iceOrder
    this.fireTetherOrder
    this.quoteOrder

    this.cleanseCirclesVisual
    this.cleanseCircles
    this.activeCleanseCircles
    this.playersCleanseCircleIdx

    this.statementOne
    this.statementTwo
    this.statementThree
  }

  init(data) {
    this.playerRole = data.playerRole || 'dpsChar'
  }

  preload() {
    this.load.image('dpsChar', '/assets/DPSRole.png')
    this.load.image('healChar', '/assets/HealerRole.png')
    this.load.image('tankChar', '/assets/TankRole.png')
    this.load.image('nail', '/assets/Nail.png')
    this.load.image('nailCastLeft', 'assets/nailCastLeft.png')
    this.load.image('nailCastMid', 'assets/nailCastMid.png')
    this.load.image('nailCastRight', 'assets/nailCastRight.png')
    this.load.image('nailCastLeftBG', 'assets/nailCastLeftBG.png')
    this.load.image('nailCastMidBG', 'assets/nailCastMidBG.png')
    this.load.image('nailCastRightBG', 'assets/nailCastRightBG.png')
    this.load.image('thunderIcon', 'assets/thunder.png')
  }

  create() {
    setupArena(this)
    setupControls(this)
    setupSprites(this)
    setupOrders(this)
    setupStatements(this)
    this.cleanseCirclesVisual = [null, null, null, null, null, null, null, null]
    this.cleanseCircles = [null, null, null, null, null, null, null, null]
    this.activeCleanseCircles = [false, false, false, false, false, false, false, false]
    this.playersCleanseCircleIdx = null
    this.statementOne
    this.statementTwo
    this.statementThree


    this.doomCleanseOrder = [this.tank1, this.tank2]
    this.doomPuddleOrder = [this.healer1, this.healer2]

    this.time.delayedCall(3000, () => {
      this.nailCastObject = {
        text: "Bahamut's Favor",
        time: 5000
      }
    })

    this.time.delayedCall(10000, () => {
      nailThunder(this, 1)
      nailStatements(this, 1)
    })

    this.time.delayedCall(20000, () => {
      nailDoom(this, 0)
    })

    // this.time.delayedCall(1000, () => {
    //   nailStatements(this, 1)
    // })
  }

  update() {
    const { left, right, up, down } = this.movement;
    if (left.isDown) {
      this.player.body.setVelocityX(-playerVelo)
    } else if (right.isDown) {
      this.player.body.setVelocityX(playerVelo)
    } else {
      this.player.body.setVelocityX(0)
    }

    if (up.isDown) {
      this.player.body.setVelocityY(-playerVelo)
    } else if (down.isDown) {
      this.player.body.setVelocityY(playerVelo)
    } else {
      this.player.body.setVelocityY(0)
    }

    if (!Phaser.Geom.Circle.Contains(this.arena, this.player.x, this.player.y)) {
      gameOver(this)
      console.log('player went outta bounds')
    }

    if (!!this.nailCastObject && !this.nailCastText) {
      nailCast(this)
    }

    const notPlayerCleanses = this.cleanseCircles.filter((_, idx) => this.activeCleanseCircles[idx] && idx !== this.playersCleanseCircleIdx)
    notPlayerCleanses.forEach(cleanse => {
      if (Phaser.Geom.Circle.Contains(cleanse, this.player.x, this.player.y)) {
        console.log('player stepped on wrong puddle')
        gameOver(this)
      }
    })
  }
}