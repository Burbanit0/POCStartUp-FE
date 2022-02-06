import { TestBed } from '@angular/core/testing';

import { WorkteamService } from './workteam.service';

describe('WorkteamService', () => {
  let service: WorkteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
