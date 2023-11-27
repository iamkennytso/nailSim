import { gameOver } from "../../components";

const nailStack = game => {
  const beam = game.add.circle(game.stackTarget.x, game.stackTarget.y, 45, '0xd15a00');
  beam.alpha = .5
  const beamOverlaps = game.physics.overlapCirc(beam.x, beam.y, beam.radius, true, true);
  if (beamOverlaps.length !== 8) {
    gameOver(game)
  }
  setTimeout(() => {
    beam.destroy()
  }, 500)
}

export default nailStack