import { TestBed } from '@angular/core/testing';

import { PlacesHolderService } from './places-holder-service';

describe('PlacesHolderService', () => {
  let service: PlacesHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacesHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
