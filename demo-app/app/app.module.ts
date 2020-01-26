import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';

class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log('Handling error:', error);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
