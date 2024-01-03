/**
 * Simulation for calculating circle's (plane) mass
 * @param r
 * @param factor
 */
function radiusToMass(r: number, factor = 8): number {
  return r * r / factor;
}


export {
  radiusToMass
}
