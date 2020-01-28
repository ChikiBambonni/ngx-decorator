import { Component, NgZone, OnInit } from '@angular/core';

import { OutsideAngular } from 'lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  counter = 0;
  show = true;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.processOutsideOfAngularZone();
  }

  toggleCounter() {
    this.show = !this.show;
  }

  increment(): void {
    this.counter++;
  }

  @OutsideAngular
  processOutsideOfAngularZone() {
    this.increaseProgress(() => {
      this.ngZone.run(() => { console.log('Outside Done!'); });
    });
  }

  increaseProgress(doneCallback: () => void) {
    this.counter += 1;
    console.log(`Current progress: ${this.counter}%`);

    if (this.counter < 10) {
      window.setTimeout(() => this.increaseProgress(doneCallback), 1000);
    } else {
      doneCallback();
    }
  }
}
