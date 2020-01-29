import { Component, OnInit } from '@angular/core';
  
import { HttpClient } from '@angular/common/http';

import { HttpApi, Get } from 'lib';
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
      pagesize: 1
    }).subscribe(data => {
      console.log('Retrieving data - ', data);
    });
  }

  @Get('mongoAPI_tests/Users')
  getAll(params?: object): Observable<any> {
    return of();
  }
}
