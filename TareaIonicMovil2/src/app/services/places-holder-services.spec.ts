import { TestBed } from '@angular/core/testing';

import { PlacesHolderServices } from './places-holder-services';

describe('PlacesHolderServices', () => {
  let service: PlacesHolderServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacesHolderServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
