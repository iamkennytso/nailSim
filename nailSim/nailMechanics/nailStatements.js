import { nailIn } from "./statements"

const nailStatements = (game, phase) => {
  switch (phase) {
    case 1:
      const isStack = !!Math.round(Math.random)
      setTimeout(() => {
        nailIn(game)
      // }, 6000)
      }, 1000)
  }
}

export default nailStatements