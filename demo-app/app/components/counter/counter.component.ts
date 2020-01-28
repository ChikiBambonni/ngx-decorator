import {
  Component,
  OnInit,
  Input,
  OnChanges,
  OnDestroy,
  ErrorHandler
} from '@angular/core';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { 
  TakeUntilDestroy,
  TrackChanges,
  Safe,
  Cache,
  SafeLogLevel,
  ChangesStrategy
} from 'lib';
SafeLogLevel

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

  constructor(private errorHandler: ErrorHandler) { }

  ngOnInit() {
    interval(2000).pipe(
      takeUntil(this.componentDestroy())
    ).subscribe(() => {
      console.log('Interval tick');
    });

    const result = this.throwErr();

    console.log(
      this.add(10, 20),
      this.add(20, 30),
      this.add('str', 10),
      this.add(11, 20),
    );
  }

  @TrackChanges<number>('counter', 'counterChange', ChangesStrategy.NotFirst)
  ngOnChanges() {
  }

  ngOnDestroy() {
  }

  counterChange(): void {
    console.log(`Counter changed to ${this.counter}`);
  }

  @Safe<boolean>({
    logLevel: SafeLogLevel.ErrorHandler,
    returnValue: false
  })
  throwErr() {
    throw new Error('err thorwn');
  }

  @Safe<number>({ returnValue: null })
  @Cache({
    cacheKey: 'myKey',
    useParamsAsKeys: true
  })
  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('invalid arguments');
    }

    return a + b;
  }
}
