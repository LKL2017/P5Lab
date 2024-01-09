import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityHandlerComponent } from './gravity-handler.component';

describe('GravityHandlerComponent', () => {
  let component: GravityHandlerComponent;
  let fixture: ComponentFixture<GravityHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GravityHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GravityHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
