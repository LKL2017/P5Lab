import { TestBed } from '@angular/core/testing';

import { ParticleHarmonicService } from './particle-harmonic.service';

describe('ParticleHarmonicService', () => {
  let service: ParticleHarmonicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleHarmonicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
