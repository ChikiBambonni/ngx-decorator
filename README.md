# angular-decorators

Set of useful decorators for Angular

# Supported decorators

1.  `@TakeUntilDestroy` - unsibscribes from an Observeble on `ngOnDestroy(): void` lificycle hook:

    First you need to decorate your component class which implements `OnDestroy` interface with `@TakeUntilDestroy` decorator:

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

2.  `@TrackChanges` - binds execution of component function to `@Input` field with provided changes strategy:
    
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

3.  `@Safe` - catches application errors and forwards them to proper errorHandler depending on `SafeLogLevel` provided:

    Decorator accepts 1 argumaent of type ``:
    
    ```typescript
        export interface SafeParams<T> {
            logLevel?: SafeLogLevel; // Decorator LogLevel (see below)
            returnValue?: T; // returnValue if error was thrown
        }
    ```

    Available Log Levels: 

    ```typescript
        export enum SafeLogLevel {
            Default = 'Default', // if error was thrown only get returnValue
            Console = 'Console', // log error to console
            ErrorHandler = 'ErrorHandler' // forward error to errorHandler. Class with 'Safe' decorator and logLevel 'ErrorHandler' should have 'errorHandler' class property with 'ErrorHandler' class.
        }
    ```
    
    Decorate any method in component with `@Safe` decorator in following way:

    ```typescript

        export class CounterComponent implements OnInit, OnChanges, OnDestroy {

            constructor(private errorHandler: ErrorHandler) { }

            ngOnInit() {
                const result = this.throwErr(); // result value is false
            }

            @Safe<boolean>({
                logLevel: SafeLogLevel.ErrorHandler,
                returnValue: false
            })
            throwErr() {
                throw new Error('err thorwn');
            }
        }
    ```

    Then see error in your ErrorHandler class:

    ```typescript
        class MyErrorHandler implements ErrorHandler {
            handleError(error) {
                console.log('Handling error:', error);
            }
        }
    ```