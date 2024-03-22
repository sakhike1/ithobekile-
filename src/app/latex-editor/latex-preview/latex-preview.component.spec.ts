import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatexPreviewComponent } from './latex-preview.component';

describe('LatexPreviewComponent', () => {
  let component: LatexPreviewComponent;
  let fixture: ComponentFixture<LatexPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatexPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatexPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
