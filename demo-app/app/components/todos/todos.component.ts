import { Component, OnInit } from '@angular/core';

import { HttpApi } from 'lib';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
@HttpApi('dapi')
export class TodosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('-----', this)
  }

}
