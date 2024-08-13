import { TestBed } from '@angular/core/testing';

import { PocketAuth7Service } from './pocket-auth7.service';

describe('PocketAuth7Service', () => {
  let service: PocketAuth7Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketAuth7Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
