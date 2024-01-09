import { Injectable } from '@angular/core';
import P5 from 'p5';

type ParticleContext = CanvasRenderingContext2D | WebGL2RenderingContext;

export abstract class _P5Particle {
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  protected constructor() {
  }
  update() {}
  render() {}
}

@Injectable({
  providedIn: 'root',
})
export class ParticleService<T extends ParticleContext> {
  context: T;
  width: number;
  height: number;
  P5instance: P5;
  constructor() { }
  initP5Env(w: number, h: number, e: HTMLCanvasElement) {}
  destroyP5Env() {}
}
