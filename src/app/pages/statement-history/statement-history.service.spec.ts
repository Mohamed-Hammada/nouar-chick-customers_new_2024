import { TestBed } from '@angular/core/testing';

import { StatementHistoryService } from './statement-history.service';

describe('StatementHistoryService', () => {
  let service: StatementHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
