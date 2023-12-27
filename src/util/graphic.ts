function calcRelativeBrightness(r: number, g: number, b: number): number {
  return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b) / 100;
}

function genRandomLinearGradient(
  context: CanvasRenderingContext2D,
  x0 : number, y0 : number, x1 : number, y1 : number
  ): CanvasGradient {
  const g = context.createLinearGradient(x0, y0, x1, y1);
  const stopCount = Math.round(Math.random() * 3) + 3;
  const h = () => Math.floor(Math.random() * 360);

  for (let i = 0; i < stopCount; i++) {
    const color = `hsl(${h()}deg, 80%, 50%)`;
    g.addColorStop(1 / stopCount * i, color);
  }

  return g;
}

export {
  calcRelativeBrightness,
  genRandomLinearGradient
}
