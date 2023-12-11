import { Injectable } from '@angular/core';
import {ParticleService} from "./particle.service";

@Injectable()
export class ParticleHarmonicService extends ParticleService {

  constructor() {
    super();
  }

  override update() {

  }

  override render() {
    console.log('[render] harmonic')
  }
}
