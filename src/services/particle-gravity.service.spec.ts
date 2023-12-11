import { TestBed } from '@angular/core/testing';

import { ParticleGravityService } from './particle-gravity.service';

describe('ParticleGravityService', () => {
  let service: ParticleGravityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleGravityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
