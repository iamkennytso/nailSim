import Phaser from 'phaser'
import { canvasHeight, canvasWidth } from './constants';

const roleSelectionClickListener = (game, node) => {
  node.setInteractive();

  node.on('pointerup', () => {
    game.scene.start('scene-nailPhase', { playerRole: node.texture.key })
  })
}

export class RoleSelectionScene extends Phaser.Scene {
  constructor() {
    super('scene-roleSelection')
    this.introText

    this.dps1
    this.dps2
    this.dps3
    this.dps4
    this.healer1
    this.healer2
    this.tank1
    this.tank2
  }

  preload() {
    this.load.image('dpsChar', '/assets/DPSRole.png')
    this.load.image('healChar', '/assets/HealerRole.png')
    this.load.image('tankChar', '/assets/TankRole.png')
    this.load.image('nail', '/assets/Nail.png')
  }

  create() {
    this.introText = this.add.text(canvasWidth / 2, canvasHeight / 10, 'choose your role').setOrigin(.5, 0)
    this.tank1 = this.add.image(canvasWidth / 2, canvasHeight / 2 - 200, 'tankChar')
    this.tank2 = this.add.image(canvasWidth / 2 + 100, canvasHeight / 2 - 100, 'tankChar')
    this.dps1 = this.add.image(canvasWidth / 2 + 200, canvasHeight / 2, 'dpsChar')
    this.dps2 = this.add.image(canvasWidth / 2 + 100, canvasHeight / 2 + 100, 'dpsChar')
    this.heal1 = this.add.image(canvasWidth / 2, canvasHeight / 2 + 200, 'healChar')
    this.heal2 = this.add.image(canvasWidth / 2 - 100, canvasHeight / 2 + 100, 'healChar')
    this.dps3 = this.add.image(canvasWidth / 2 - 200, canvasHeight / 2, 'dpsChar')
    this.dps4 = this.add.image(canvasWidth / 2 - 100, canvasHeight / 2 - 100, 'dpsChar')

    const nodes = [this.tank1, this.tank2, this.dps1, this.dps2, this.dps3, this.dps4, this.heal1, this.heal2]

    nodes.forEach(node => roleSelectionClickListener(this, node))
  }
}