import { TestBed } from '@angular/core/testing';

import { LastConversionsService } from './last-conversions.service';

describe('LastConversions', () => {
  let service: LastConversionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastConversionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
