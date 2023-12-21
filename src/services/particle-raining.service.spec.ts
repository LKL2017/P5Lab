import { TestBed } from '@angular/core/testing';

import { ParticleRainingService } from './particle-raining.service';

describe('ParticleRainingService', () => {
  let service: ParticleRainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleRainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
