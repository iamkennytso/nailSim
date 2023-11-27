import { gameOver } from "../../components";

const nailOut = game => {
  const chariot = game.add.circle(game.nail.x, game.nail.y, 200, '0xc0c0c0');
  chariot.alpha = .5
  const chariotOverlaps = game.physics.overlapCirc(chariot.x, chariot.y, chariot.radius, true, true)
  if (chariotOverlaps.length) {
    gameOver(game)
  }
  setTimeout(() => {
    chariot.destroy()
  }, 500)
}

export default nailOut;