import { TestBed } from '@angular/core/testing';

import { RealtimeSpecialistsService } from './realtime-specialists.service';

describe('RealtimeSpecialistsService', () => {
  let service: RealtimeSpecialistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeSpecialistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
