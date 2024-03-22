import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageFeatureCardComponent } from './landing-page-feature-card.component';

describe('LandingPageFeatureCardComponent', () => {
  let component: LandingPageFeatureCardComponent;
  let fixture: ComponentFixture<LandingPageFeatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageFeatureCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageFeatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
