# ngx-decorator
Set of useful decorators for Angular.

[![NPM Downloads/Month]](https://www.npmjs.com/package/ngx-decorator)
[![NPM Downloads]](https://www.npmjs.com/package/ngx-decorator)

# Installation
```bash
npm install ngx-decorator --save
```

# Supported decorators
- [Lifecycle hooks decorators](#lifecycle-hooks)
  * [@TakeUntilDestroy](#take-until-destroy-decorator)
  * [@TrackChanges](#track-changes-decorator)
- [Utils decorators](#utils-decorators)
  * [@Safe](#safe-decorator)
  * [@Cache](#cache-decorator)
  * [@OutsideAngular](#outside-angular-decorator)
- [HTTP decorators](#http-decorators)
  * [@Get](#get-decorator)
  * [@Post](#post-decorator)
  * [@Put](#put-decorator)
  * [@Patch](#patch-decorator)
  * [@Delete](#delete-decorator)
  * [@Request](#request-decorator)

## Lifecycle hooks decorators
Decorators for Angular lifecycle management

<a name="take-until-destroy-decorator"/>

### @TakeUntilDestroy
`@TakeUntilDestroy` - unsibscribes from an Observeble on `ngOnDestroy` lificycle hook:
First you need to decorate your component class which implements `OnDestroy` interface with `@TakeUntilDestroy` decorator:
```typescript
import { TakeUntilDestroy } from 'ngx-decorator';

@TakeUntilDestroy
export class CounterComponent implements OnInit, OnDestroy {}
```
Next step is to create private field `componentDestroy: Function` in your component and use it in pipe method with rxjs `takeUntil` operator:
```typescript
import { TakeUntilDestroy } from 'ngx-decorator';

@TakeUntilDestroy
export class CounterComponent implements OnInit, OnDestroy {

    private componentDestroy: Function;

    constructor() { }

    ngOnInit() {
        interval(2000).pipe(
            takeUntil(this.componentDestroy())
        ).subscribe(() => {
            console.log('Interval tick');
        });
    }

    ngOnDestroy() {
    }
}
```

<a name="track-changes-decorator"/>

### @TrackChanges
`@TrackChanges` - binds `@Input` field to execution of component method with provided changes strategy:
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
import { TrackChanges, ChangesStrategy } from 'ngx-decorator';

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

## Utils decorators
Useful utils decorator for Angular

<a name="safe-decorator"/>

### @Safe
`@Safe` - catches application errors and forwards them to proper errorHandler depending on `SafeLogLevel` provided:
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
import { Safe, SafeLogLevel } from 'ngx-decorator';

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
        throw new Error('err thrown');
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

<a name="cache-decorator"/>

### @Cache
`@Cache` - caches results of functions:
Decorator accepts 1 argumaent of type `CacheParams<T>`:
```typescript
export interface CacheParams {
    cacheKey?: string; // key name used to access cache data. You can provide your own or keep default (then name of called method will be used)
    useParamsAsKeys?: boolean; // if true cache will be stored depending on method arguments, if false every call to function will extract data from cache.
}
```
Store result of a function in cache: 
```typescript
import { Cache, Safe } from 'ngx-decorator';

export class CounterComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        console.log(
            this.add(10, 20),
            this.add(20, 30),
            this.add('str', 10),
            this.add(10, 20), // <------- result of this call will be taken from cache
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

<a name="outside-angular-decorator"/>

### @OutsideAngular
`@OutsideAngular` - escape Angular's zone and do work that doesn't trigger Angular change-detection
Decorator does not accepts parameters:
```typescript
import { OutsideAngular } from 'ngx-decorator';

export class AppComponent implements OnInit {
    counter = 0;

    constructor(private ngZone: NgZone) {}

    ngOnInit() {
        this.processOutsideOfAngularZone();
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
```
In this snippet each tick of `increaseProgress` function willbe executed in Angular's parent zone
## HTTP decorators
To start using http decorators first you need to decorate you class with `@HttpApi` decorator:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpApi } from 'ngx-decorator';

@Injectable()
@HttpApi('api')
export class DataService {

    constructor(private httpClient: HttpClient) { }
}
```
`@HttpApi` decorator is used to define base API url. For example in this url - `/api/user/1488`, `api` is base url. Once base url defined you can start using http decorators:

<a name="get-decorator"/>

### @Get
`@Get` - makes HTTP GET request with HttpParams:
```typescript
...
import { HttpApi, Get } from 'ngx-decorator';

@Injectable()
@HttpApi('api')
export class DataService {

    constructor(private httpClient: HttpClient) { }

    @Get('users')
    getOne(params?: object): Observable<any> { // <-------- makes GET request to /api/users with params defined
        return of();
    }
}
```

<a name="post-decorator"/>

### @Post
`@Post` - makes HTTP POST request with HttpParams:
```typescript
...
import { HttpApi, Post } from 'ngx-decorator';

@Injectable()
@HttpApi('api')
export class DataService {

    constructor(private httpClient: HttpClient) { }

    @Post('users/save')
    addAll(params?: object, body?: object): Observable<any> { // <-------- makes POST request to /api/users/save with params and request body defined
        return of();
    }
}
```

<a name="put-decorator"/>

### @Put
`@Put` - makes HTTP PUT request with HttpParams:
```typescript
...
import { HttpApi, Put } from 'ngx-decorator';

@Injectable()
@HttpApi('api')
export class DataService {

    constructor(private httpClient: HttpClient) { }

    @Put('users/save')
    replaceAll(params?: object, body?: object): Observable<any> { // <-------- makes PUT request to /api/users/save with params and request body defined
        return of();
    }
}
```

<a name="patch-decorator"/>

### @Patch
`@Patch` - makes HTTP PATCH request with HttpParams:
```typescript
...
import { HttpApi, Patch } from 'ngx-decorator';

@Injectable()
@HttpApi('api')
export class DataService {

    constructor(private httpClient: HttpClient) { }

    @Patch('users/save')
    replaceOne(params?: object, body?: object): Observable<any> { // <-------- makes PATCH request to /api/users/save with params and request body defined
        return of();
    }
}
```

<a name="delete-decorator"/>

### @Delete
`@Delete` - makes HTTP DELETE request with HttpParams:
```typescript
...
import { HttpApi, Delete } from 'ngx-decorator';

@Injectable()
@HttpApi('api')
export class DataService {
    
    constructor(private httpClient: HttpClient) { }

    @Delete('users')
    removeAll(params?: object): Observable<any> { // <-------- makes DELETE request to /api/users with params defined
        return of();
    }
}
```

<a name="request-decorator"/>

### @Request
`@Request` - makes HTTP request with defined method: 
```typescript
...
import { HttpApi, Request } from 'ngx-decorator';

@Injectable()
@HttpApi('api')
export class DataService {
    
    constructor(private httpClient: HttpClient) { }

    @Request('GET', 'users')
    getOneRequest(params?: object): Observable<any> { // <-------- makes GET request to /api/users with params defined
        return of();
    }

    @Request('POST', 'usrs/save')
    addAllRequest(params?: object, body?: object): Observable<any> { // <-------- makes POST request to /api/users/save with params and request body defined
        return of();
    }

    @Request('PUT', 'usrs/save')
    replaceAllRequest(params?: object, body?: object): Observable<any> { // <-------- makes PUT request to /api/users/save with params and request body defined
        return of();
    }

    @Request('PATCH', 'usrs/save')
    replaceOneRequest(params?: object, body?: object): Observable<any> { // <-------- makes PATCH request to /api/users/save with params and request body defined
        return of();
    }

    @Request('DELETE', 'usrs')
    removeAllRequest(params?: object): Observable<any> { // <-------- makes DELETE request to /api/users with params defined
        return of();
    }
}
```
