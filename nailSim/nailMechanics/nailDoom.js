import { doomPuddleBackground } from "../constants";

const nailDoom = (game, phase) => {
  const spawnDoomPuddle = (puddle) => {
    const doomPuddle = game.add.circle(puddle.x, puddle.y, 80, doomPuddleBackground);
  }

  switch (phase) {
    case 1:
      const doomPuddles = game.doomOrder.slice(0,2)
      doomPuddles.forEach(player => {
        spawnDoomPuddle(player)
      })
  }
}

export default nailDoom