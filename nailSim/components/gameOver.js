import { canvasHeight, canvasWidth } from "../constants"

const gameOverContainerDepth = 30
const titleTextDepth = 31
const buttonTextureDepth = 31
const buttonTextDepth = 32
const gameOver = (game, win = false) => {
  const gameOverContainer = game.add.rectangle(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, canvasHeight / 2, '0x808080', .5).setDepth(gameOverContainerDepth)
  game.add.text(gameOverContainer.x, gameOverContainer.y - (gameOverContainer.height / 3), win ? 'GOOD JOB!' : 'YOU FAILED').setFontSize(40).setOrigin(0.5).setDepth(titleTextDepth)
  const retryButton = game.add.rectangle((gameOverContainer.x - (gameOverContainer.width / 2)) + gameOverContainer.width / 4, gameOverContainer.y + (gameOverContainer.height / 6), 150, 50, '0xFFEDA2', .75).setDepth(buttonTextureDepth).setOrigin(0.5)
  game.add.text(retryButton.x, retryButton.y, 'RETRY').setFontSize(20).setOrigin(0.5).setDepth(buttonTextDepth)
  const roleSelectButton = game.add.rectangle((gameOverContainer.x - (gameOverContainer.width / 2)) + (3 * (gameOverContainer.width / 4)), gameOverContainer.y + (gameOverContainer.height / 6), 150, 50, '0xFFEDA2', .75).setDepth(buttonTextureDepth).setOrigin(0.5)
  game.add.text(roleSelectButton.x, roleSelectButton.y, 'SELECT ROLE').setFontSize(20).setOrigin(0.5).setDepth(buttonTextDepth)

  retryButton.setInteractive();
  retryButton.on('pointerup', () => {
    game.scene.start('scene-nailPhase', { playerRole: game.player.texture.key })
  })

  roleSelectButton.setInteractive();
  roleSelectButton.on('pointerup', () => {
    game.scene.start('scene-roleSelection')
  })
}

export default gameOver