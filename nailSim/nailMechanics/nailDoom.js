
import { gameOver } from "../components";
import { doomPuddleBackground, thunderBackground, moonBackground } from "../constants";
import { getNailPositions } from "../utils";

const moveOutOfDoom = (game, doomPuddleHitbox, curPhase) => {
  const checkSpots = (safeArray, spotArray) => {
    if (safeArray[0]) {
      moveToSafeSpot(spotArray[0])
    } else if (safeArray[1]) {
      moveToSafeSpot(spotArray[1])
    } else if (safeArray[2]) {
      moveToSafeSpot(spotArray[2])
    }
  }

  const moveToSafeSpot = (spot) => {
    game.tweens.add({
      targets: game.npcAllies,
      x: spot.x,
      y: spot.y,
      duration: 1000,
      ease: Phaser.Math.Easing.Linear,
    })
  }

  const southOfNail = getNailPositions(game.nail, 0)
  const southIsSafe = !Phaser.Geom.Circle.Contains(doomPuddleHitbox, southOfNail.x, southOfNail.y);
  const northEastOfNail = getNailPositions(game.nail, 2)
  const northEastIsSafe = !Phaser.Geom.Circle.Contains(doomPuddleHitbox, northEastOfNail.x, northEastOfNail.y);
  const northWestOfNail = getNailPositions(game.nail, 1)
  const northWestIsSafe = !Phaser.Geom.Circle.Contains(doomPuddleHitbox, northWestOfNail.x, northWestOfNail.y);
  let safeArray, spotArray

  switch (curPhase) {
    case 0:
      safeArray = [northEastIsSafe, northWestIsSafe, southIsSafe]
      spotArray = [northEastOfNail, northWestOfNail, southOfNail]
      break;
    case 1:
      safeArray = [northWestIsSafe, southIsSafe, northEastIsSafe]
      spotArray = [northWestOfNail, southOfNail, northEastOfNail]
  }

  checkSpots(safeArray, spotArray)
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
  game.cleanseCirclesVisual[phase] = cleanseCircle
  game.cleanseCircles[phase] = cleanseCircleHitbox
  game.activeCleanseCircles[phase] = true
}

const cleanseDoom = (game, phase) => {
  if (game.doomCleanseOrder[phase].name !== 'player') {
    game.tweens.add({
      targets: game.doomCleanseOrder[phase],
      x: game.cleanseCircles[phase].x,
      y: game.cleanseCircles[phase].y,
      duration: 1000,
      ease: Phaser.Math.Easing.Linear,
    })
    setTimeout(() => {
      game.cleanseCirclesVisual[phase].destroy()
      game.activeCleanseCircles[phase] = false
    }, 1250)
  }
}

const doTheDoomDance = (game, player, order, phase) => {
  setTimeout(() => {
    const doomPuddle = game.add.circle(player.x, player.y, 80, doomPuddleBackground);
    const doomPuddleHitbox = new Phaser.Geom.Circle(doomPuddle.x, doomPuddle.y, doomPuddle.radius);
    setTimeout(() => {
      moveOutOfDoom(game, doomPuddleHitbox, order + phase)
    }, 500)
    setTimeout(() => {
      spawnSmallerDoom(game, doomPuddle, doomPuddleHitbox, order + phase)
    }, 3000)
    setTimeout(() => {
      cleanseDoom(game, order + phase)
    }, 3500)
  }, 5000 * order)
}

const nailDoom = (game, phase) => {
  switch (phase) {
    case 0:
      const doomPuddles = game.doomPuddleOrder.slice(0,2)
      doomPuddles.forEach((player, idx) => {
        doTheDoomDance(game, player, idx, phase)
      })
  }
}

export default nailDoom