import { Injectable } from '@angular/core';
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

  constructor() { }

  @Get('database/collection')
  getAll(params?: object): Observable<any> {
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

  @Delete('mongoAPI_tests/Users')
  removeAll(params?: object): Observable<any> {
    return of();
  }
}
