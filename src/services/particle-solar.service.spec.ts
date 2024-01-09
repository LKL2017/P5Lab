import { TestBed } from '@angular/core/testing';

import { ParticleSolarService } from './particle-solar.service';

describe('ParticleSolarService', () => {
  let service: ParticleSolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleSolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
