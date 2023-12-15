import { Injectable } from '@angular/core';
import P5 from 'p5';

export interface PlainParticle {
  x: number;
  y: number;
}

export abstract class _P5Particle {
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  update() {}
  render() {}
}

@Injectable({
  providedIn: 'root',
})
export class ParticleService {
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  constructor() { }
  initP5Env(w: number, h: number, e: HTMLCanvasElement) {}
}
