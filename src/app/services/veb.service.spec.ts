import { TestBed } from '@angular/core/testing';

import { VebService } from './veb.service';

describe('VebService', () => {
  let service: VebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
