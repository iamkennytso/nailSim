import { northSafePoint } from "../../constants";

const moveOutOfOut = game => {
  const chariotHitbox = new Phaser.Geom.Circle(game.nail.x, game.nail.y, 200);
  const northIsSafe = !Phaser.Geom.Circle.Contains(chariotHitbox, northSafePoint.x, northSafePoint.y);
  if (northIsSafe) {
    game.tweens.add({
      targets: game.npcAllies,
      x: northSafePoint.x,
      y: northSafePoint.y,
      duration: 2000,
      ease: Phaser.Math.Easing.Linear,
    })
  }
}

export default moveOutOfOut