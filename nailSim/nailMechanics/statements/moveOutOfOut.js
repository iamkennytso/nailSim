import Phaser from "phaser";
import { doomPuddleBackground, northSafePoint } from "../../constants";

const moveOutOfOut = game => {
  const chariotHitbox = new Phaser.Geom.Circle(game.nail.x, game.nail.y, 200);

  const points = [
    new Phaser.Geom.Point(chariotHitbox.x, chariotHitbox.y - 230),
    new Phaser.Geom.Point(chariotHitbox.x + 150, chariotHitbox.y - 150),
    new Phaser.Geom.Point(chariotHitbox.x + 230, chariotHitbox.y),
    new Phaser.Geom.Point(chariotHitbox.x + 150, chariotHitbox.y + 150),
    new Phaser.Geom.Point(chariotHitbox.x, chariotHitbox.y + 230),
    new Phaser.Geom.Point(chariotHitbox.x - 150, chariotHitbox.y + 150),
    new Phaser.Geom.Point(chariotHitbox.x - 230, chariotHitbox.y),
    new Phaser.Geom.Point(chariotHitbox.x - 150, chariotHitbox.y - 150)
  ]

  game.npcAllies.forEach(ally => {
    let closestPoint = points[0];
    let closestDistance = Phaser.Math.Distance.Between(ally.x, ally.y, closestPoint.x, closestPoint.y);

    for (let i = 1; i < points.length; i++) {
      const distance = Phaser.Math.Distance.Between(ally.x, ally.y, points[i].x, points[i].y);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPoint = points[i];
      }
    }

    game.tweens.add({
      targets: ally,
      x: closestPoint.x,
      y: closestPoint.y,
      duration: 2000,
      ease: Phaser.Math.Easing.Linear,
    })
  })
}

export default moveOutOfOut