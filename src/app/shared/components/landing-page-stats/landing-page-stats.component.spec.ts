import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageStatsComponent } from './landing-page-stats.component';

describe('LandingPageStatsComponent', () => {
  let component: LandingPageStatsComponent;
  let fixture: ComponentFixture<LandingPageStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
