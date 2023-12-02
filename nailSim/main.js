import { canvasHeight, canvasWidth } from './constants'
import { NailPhaseScene } from './scenes/nailPhase'
import { RoleSelectionScene } from './scenes/roleSelectionScene'
import './style.css'
import Phaser from 'phaser'

const config = {
  type: Phaser.WEBGL,
  width: canvasWidth,
  height: canvasHeight,
  canvas: gameCanvas,
  physics: {
    default: 'arcade'
  },
  // scene: [RoleSelectionScene, NailPhaseScene]
  scene: [NailPhaseScene]
}

const game = new Phaser.Game(config)
