import { TestBed } from '@angular/core/testing';

import { ParticleImageService } from './particle-image.service';

describe('ParticleImageService', () => {
  let service: ParticleImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
