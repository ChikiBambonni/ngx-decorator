import { TestBed, getTestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { mockData } from '../mock/mock.data';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    
  });
  
  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should return data from @Get decorator', (done) => {
    const page = 1;
    service.getOne().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne('api/database/collection');

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('GET');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });
});
