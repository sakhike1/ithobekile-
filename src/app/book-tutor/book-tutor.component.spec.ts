import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTutorComponent } from './book-tutor.component';

describe('BookTutorComponent', () => {
  let component: BookTutorComponent;
  let fixture: ComponentFixture<BookTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
