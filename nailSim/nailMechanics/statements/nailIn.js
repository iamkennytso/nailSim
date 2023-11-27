import { gameOver } from "../../components";

const nailIn = (game) => {
  const {x, y} = game.nail
  const graphics = game.add.graphics()
  const outerCircle = game.add.circle(x, y, 250, '0x880808');
  outerCircle.alpha = .5
  const outerCircleEffective = new Phaser.Geom.Circle(x, y, 250);
  const innerCircle = game.make.graphics().fillCircle(x, y, 130);
  const innerCircleEffective = new Phaser.Geom.Circle(x, y, 130);
  const mask = innerCircle.createGeometryMask();
  mask.invertAlpha = true
  outerCircle.setMask(mask)

  var isPlayerInOuterRing = Phaser.Geom.Circle.Contains(outerCircleEffective, game.player.x, game.player.y);
  var isPlayerInInnerRing = Phaser.Geom.Circle.Contains(innerCircleEffective, game.player.x, game.player.y);
  if (isPlayerInOuterRing && !isPlayerInInnerRing) {
    gameOver(game)
  }

  setTimeout(() => {
    outerCircle.destroy()
    innerCircle.destroy()
    graphics.destroy()
  }, 500)
}

export default nailIn