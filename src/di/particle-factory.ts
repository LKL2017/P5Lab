import {ActivatedRoute} from "@angular/router";
import {ArtifactType} from "@di/mock";
import {ParticleGravityService} from "@services/particle-gravity.service";
import {ParticleHarmonicService} from "@services/particle-harmonic.service";
import {ParticleImageService} from "@services/particle-image.service";
import {ParticleRainingService} from "@services/particle-raining.service";
import {ParticleSolarService} from "@services/particle-solar.service";
import {ParticleService} from "@services/particle.service";

export const ParticleFactory = (route: ActivatedRoute) => {
  console.log('call particle factory')
  let type!: ArtifactType;
  route.params.subscribe(params => {
    type = params['type'];
  });
  switch (type) {
    case 'harmonic':
      return new ParticleHarmonicService()
    case 'gravity':
      return new ParticleGravityService()
    case 'pixel':
      return new ParticleImageService()
    case 'raining':
      return new ParticleRainingService()
    case "solar":
      return new ParticleSolarService()
    default:
      return new ParticleService()
  }
}
