import { Component, OnInit } from '@angular/core';
  
import { HttpClient } from '@angular/common/http';

import { HttpApi, Get } from 'lib';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
@HttpApi('api')
export class TodosComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // this.getAll().subscribe(data => {
    //   console.log('Retrieving data - ', data);
    // });

    console.log(this.getAll());
  }

  @Get('db/col')
  getAll() {
    return of();
  }
}
