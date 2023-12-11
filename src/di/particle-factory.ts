import {EffectService} from "../services/effect.service";
import {ParticleGravityService} from "../services/particle-gravity.service";
import {ParticleHarmonicService} from "../services/particle-harmonic.service";
import {ParticleImageService} from "../services/particle-image.service";
import {ParticleService} from "../services/particle.service";

export const ParticleFactory = (effectService: EffectService) => {
  console.log('factory', effectService.type)
  // TODO: for DI test
  switch (effectService.type) {
    case 1:
      return new ParticleHarmonicService()
    case 2:
      return new ParticleGravityService()
    case 3:
      return new ParticleImageService()
    default:
      return new ParticleService()
  }
}
