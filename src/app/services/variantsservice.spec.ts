import { TestBed } from '@angular/core/testing';

import { Variantsservice } from './variantsservice';

describe('Variantsservice', () => {
  let service: Variantsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Variantsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
