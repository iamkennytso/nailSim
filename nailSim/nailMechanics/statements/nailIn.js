const nailIn = (game) => {
  const metalCircle = game.graphics = game.add.graphics();

  game.graphics.lineStyle(100, '0xebf1ed', 1);

  game.graphics.strokeCircle(game.nail.x, game.nail.y, 200);
  console.log(game.player)
  console.log(metalCircle)
  const metalCircleOverlaps = game.physics.overlap(game.player, metalCircle, () => console.log('yeayea'))
  console.log(metalCircleOverlaps)
}

export default nailIn