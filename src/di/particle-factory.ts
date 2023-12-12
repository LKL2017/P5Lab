import {EffectService} from "../services/effect.service";
import {ParticleGravityService} from "../services/particle-gravity.service";
import {ParticleHarmonicService} from "../services/particle-harmonic.service";
import {ParticleImageService} from "../services/particle-image.service";
import {ParticleService} from "../services/particle.service";

export const ParticleFactory = (effectService: EffectService) => {
  switch (effectService.type) {
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
