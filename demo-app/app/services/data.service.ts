import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { 
  HttpApi,
  Get,
  Post,
  Put,
  Patch,
  Delete
} from 'lib/decorators/http.decorators';

@Injectable({
  providedIn: 'root'
})
@HttpApi('api')
export class DataService {

  constructor(private httpClient: HttpClient) { }

  @Get('database/collection')
  getOne(params?: object): Observable<any> {
    return of();
  }

  @Post('database/collection')
  addAll(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Put('database/collection')
  replaceAll(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Patch('database/collection')
  replaceOne(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Delete('database/collection')
  removeAll(params?: object): Observable<any> {
    return of();
  }
}
