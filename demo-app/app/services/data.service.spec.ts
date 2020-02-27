import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

import { DataService } from './data.service';
import { mockData } from '../mock/mock.data';
import { apiTestEndpoint, apiBaseUrl } from './data.constants';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;

  const getParamsAsJSON: any = (params: HttpParams) => params.keys().map((key: string) => ({ [key]: params.get(key) })).shift();

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
    const params = {
      value: 200
    };

    service.getOne(params).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });
  
    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('GET');
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Post decorator', (done) => {
    const params = {
      value: 200
    };
    const body = { 
      data: [] 
    };
    
    service.addAll(params, body).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Put decorator', (done) => {
    const params = {
      value: 200
    };
    const body = {
      data: []
    };

    service.replaceAll(params, body).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Patch decorator', (done) => {
    const params = {
      value: 200
    };
    const body = {
      data: []
    };

    service.replaceOne(params, body).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Delete decorator', (done) => {
    const params = {
      value: 200
    };

    service.removeAll(params).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('DELETE');
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with GET method', (done) => {
    const params = {
      value: 200
    };

    service.getOneRequest(params).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toBeNull();
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with POST method', (done) => {
    const params = {
      value: 200
    };
    const body = {
      data: []
    };

    service.addAllRequest(params, body).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with PUT method', (done) => {
    const params = {
      value: 200
    };
    const body = {
      data: []
    };

    service.replaceAllRequest(params, body).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with PATCH method', (done) => {
    const params = {
      value: 200
    };
    const body = {
      data: []
    };

    service.replaceOneRequest(params, body).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });

  it('should return data from @Request decorator with DELETE method', (done) => {
    const params = {
      value: 200
    };

    service.removeAllRequest(params).subscribe(data => {
      expect(data).toBe(mockData);

      done();
    });

    const req = httpMock.expectOne(req => req.url === `${apiBaseUrl}/${apiTestEndpoint}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toBeNull();
    expect(getParamsAsJSON(req.request.params)).toEqual(params);

    req.flush(mockData, { status: 200, statusText: 'Success' });
  });
});
