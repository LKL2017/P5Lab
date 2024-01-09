import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonicHandlerComponent } from './harmonic-handler.component';

describe('HarmonicHandlerComponent', () => {
  let component: HarmonicHandlerComponent;
  let fixture: ComponentFixture<HarmonicHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HarmonicHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HarmonicHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
