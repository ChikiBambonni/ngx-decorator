import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TrackChanges, TakeUntilDestroy } from 'lib';
import { ChangesStrategy } from 'lib/enums/changes-strategy.enum';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
@TakeUntilDestroy
export class CounterComponent implements OnInit, OnChanges, OnDestroy {

  private componentDestroy: Function;

  @Input()
  counter: number;

  constructor() { }

  ngOnInit() {
    interval(2000).pipe(
      takeUntil(this.componentDestroy())
    ).subscribe(() => {
      console.log('Interval tick');
    });
  }

  @TrackChanges<number>('counter', 'counterChange', ChangesStrategy.NotFirst)
  ngOnChanges() {
  }

  ngOnDestroy() {
  }

  counterChange(): void {
    console.log(`Counter changed to ${this.counter}`);
  }
}
