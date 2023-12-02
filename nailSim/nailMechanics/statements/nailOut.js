import { gameOver } from "../../components";
import { chariotBackground } from "../../constants";

const nailOut = game => {
  const chariot = game.add.circle(game.nail.x, game.nail.y, 200, chariotBackground);
  chariot.alpha = .5
  const chariotOverlaps = game.physics.overlapCirc(chariot.x, chariot.y, chariot.radius, true, true)
  if (chariotOverlaps.find(overlap => overlap?.gameObject?.name === 'player')) {
    gameOver(game)
    console.log('player was not out')
  }
  setTimeout(() => {
    chariot.destroy()
  }, 500)
}

export default nailOut;