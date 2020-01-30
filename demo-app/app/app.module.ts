import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { TodosComponent } from './components/todos/todos.component';
import { MockDataInterceptor } from './mock.interceptor';

class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log('Handling error:', error);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: MyErrorHandler
  }, { 
    provide: HTTP_INTERCEPTORS,
    useClass: MockDataInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
