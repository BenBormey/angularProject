import { TestBed } from '@angular/core/testing';

import { Branchservice } from './branchservice';

describe('Branchservice', () => {
  let service: Branchservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Branchservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
