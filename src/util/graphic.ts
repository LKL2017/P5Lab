function calcRelativeBrightness(r: number, g: number, b: number): number {
  return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b) / 100;
}

export {
  calcRelativeBrightness
}
