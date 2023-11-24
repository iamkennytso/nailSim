import { gameOver } from "../components"
import { canvasHeight, canvasWidth } from "../constants"

const thunderDuration = 5000
const nailThunder = (game, phase) => {
  let thunderedPlayers
  switch(phase) {
    case 1:
      thunderedPlayers = game.thunderOrder.slice(0, 2)
      console.log(thunderedPlayers)
      const thunderPlayersNames = thunderedPlayers.map(player => player.name)
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
          const playersInThunder = game.physics.overlapCirc(thunderSpray.x, thunderSpray.y, thunderSpray.radius, true, true)
          if (playersInThunder.length) {
            gameOver(game, 'nailPhase')
          }
        })
      }, thunderDuration)
      break;
  }
  // thunderedPlayers.forEach(player => {
  //   const thunderImage = game.add.image(player.x - (player.width / 2), player.y - (player.height / 2), 'thunderIcon').setOrigin(0,0).setScale(.5)
  //   setTimeout(() => {
  //     thunderImage.destroy()
  //   }, thunderDuration)
  // })
}

export default nailThunder