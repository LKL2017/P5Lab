import { Injectable } from '@angular/core';
import P5 from 'p5';

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
export class ParticleService<T extends CanvasRenderingContext2D | WebGLRenderingContext> {
  context: T;
  width: number;
  height: number;
  P5instance: P5;
  constructor() { }
  initP5Env(w: number, h: number, e: HTMLCanvasElement) {}
  destroyP5Env() {}
}
