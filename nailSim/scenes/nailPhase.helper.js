import { arenaStroke, canvasHeight, canvasWidth, npcSpriteDepth, playerSpriteDepth } from "../constants"

const shuffle = array => array.sort(() => Math.random() - .5)

const setUpAllies = (nodes, game) => nodes.forEach(node => {
  node.alpha = .33
  node.setDepth(npcSpriteDepth)
  game.physics.add.existing(node)
})

export const setupArena = game => {
  const arenaLine = game.add.circle(canvasWidth / 2, canvasHeight / 2, (canvasHeight - 20) / 2);
  arenaLine.setStrokeStyle(2, arenaStroke);
  game.arena = new Phaser.Geom.Circle(canvasWidth / 2, canvasHeight / 2, (canvasHeight - 20) / 2);
}

export const setupStatements = game => {
  const statementsX = canvasWidth - 10
  game.statementOne = game.add.text(statementsX, canvasHeight - 65, '').setFontSize(20).setOrigin(1,1)
  game.statementTwo = game.add.text(statementsX, canvasHeight - 40, '').setFontSize(20).setOrigin(1,1)
  game.statementThree = game.add.text(statementsX, canvasHeight - 15, '').setFontSize(20).setOrigin(1,1)
}

export const setupSprites = game => {
  const npcAllies = []
  if (game.playerRole === 'dpsChar') {
    game.player = game.add.image(canvasWidth / 2 - 40, canvasHeight / 2 + 100, 'dpsChar').setName('player')
  } else {
    game.dps1 = game.add.image(canvasWidth / 2 -  0, canvasHeight / 2 + 100, 'dpsChar').setName('dps1')
    npcAllies.push(game.dps1)
  }
  game.dps2 = game.add.image(canvasWidth / 2 - 20, canvasHeight / 2 + 100, 'dpsChar').setName('dps2')
  game.dps3 = game.add.image(canvasWidth / 2 + 20, canvasHeight / 2 + 100, 'dpsChar').setName('dps3')
  game.dps4 = game.add.image(canvasWidth / 2 + 40, canvasHeight / 2 + 100, 'dpsChar').setName('dps4')

  if (game.playerRole === 'healChar') {
    game.player = game.add.image(canvasWidth / 2 + 30, canvasHeight / 2 + 90, 'healChar').setName('player')
  } else {
    game.healer1 = game.add.image(canvasWidth / 2 + 30, canvasHeight / 2 + 90, 'healChar').setName('healer1')
    npcAllies.push(game.healer1)
  }
  game.healer2 = game.add.image(canvasWidth / 2 - 30, canvasHeight / 2 + 90, 'healChar').setName('healer2')
  game.stackTarget = game.healer2

  if (game.playerRole === 'tankChar') {
    game.player = game.add.image(canvasWidth / 2 - 40, canvasHeight / 2 - 100, 'tankChar').setName('player')
  } else {
    game.tank1 = game.add.image(canvasWidth / 2 - 40, canvasHeight / 2 - 100, 'tankChar').setName('tank1')
    npcAllies.push(game.tank1) 
  }
  game.tank2 = game.add.image(canvasWidth / 2 + 40, canvasHeight / 2 - 100, 'tankChar').setName('tank2')

  npcAllies.push(game.dps2, game.dps3, game.dps4, game.healer2, game.tank2)
  game.npcAllies = npcAllies
  setUpAllies(npcAllies, game)

  game.nail = game.add.image(canvasWidth / 2, canvasHeight / 2 , 'nail')
  game.nail.setDepth(npcSpriteDepth)
  game.player.setDepth(playerSpriteDepth);
  game.physics.add.existing(game.player)
  game.physics.world.enable(game.player)
  game.physics.world.setBounds(game.arena.x - game.arena.radius, game.arena.y - game.arena.radius, game.arena.radius * 2, game.arena.radius * 2);
}

export const setupOrders = (game) => {
  game.thunderOrder = shuffle([...game.npcAllies, game.player])
  game.doomOrder = shuffle([...game.npcAllies, game.player])
  game.iceOrder = shuffle([...game.npcAllies, game.player])
  game.fireTetherOrder = shuffle([game.tank2, game.healer2, game.dps4, game.player])
}

export const setupControls = (game) => {
  game.movement = game.input.keyboard.addKeys({ 
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
}