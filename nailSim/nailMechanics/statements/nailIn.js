import { gameOver } from "../../components";
import { canvasHeight, canvasWidth } from "../../constants";

const nailIn = (game) => {
  const outerCircle = game.add.circle(canvasWidth / 2, canvasHeight / 2, 300, '0xc0c0c0');
  const outerCircleEffective = new Phaser.Geom.Circle(canvasWidth / 2, canvasHeight / 2, 300);
  const innerCircle = game.make.graphics().fillCircle(canvasWidth / 2, canvasHeight / 2, 150);
  const innerCircleEffective = new Phaser.Geom.Circle(canvasWidth / 2, canvasHeight / 2, 150);
  const mask = innerCircle.createGeometryMask();
  mask.invertAlpha = true
  outerCircle.setMask(mask)

  var isPlayerInOuterRing = Phaser.Geom.Circle.Contains(outerCircleEffective, game.player.x, game.player.y);
  var isPlayerInInnerRing = Phaser.Geom.Circle.Contains(innerCircleEffective, game.player.x, game.player.y);
  if (isPlayerInOuterRing && !isPlayerInInnerRing) {
    gameOver(game)
  }
}

export default nailIn