import { moveOutOfOut, nailIn, nailOut } from "./statements"
import { clearStatementText } from "./statements/helpers"

const nailStatements = (game, phase) => {
  switch (phase) {
    case 1:
      const isStack = !!Math.round(Math.random)
      game.statementTwo.setText('O hallowed moon,')
      game.statementThree.setText(isStack ? 'take fire and scorch my foes!' : 'shine you the iron path!')
      setTimeout(() => {
        nailIn(game)
      // }, 7000)
      }, 1000)
      setTimeout(() => {
        moveOutOfOut(game)
      // }, 7500)
      }, 1500)
      setTimeout(() => {
        nailOut(game)
      // }, 10000)
      }, 4000)
      setTimeout(() => {
        clearStatementText(game)
      // }, 10500)
      }, 4500)
  }
}

export default nailStatements