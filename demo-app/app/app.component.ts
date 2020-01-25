import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  counter = 0;
  show = true;

  toggleCounter() {
    this.show = !this.show;
  }

  increment(): void {
    this.counter++;
  }
}
