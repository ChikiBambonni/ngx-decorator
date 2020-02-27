import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { 
  HttpApi,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Request
} from 'lib/decorators/http.decorators';
import { apiTestEndpoint, apiBaseUrl } from './data.constants';

@Injectable({
  providedIn: 'root'
})
@HttpApi(apiBaseUrl)
export class DataService {

  constructor(private httpClient: HttpClient) { }

  @Get(apiTestEndpoint)
  getOne(params?: object): Observable<any> {
    return of();
  }

  @Post(apiTestEndpoint)
  addAll(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Put(apiTestEndpoint)
  replaceAll(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Patch(apiTestEndpoint)
  replaceOne(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Delete(apiTestEndpoint)
  removeAll(params?: object): Observable<any> {
    return of();
  }

  @Request('GET', apiTestEndpoint)
  getOneRequest(params?: object): Observable<any> {
    return of();
  }

  @Request('POST', apiTestEndpoint)
  addAllRequest(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Request('PUT', apiTestEndpoint)
  replaceAllRequest(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Request('PATCH', apiTestEndpoint)
  replaceOneRequest(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Request('DELETE', apiTestEndpoint)
  removeAllRequest(params?: object): Observable<any> {
    return of();
  }
}
