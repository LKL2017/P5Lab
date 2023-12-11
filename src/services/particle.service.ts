import { Injectable } from '@angular/core';

export interface Particle {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class ParticleService {
  constructor() { }

  update(particle: Particle) {
  }

  render() {
    console.log('[particle] render')
  }
}
