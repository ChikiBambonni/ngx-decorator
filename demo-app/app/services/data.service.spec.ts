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
    service.getOne({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });
  
    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('GET');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Post decorator', (done) => {
    service.addAll({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('POST');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Put decorator', (done) => {
    service.replaceAll({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PUT');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Patch decorator', (done) => {
    service.replaceOne({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PATCH');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Delete decorator', (done) => {
    service.removeAll({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('DELETE');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with GET method', (done) => {
    service.getOneRequest({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('GET');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with POST method', (done) => {
    service.addAllRequest({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('POST');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with PUT method', (done) => {
    service.replaceAllRequest({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PUT');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with PATCH method', (done) => {
    service.replaceOneRequest({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PATCH');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with DELETE method', (done) => {
    service.removeAllRequest({
      value: 200
    }).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('DELETE');
    expect(+req.request.params.get('value')).toEqual(200);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });
});
