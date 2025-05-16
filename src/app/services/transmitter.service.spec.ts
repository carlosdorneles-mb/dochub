import {TestBed} from '@angular/core/testing';

import {TransmitterService} from './transmitter.service';

describe('SharedService', () => {
  let service: TransmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
