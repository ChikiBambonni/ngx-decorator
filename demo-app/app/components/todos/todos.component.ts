import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { HttpApi, Get, Request } from 'lib';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
@HttpApi('capi')
export class TodosComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAll({
      page: 1
    }).subscribe(data => {
      console.log('Retrieving data - ', data);
    });

    this.getViaRequest({
      page: 9
    }).subscribe(data => {
      console.log('Retrieving data via request - ', data);
    });

    this.addOne(null, [20, 30, 40]).subscribe(data => {
      console.log("POST Data - ", data);
    });
  }

  @Get('mongoAPI_tests/Users')
  getAll(params?: object): Observable<any> {
    return of();
  }

  @Request('GET', 'mongoAPI_tests/Users')
  getViaRequest(params?: object, body?: object): Observable<any> {
    return of();
  }

  @Request('POST', 'mongoAPI_tests/Users')
  addOne(params?: object, body?: object): Observable<any> {
    return of();
  }
}
