import { TestBed, getTestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { mockData } from '../mock/mock.data';
import { apiTestEndpoint, apiBaseUrl } from './data.constants';

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
    service.getOne().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });
  
    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('GET');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Post decorator', (done) => {
    service.addAll().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('POST');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Put decorator', (done) => {
    service.replaceAll().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PUT');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Patch decorator', (done) => {
    service.replaceOne().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PATCH');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Delete decorator', (done) => {
    service.removeAll().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('DELETE');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with GET method', (done) => {
    service.getOneRequest().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('GET');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with POST method', (done) => {
    service.addAllRequest().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('POST');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with PUT method', (done) => {
    service.replaceAllRequest().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PUT');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with PATCH method', (done) => {
    service.replaceOneRequest().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PATCH');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with DELETE method', (done) => {
    service.removeAllRequest().subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(`${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('DELETE');

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });
});
