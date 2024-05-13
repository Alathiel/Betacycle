import { TestBed } from '@angular/core/testing';

import { LoggedInterceptorService } from './logged-interceptor.service';

describe('LoggedInterceptorService', () => {
  let service: LoggedInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
