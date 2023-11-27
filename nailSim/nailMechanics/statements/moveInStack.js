const moveInStack = game => {
  game.tweens.add({
    targets: game.npcAllies,
    x: game.stackTarget.x,
    y: game.stackTarget.y,
    duration: 2000,
    ease: Phaser.Math.Easing.Linear,
  })
}

export default moveInStack