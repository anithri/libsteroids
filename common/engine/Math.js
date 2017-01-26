// From http://codepen.io/bungu/pen/rawvJe
export const randomNumberBetween = (minimum, maximum) => Math.random() * (maximum - minimum + 1) + minimum

// From http://codepen.io/bungu/pen/rawvJe
export const randomNumberBetweenExcluding = (minimum, maximum, excludeMinimum, excludeMaximum) =>
{
  let random = randomNumberBetween(minimum, maximum)

  while (random > excludeMinimum && random < excludeMaximum)
    random = Math.random() * (maximum - minimum + 1) + minimum

  return random
}

// From http://codepen.io/bungu/pen/rawvJe
export const rotatePoint = (point, center, angle) => ({
  x: ((point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle)) + center.x,
  y: ((point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle)) + center.y
})

// From https://github.com/substack/point-in-polygon/blob/master/index.js
export const isPointInPolygon = (point, polygon) =>
{
  const {x, y} = point
  let inside = false
  let i, j, xi, yi, xj, yj

  for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++)
  {
    xi = polygon[i].x
    yi = polygon[i].y
    xj = polygon[j].x
    yj = polygon[j].y

    if ((yi > y) != (yj > y)
    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi))
      inside = !inside
  }

  return inside
}

// From http://codepen.io/bungu/pen/rawvJe
export const doLinesIntersect = (vertex1, vertex2, vertex3, vertex4) =>
{
  const n1 = (vertex4.x - vertex3.x) * (vertex1.y - vertex3.y) - (vertex4.y - vertex3.y) * (vertex1.x - vertex3.x)
  const n2 = (vertex4.x - vertex3.x) * (vertex2.y - vertex3.y) - (vertex4.y - vertex3.y) * (vertex2.x - vertex3.x)
  const n3 = (vertex2.x - vertex1.x) * (vertex3.y - vertex1.y) - (vertex2.y - vertex1.y) * (vertex3.x - vertex1.x)
  const n4 = (vertex2.x - vertex1.x) * (vertex4.y - vertex1.y) - (vertex2.y - vertex1.y) * (vertex4.x - vertex1.x)

  return (n1 * n2 < 0) && (n3 * n4 < 0)
}

export const doPolygonsIntersect = (vertices1, vertices2) =>
{
  for (let i = 0, j = vertices1.length - 1; i < vertices1.length; j = i++)
    for (let k = 0, l = vertices2.length - 1; k < vertices2.length; l = k++)
      if (doLinesIntersect(vertices1[i], vertices1[j], vertices2[k], vertices2[l]))
        return true

  return false
}
