# angular-decorators

Set of useful decorators for Angular

# Supported decorators

1.  `@TakeUntilDestroy` - unsibscribes from an Observeble on `ngOnDestroy` lificycle hook:

    First you need to decorate your component class which implements `OnDestroy` interface with `@TakeUntilDestroy` decorator:
    ```typescript
    @TakeUntilDestroy
    export class CounterComponent implements OnInit, OnDestroy {}
    ```

    Next step is to create private field `_componentDestroy: Function` in your component and use it in pipe method with rxjs `takeUntil` operator:
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

2.  `@TrackChanges` - binds `@Input` field to execution of component method with provided changes strategy:
    
    Decorator accepts 3 argumaents:
        - `key` - name of `@Input()` field
        - `methodName` - name of method to be called when 
        - `strategy` - `ChangesStrategy` enum
    ```typescript
    export enum ChangesStrategy {
        First = 'First', // listen only first change
        Each = 'Each', // listen each change
        NotFirst = 'NotFirst' // listen all changes except first
    }
    ```
    In this snippet `counterChange` method will be called on every data-bound property change of `@Input() counter` field using `ChangesStrategy.NotFirst`:
    ```typescript
    export class CounterComponent implements OnChanges {

        @Input()
        counter: number;

        constructor() { }

        @TrackChanges<number>('counter', 'counterChange', ChangesStrategy.NotFirst)
        ngOnChanges() {
        }

        counterChange(): void {
            console.log(`Counter changed to ${this.counter}`);
        }
    }
    ```

3.  `@Safe` - catches application errors and forwards them to proper errorHandler depending on `SafeLogLevel` provided:

    Decorator accepts 1 argumaent of type `SafeParams<T>`:
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
4.  `@Cache` - caches results of functions:

    Decorator accepts 1 argumaent of type `CacheParams<T>`:
    ```typescript
    export interface CacheParams {
        cacheKey?: string; // key name used to access cache data. You can provide your own or keep default (then name of called method will be used)
        useParamsAsKeys?: boolean; // if true cache will be stored depending on method arguments, if false every call to function will extract data from cache.
    }

    ```

    Store result of a function in cache: 
    ```typescript
    export class CounterComponent implements OnInit {

        constructor() { }

        ngOnInit() {
            console.log(
                this.add(10, 20),
                this.add(20, 30),
                this.add('str', 10),
                this.add(10, 20),
            );
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
    ```
    In this snippet result of forth call to `this.add` will be retrived from cache.