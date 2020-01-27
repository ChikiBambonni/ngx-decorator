import { Subject } from 'rxjs';

/**
   * @param constructor Class constructor
*/
function TakeUntilDestroy(constructor) {
    const originalDestroy = constructor.prototype.ngOnDestroy;
    if (typeof originalDestroy !== 'function') {
        console.warn(`Class ${constructor.name} should implement OnDestroy method`);
    }
    constructor.prototype.componentDestroy = function () {
        this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
        return this._takeUntilDestroy$.asObservable();
    };
    constructor.prototype.ngOnDestroy = function (...args) {
        if (typeof originalDestroy === 'function') {
            originalDestroy.apply(this, args);
        }
        if (this._takeUntilDestroy$) {
            this._takeUntilDestroy$.next();
            this._takeUntilDestroy$.complete();
        }
    };
}

var ChangesStrategy;
(function (ChangesStrategy) {
    ChangesStrategy["First"] = "First";
    ChangesStrategy["Each"] = "Each";
    ChangesStrategy["NotFirst"] = "NotFirst";
})(ChangesStrategy || (ChangesStrategy = {}));

/**
   * @param key @Input() fieled name
   * @param methodName method name to be called
   * @param strategy changes strategy to be applied
   * @returns {Function}
*/
function TrackChanges(key, methodName, strategy = ChangesStrategy.Each) {
    return function (targetClass, functionName, descriptor) {
        const source = descriptor.value;
        descriptor.value = function (changes) {
            if (changes && changes[key]
                && changes[key].currentValue) {
                const isFirstChange = changes[key].firstChange;
                if (strategy === ChangesStrategy.Each ||
                    (strategy === ChangesStrategy.First && isFirstChange) ||
                    (strategy === ChangesStrategy.NotFirst && !isFirstChange)) {
                    targetClass[methodName].call(this, changes[key].currentValue);
                }
            }
            return source.call(this, changes);
        };
        return descriptor;
    };
}

var SafeLogLevel;
(function (SafeLogLevel) {
    SafeLogLevel["Default"] = "Default";
    SafeLogLevel["Console"] = "Console";
    SafeLogLevel["ErrorHandler"] = "ErrorHandler";
})(SafeLogLevel || (SafeLogLevel = {}));

/**
    * @param params SafeParams interface
    * @returns {Function}
*/
function Safe(params = {}) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const logLevel = params.logLevel || SafeLogLevel.Default;
        descriptor.value = function SafeWrapper() {
            try {
                return originalMethod.apply(this, arguments);
            }
            catch (error) {
                if (logLevel === SafeLogLevel.Console) {
                    console.error(error);
                }
                if (logLevel === SafeLogLevel.ErrorHandler) {
                    if (!this.errorHandler) {
                        throw new Error(`
                Class with 'Safe' decorator and logLevel 'ErrorHandler'
                should have 'errorHandler' class property with 'ErrorHandler' class.`);
                    }
                    else {
                        this.errorHandler.handleError(error);
                    }
                }
                return params.returnValue || false;
            }
        };
        return descriptor;
    };
}

const serializeObject = (obj) => {
    let str = '';
    if (obj) {
        Object.keys(obj).forEach((key) => {
            if (str !== '') {
                str += '&';
            }
            str += `${key}=${encodeURIComponent(obj[key])}`;
        });
    }
    return str;
};

/**
 * @param params cache params
 * @returns {Function}
 */
// tslint:disable-next-line: ban-types
function Cache(params = {}) {
    const cache = {
        data: new Map(),
        get(key) {
            return this.data.get(key);
        },
        set(key, value) {
            this.data.set(key, value);
        }
    };
    // tslint:disable-next-line: only-arrow-functions
    return function (target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const originalMethod = descriptor.value;
        descriptor.value = function () {
            let savedKey = params.cacheKey || key;
            if (params.useParamsAsKeys) {
                savedKey = `${savedKey}-${serializeObject(arguments)}`;
            }
            const cacheResult = cache.get(savedKey);
            if (cacheResult) {
                console.log('Returning from cache: ', cacheResult);
                return cacheResult;
            }
            const result = originalMethod.apply(this, arguments);
            cache.set(savedKey, result);
            return result;
        };
        return descriptor;
    };
}

function OutsideAngular(targetClass, functionName, descriptor) {
    const source = descriptor.value;
    descriptor.value = function (...data) {
        if (!this.ngZone) {
            throw new Error(`Class with 'OutsideAngular' decorator should have 'ngZone' class property with 'NgZone' class.`);
        }
        return this.ngZone.runOutsideAngular(() => source.call(this, ...data));
    };
    return descriptor;
}

/**
 * Generated bundle index. Do not edit.
 */

export { Cache, ChangesStrategy, OutsideAngular, Safe, SafeLogLevel, TakeUntilDestroy, TrackChanges };
//# sourceMappingURL=ngx-decorator.js.map
