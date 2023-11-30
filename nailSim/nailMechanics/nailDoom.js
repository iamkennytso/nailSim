
import { gameOver } from "../components";
import { doomPuddleBackground, thunderBackground, moonBackground } from "../constants";
import { getNailPositions } from "../utils";

const moveOutOfDoom = (game, doomPuddleHitbox) => {
  const southOfNail = getNailPositions(game.nail, 0)
  const southIsSafe = !Phaser.Geom.Circle.Contains(doomPuddleHitbox, southOfNail.x, southOfNail.y);
  if (southIsSafe) {
    return game.tweens.add({
      targets: game.npcAllies,
      x: southOfNail.x,
      y: southOfNail.y,
      duration: 1000,
      ease: Phaser.Math.Easing.Linear,
    })
  }
  const northEastOfNail = getNailPositions(game.nail, 2)
  const northEastIsSafe = !Phaser.Geom.Circle.Contains(doomPuddleHitbox, northEastOfNail.x, northEastOfNail.y);
  if (northEastIsSafe) {
    return game.tweens.add({
      targets: game.npcAllies,
      x: northEastOfNail.x,
      y: northEastOfNail.y,
      duration: 1000,
      ease: Phaser.Math.Easing.Linear,
    })
  }

  const northWestOfNail = getNailPositions(game.nail, 1)
  const northWestIsSafe = !Phaser.Geom.Circle.Contains(doomPuddleHitbox, northWestOfNail.x, northWestOfNail.y);
  if (northWestIsSafe) {
    return game.tweens.add({
      targets: game.npcAllies,
      x: northWestOfNail.x,
      y: northWestOfNail.y,
      duration: 1000,
      ease: Phaser.Math.Easing.Linear,
    })
  }
}

const spawnSmallerDoom = (game, doomPuddle, doomPuddleHitbox, phase) => {
  const { player } = game
  const { x, y } = doomPuddle
  const playerIsInDoom = Phaser.Geom.Circle.Contains(doomPuddleHitbox, player.x, player.y)
  if (playerIsInDoom) {
    gameOver(game)
  }
  doomPuddle.destroy()
  const cleanseCircle = game.add.circle(x, y, 25, doomPuddleBackground);
  const cleanseCircleHitbox = new Phaser.Geom.Circle(x, y, 25);
  game.cleanseCircles[phase] = cleanseCircleHitbox
  game.activeCleanseCircles[phase] = true
  return { cleanseCircle, cleanseCircleHitbox }
}

const nailDoom = (game, phase) => {
  const spawnDoomPuddle = (player, order, phase) => {
    setTimeout(() => {
      const doomPuddle = game.add.circle(player.x, player.y, 80, doomPuddleBackground);
      const doomPuddleHitbox = new Phaser.Geom.Circle(doomPuddle.x, doomPuddle.y, doomPuddle.radius);
      let cleanseCircle, cleanseCircleHitbox
      setTimeout(() => {
        moveOutOfDoom(game, doomPuddleHitbox)
      }, 500)
      setTimeout(() => {
        const smallDooms = spawnSmallerDoom(game, doomPuddle, doomPuddleHitbox, phase + order)
        cleanseCircle = smallDooms.doomCleanser
        cleanseCircleHitbox = smallDooms.doomCleanserHitbox
      }, 3000)
      setTimeout(() => {
        // cleanseDoom()
      }, 3500)
    }, 5000 * order)
  }

  //   // if (player.name !== 'player') {
  //   //   setTimeout(() => {
  //   //     game.tweens.add({
  //   //       targets: player,
  //   //       x: doomPuddle.x,
  //   //       y: doomPuddle.y,
  //   //       duration: 1000,
  //   //       ease: Phaser.Math.Easing.Linear,
  //   //     })
  //   //   }, 4000)
  //   // }
  // }

  switch (phase) {
    case 1:
      const doomPuddles = game.doomOrder.slice(0,2)
      doomPuddles.forEach((player, idx) => {
        spawnDoomPuddle(player, idx, phase - 1)
      })
  }
}

export default nailDoom