const Z_MAX = 6

function poz(z) {
  let y, x, w

  if (z == 0.0) {
    x = 0.0
  } else {
    y = 0.5 * Math.abs(z)
    if (y > Z_MAX * 0.5) {
      x = 1.0
    } else if (y < 1.0) {
      w = y * y
      x =
        ((((((((0.000124818987 * w - 0.001075204047) * w + 0.005198775019) * w -
          0.019198292004) *
          w +
          0.059054035642) *
          w -
          0.151968751364) *
          w +
          0.319152932694) *
          w -
          0.5319230073) *
          w +
          0.797884560593) *
        y *
        2.0
    } else {
      y -= 2.0
      x =
        (((((((((((((-0.000045255659 * y + 0.00015252929) * y -
          0.000019538132) *
          y -
          0.000676904986) *
          y +
          0.001390604284) *
          y -
          0.00079462082) *
          y -
          0.002034254874) *
          y +
          0.006549791214) *
          y -
          0.010557625006) *
          y +
          0.011630447319) *
          y -
          0.009279453341) *
          y +
          0.005353579108) *
          y -
          0.002141268741) *
          y +
          0.000535310849) *
          y +
        0.999936657524
    }
  }
  return z > 0.0 ? (x + 1.0) * 0.5 : (1.0 - x) * 0.5
}

export const critz = p => {
  const Z_EPSILON = 0.000001 /* Accuracy of z approximation */
  let minz = -Z_MAX
  let maxz = Z_MAX
  let zval = 0.0
  let pval
  if (p < 0.0) p = 0.0
  if (p > 1.0) p = 1.0

  while (maxz - minz > Z_EPSILON) {
    pval = poz(zval)
    if (pval > p) {
      maxz = zval
    } else {
      minz = zval
    }
    zval = (maxz + minz) * 0.5
  }
  return zval
}
