import { TestBed } from '@angular/core/testing';

import { HttprequestService } from './httprequest.service';

describe('HttprequestService', () => {
  let service: HttprequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttprequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
