import { gameOver } from "../../components";
import { beamBackground } from "../../constants";

const nailStack = game => {
  const beam = game.add.circle(game.stackTarget.x, game.stackTarget.y, 45, beamBackground);
  beam.alpha = .5
  const beamOverlaps = game.physics.overlapCirc(beam.x, beam.y, beam.radius, true, true);
  if (beamOverlaps.length !== 8) {
    gameOver(game)
    console.log('player did not stack')
  }
  setTimeout(() => {
    beam.destroy()
  }, 500)
}

export default nailStack