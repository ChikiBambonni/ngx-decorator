import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { mockData } from './mock.data';

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {
    constructor () {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const pagesize = +req.params.get('page');
        let data = mockData;

        if (req.method === 'GET') {
            data = data.filter((element: number) => element === pagesize);
        } else if (req.method === 'POST') {
            data = data.concat(...req.body);
        } else if (req.method === 'PUT') {
            data = req.body;
        } else if (req.method === 'PATCH') {
            data = data.map((element: number) => req.body.value);
        } else if (req.method === 'DELETE') {
            data = [];
        }

        return of(new HttpResponse({
            status: 200,
            body: data
        }))
        .pipe(delay(3000));
    }
}
