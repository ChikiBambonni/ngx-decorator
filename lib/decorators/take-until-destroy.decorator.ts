import { Subject } from 'rxjs';

/**
   * @param constructor Class constructor
*/
export function TakeUntilDestroy(constructor: Function) {
    const originalDestroy = constructor.prototype.ngOnDestroy;

    if ( typeof originalDestroy !== 'function') {
        console.warn(`Class ${constructor.name} should implement OnDestroy method`);
    }

    constructor.prototype.componentDestroy = function() {
        this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
        return this._takeUntilDestroy$.asObservable();
    };

    constructor.prototype.ngOnDestroy = function(...args) {
        if (typeof originalDestroy === 'function') {
            originalDestroy.apply(this, args);
        }

        if (this._takeUntilDestroy$) {
            this._takeUntilDestroy$.next();
            this._takeUntilDestroy$.complete();
        }
    };
}
