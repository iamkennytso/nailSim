const getNailPositions = (nail, pos = 2) => {
  // 2   1
  //  ◯
  //  0
  return {
    x: nail.x + (100 * (Math.cos(((270 + (((pos * 120)) % 360)) * Math.PI ) / 180))), 
    y: nail.y - (100 * (Math.sin(((270 + (((pos * 120)) % 360)) * Math.PI ) / 180)))
  }
}

export default getNailPositions