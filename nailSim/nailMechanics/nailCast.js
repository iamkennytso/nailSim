const nailCastbarX = 30
const nailCastbarY = 80
const nailCastbarFullWidth = 180
const nailCast = (game) => {
  const { text, time } = game.nailCastObject
  game.nailCastText = game.add.text(30, 30, text)

  const leftShadowCap = game.add.image(nailCastbarX, nailCastbarY, 'nailCastLeftBG').setOrigin(0, .5)
  const middleShadowCap = game.add.image(leftShadowCap.x + leftShadowCap.width, nailCastbarY, 'nailCastMidBG').setOrigin(0, 0.5)
  middleShadowCap.displayWidth = nailCastbarFullWidth
  const rightShadowCap = game.add.image(middleShadowCap.x + middleShadowCap.displayWidth, nailCastbarY, 'nailCastRightBG').setOrigin(0, 0.5)

  const leftCap = game.add.image(nailCastbarX, nailCastbarY, 'nailCastLeft')
    .setOrigin(0, 0.5)

  const middleCap = game.add.image(leftCap.x + leftCap.width, nailCastbarY, 'nailCastMid')
    .setOrigin(0, 0.5)

  const rightCap = game.add.image(middleCap.x + middleCap.displayWidth, nailCastbarY, 'nailCastRight')
    .setOrigin(0, 0.5)

  const setMeterPercentage = (percent = 1) => {
    const width =  nailCastbarFullWidth * percent
    middleCap.displayWidth = width
    rightCap.x = middleCap.x + middleCap.displayWidth
  }

  setMeterPercentage(0)

  game.tweens.add({
    targets: middleCap,
    displayWidth: nailCastbarFullWidth,
    duration: time,
    ease: Phaser.Math.Easing.Linear,
    onUpdate: () => {
      rightCap.x = middleCap.x + middleCap.displayWidth
      leftCap.visible = middleCap.displayWidth > 0
      middleCap.visible = middleCap.displayWidth > 0
      rightCap.visible = middleCap.displayWidth > 0
    }
  })

  setTimeout(() => {
    game.nailCastText.destroy()
    game.nailCastText = null
    game.nailCastObject = null
    leftShadowCap.destroy()
    middleShadowCap.destroy()
    rightShadowCap.destroy()
    leftCap.destroy()
    middleCap.destroy()
    rightCap.destroy()
  }, time)
}


export default nailCast