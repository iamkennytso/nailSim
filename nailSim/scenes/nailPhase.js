import Phaser from 'phaser'
import { canvasHeight, canvasWidth } from '../constants';
import { nailCast, nailStatements, nailThunder} from '../nailMechanics';

const playerVelo = 250

const setUpAllies = (nodes, game) => nodes.forEach(node => {
  node.alpha = .33
  game.physics.add.existing(node)
})

const shuffle = array => array.sort(() => Math.random() - .5)

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

    this.player
    this.playerRole
    this.nail
    this.nailCastObject
    this.nailCastText
    this.nailCastTime

    this.doomOrder
    this.thunderOrder
    this.iceOrder
    this.fireTetherOrder
    this.quoteOrder
  }

  init(data) {
    this.playerRole = data.playerRole
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
    const arena = this.add.circle(canvasWidth / 2, canvasHeight / 2, (canvasHeight - 20) / 2);
    arena.setStrokeStyle(2, 0x1a65ac);

    const npcAllies = []
    if (this.playerRole === 'dpsChar') {
      this.player = this.add.image(canvasWidth / 2- 40, canvasHeight / 2 + 100, 'dpsChar').setName('player')
    } else {
      this.dps1 = this.add.image(canvasWidth / 2 -  0, canvasHeight / 2 + 100, 'dpsChar').setName('dps1')
      npcAllies.push(this.dps1)
    }
    this.dps2 = this.add.image(canvasWidth / 2 - 20, canvasHeight / 2 + 100, 'dpsChar').setName('dps2')
    this.dps3 = this.add.image(canvasWidth / 2 + 20, canvasHeight / 2 + 100, 'dpsChar').setName('dps3')
    this.dps4 = this.add.image(canvasWidth / 2 + 40, canvasHeight / 2 + 100, 'dpsChar').setName('dps4')

    if (this.playerRole === 'healChar') {
      this.player = this.add.image(canvasWidth / 2 + 30, canvasHeight / 2 + 90, 'healChar').setName('player')
    } else {
      this.heal1 = this.add.image(canvasWidth / 2 + 30, canvasHeight / 2 + 90, 'healChar').setName('heal1')
      npcAllies.push(this.heal1)
    }
    this.heal2 = this.add.image(canvasWidth / 2 - 30, canvasHeight / 2 + 90, 'healChar').setName('heal2')

    if (this.playerRole === 'tankChar') {
      this.player = this.add.image(canvasWidth / 2 - 40, canvasHeight / 2 - 100, 'tankChar').setName('player')
    } else {
      this.tank1 = this.add.image(canvasWidth / 2 - 40, canvasHeight / 2 - 100, 'tankChar').setName('tank1')
      npcAllies.push(this.tank1) 
    }
    this.tank2 = this.add.image(canvasWidth / 2 + 40, canvasHeight / 2 - 100, 'tankChar').setName('tank2')

    npcAllies.push(this.dps2, this.dps3, this.dps4, this.heal2, this.tank2)
    this.npcAllies = npcAllies
    setUpAllies(npcAllies, this)

    this.nail = this.add.image(canvasWidth / 2, canvasHeight / 2, 'nail')
    this.player.setDepth(1);
    this.physics.add.existing(this.player)

    this.doomOrder = shuffle([...npcAllies, this.player])
    this.iceOrder = shuffle([...npcAllies, this.player])
    this.fireTetherOrder = shuffle([this.tank2, this.heal2, this.dps4, this.player])

    // this.thunderOrder = shuffle([...npcAllies, this.player])
    this.thunderOrder = [this.heal1, this.player]

    this.time.delayedCall(3000, () => {
      this.nailCastObject = {
        text: "Bahamut's Favor",
        time: 5000
      }
    })

    this.time.delayedCall(10000, () => {
      nailThunder(this, 1)
      // nailStatements(1)
    })

    this.graphics = this.add.graphics();

    this.graphics.lineStyle(100, '0xebf1ed', 1);

    this.graphics.strokeCircle(this.nail.x, this.nail.y, 200);

    this.movement = this.input.keyboard.addKeys({ 
      'up': Phaser.Input.Keyboard.KeyCodes.W, 
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });
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

    if (!!this.nailCastObject && !this.nailCastText) {
      nailCast(this)
    }
  }
}