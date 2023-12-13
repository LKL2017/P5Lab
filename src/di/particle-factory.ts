import {ActivatedRoute} from "@angular/router";
import {ParticleGravityService} from "../services/particle-gravity.service";
import {ParticleHarmonicService} from "../services/particle-harmonic.service";
import {ParticleImageService} from "../services/particle-image.service";
import {ParticleService} from "../services/particle.service";

export const ParticleFactory = (route: ActivatedRoute) => {
  let type = '';
  route.params.subscribe(params => {
    type = params['type'];
  });
  switch (type) {
    case 'harmonic':
      return new ParticleHarmonicService()
    case 'gravity':
      return new ParticleGravityService()
    case 'dancing':
      return new ParticleImageService()
    default:
      return new ParticleService()
  }
}
