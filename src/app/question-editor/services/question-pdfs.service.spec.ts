import { TestBed } from '@angular/core/testing';

import { QuestionPdfsService } from './question-pdfs.service';

describe('QuestionPdfsService', () => {
  let service: QuestionPdfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionPdfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
