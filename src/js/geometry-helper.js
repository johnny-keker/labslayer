export function generateSquare(x, y) {
  return [
    // left triangle
    x, y, 0.0,
    x + 1.0, y, 0.0,
    x, y + 1.0, 0.0,
    // right triangle
    x + 1.0, y + 1.0, 0.0,
    x, y + 1.0, 0.0,
    x + 1.0, y, 0.0,
  ]
}

export function generateTexcoor(x, y) {
  x /= 100;
  y /= 100;
  x += 0.5;
  y += 0.5;
  return [
    x, y,
    x + 0.01, y,
    x, y + 0.01,

    x + 0.01, y + 0.01,
    x, y + 0.01,
    x + 0.01, y
  ]
}

export function generatePlane(x, y) {
  var positions = new Float32Array(x * y * 18);
  var texcoors = new Float32Array(x * y * 12);
  var filledPos = 0;
  var filledCoors = 0;
  for (var i = -x / 2; i < x / 2; i++) {
    for (var j = -y / 2; j < y / 2; j++) {
      positions.set(generateSquare(i, j), filledPos);
      texcoors.set(generateTexcoor(i, j), filledCoors);
      filledPos += 18;
      filledCoors += 12;
    }
  };

  return { positions: positions, texcoors: texcoors };
}