import { gameOver } from "../components"
import { canvasHeight, canvasWidth } from "../constants"

const thunderDuration = 6000
const nailThunder = (game, phase) => {
  let thunderedPlayers
  switch(phase) {
    case 1:
      thunderedPlayers = game.thunderOrder.slice(0, 2)
      const thunderPlayersNames = thunderedPlayers.map(player => player.name)
      console.log(thunderedPlayers)
      setTimeout(() => {
        let leftFilled = false
        game.npcAllies.forEach(ally => {
          if (!thunderPlayersNames.includes(ally.name)) {
            game.tweens.add({
              targets: ally,
              x: canvasWidth / 2, 
              y: canvasHeight / 2 + 60,
              duration: 1000,
              ease: Phaser.Math.Easing.Linear,
            })
          } else {
            if (thunderPlayersNames.includes('player')) {
              const random = Math.round(Math.random())
              const xOffset = random ? -60 : 60
              game.tweens.add({
                targets: ally,
                x: canvasWidth / 2 + xOffset,
                y: canvasHeight / 2 - 60,
                duration: 1000,
                ease: Phaser.Math.Easing.Linear,
              })
              const thunderIcon = game.add.image(canvasWidth - 30, 30, 'thunderIcon')
              const thunderTimer = game.add.text(thunderIcon.x, thunderIcon.y + 45, '5').setFontSize(20).setOrigin(0.5)
              setTimeout(() => {
                thunderTimer.setText('4')
              }, 1000)
              setTimeout(() => {
                thunderTimer.setText('3')
              }, 2000)
              setTimeout(() => {
                thunderTimer.setText('2')
              }, 3000)
              setTimeout(() => {
                thunderTimer.setText('1')
              }, 4000)
              setTimeout(() => {
                thunderTimer.destroy()
                thunderIcon.destroy()
              }, 5000)
            } else {
              if (!leftFilled) {
                game.tweens.add({
                  targets: ally,
                  x: canvasWidth / 2 - 60,
                  y: canvasHeight / 2 - 60,
                  duration: 1000,
                  ease: Phaser.Math.Easing.Linear,
                })
                leftFilled = true
              } else {
                game.tweens.add({
                  targets: ally,
                  x: canvasWidth / 2 + 60,
                  y: canvasHeight / 2 - 60,
                  duration: 1000,
                  ease: Phaser.Math.Easing.Linear,
                })
              }
            }
          }
        })
      }, 1000)

      setTimeout(() => {
        thunderedPlayers.forEach(player => {
          const thunderSpray = game.add.circle(player.x, player.y, 60, '0xFFFF00');
          thunderSpray.alpha = .25
          thunderSpray.setStrokeStyle(2, '0xFFFF00');
          const thunderOverlaps = game.physics.overlapCirc(thunderSpray.x, thunderSpray.y, thunderSpray.radius, true, true)
          if (thunderOverlaps.length > 1) {
            gameOver(game)
          }

          setTimeout(() => {
            thunderSpray.destroy()
          }, 500)
        })
      }, thunderDuration)
      break;
  }
}

export default nailThunder