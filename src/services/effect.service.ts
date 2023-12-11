import { Injectable } from '@angular/core';
import {Particle} from "./particle.service";

@Injectable({
  providedIn: 'root'
})
export class EffectService {
  context!: CanvasRenderingContext2D;
  width!: number;
  height!: number;
  particles!: Particle[];
  type = 1;

  constructor() { }

  init(context: CanvasRenderingContext2D, w: number, h: number) {
    this.context = context;
    this.width = w;
    this.height = h;
  }

  setEffectType() {
    this.type = 1;
  }

  genParticles() {}

  update(updateFn: (arg: Particle) => void) {
    this.particles.forEach(p => updateFn(p));
  }

  render(renderFn: (arg: Particle) => void) {
    this.particles.forEach(p => renderFn(p));
  }
}
