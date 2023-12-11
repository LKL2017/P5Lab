import { Injectable } from '@angular/core';
import {ParticleService} from "./particle.service";

@Injectable()
export class ParticleGravityService extends ParticleService {

  constructor() {
    super();
  }

  override render() {
    console.log('[render] gravity')
  }
}
