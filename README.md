# angular-decorators

Set of useful decorators for Angular

# Supported decorators

1.  @TakeUntilDestroy - unsibscribes from an Observeble on `ngOnDestroy(): void` lificycle hook:

    First you need to decorate your component class which implements `OnDestroy` interface with @TakeUntilDestroy decorator:

    ```typescript
        @TakeUntilDestroy
        export class CounterComponent implements OnInit, OnDestroy {}
    ```

    Next step is to create private field `componentDestroy: Function` in your component and use it in pipe method with rxjs `takeUntil` operator:
    
    ```typescript
        @TakeUntilDestroy
        export class CounterComponent implements OnInit, OnDestroy {

            private _componentDestroy: Function;

            constructor() { }

            ngOnInit() {
                interval(2000).pipe(
                    takeUntil(this._componentDestroy())
                ).subscribe(() => {
                    console.log('Interval tick');
                });
            }

            ngOnDestroy() {
            }
        }
    ```

2.  @TrackChanges - binds execution of component function to @Input field with provided changes strategy:
    
    ```typescript
        export class CounterComponent implements OnChanges {

            @Input()
            counter: number;

            constructor() { }

            ngOnInit() {
            }

            @TrackChanges<number>('counter', 'counterChange', ChangesStrategy.NotFirst)
            ngOnChanges() {
            }

            counterChange(): void {
                console.log(`Counter changed to ${this.counter}`);
            }
        }
    ```

    In this snippet `counterChange` method will be called on every data-bound property change of `@Input() counter` field using `ChangesStrategy.NotFirst`.
    Supported changes strategies:

    ```typescript
        export enum ChangesStrategy {
            First = 'First',
            Each = 'Each',
            NotFirst = 'NotFirst'
        }

    ```
    `ChangesStrategy.Each` - default changes strategy.
