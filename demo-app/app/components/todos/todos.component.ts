import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { 
  HttpApi,
  Request,
  Get,
  Post,
  Put,
  Patch, 
  Delete
} from 'lib';
import { Observable, of } from 'rxjs';

import { PageParams } from 'lib';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
@HttpApi('capi')
export class TodosComponent implements OnInit {

  todoId: number;

  @PageParams({
    key: 'todoId',
    redirectTo: '/404',
    paramName: 'todoId',
    type: 'number'
  })
  private setTodo(value?: number): void {
    this.todoId = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.setTodo();
    console.log(this.todoId);
  }
}
