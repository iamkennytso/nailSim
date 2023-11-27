import { moveOutOfOut, moveInStack, nailIn, nailOut, nailStack } from "./statements"
import { clearStatementText } from "./statements/helpers"

const nailStatements = (game, phase) => {
  switch (phase) {
    case 1:
      const isStack = !!Math.round(Math.random())
      // const startTime = 7000
      const startTime = 1000
      game.statementTwo.setText('O hallowed moon,')
      game.statementThree.setText(isStack ? 'take fire and scorch my foes!' : 'shine you the iron path!')
      setTimeout(() => {
        nailIn(game)
      }, startTime)
      setTimeout(() => {
        isStack ? moveInStack(game) : moveOutOfOut(game)
      }, startTime + 500)
      setTimeout(() => {
        isStack ? nailStack(game) : nailOut(game)
      }, startTime + 3000)
      setTimeout(() => {
        clearStatementText(game)
      }, startTime + 3500)
  }
}

export default nailStatements