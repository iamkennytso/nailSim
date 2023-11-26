import Phaser from 'phaser'

function drawCircularLine(graphics, x, y, radius, segments) {
  var angle = 0;
  var increment = (2 * Math.PI) / segments;

  var line = new Phaser.Geom.Line();

  for (var i = 0; i < segments; i++) {
      var px = x + radius * Math.cos(angle);
      var py = y + radius * Math.sin(angle);

      Phaser.Geom.Line.setTo(line, x, y, px, py);

      graphics.strokeLineShape(line);

      angle += increment;
  }

  return line;
}

export default drawCircularLine