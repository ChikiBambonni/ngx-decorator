import { Subject } from 'rxjs';
/**
   * @param constructor Class constructor
*/
export function TakeUntilDestroy(constructor) {
    var originalDestroy = constructor.prototype.ngOnDestroy;
    if (typeof originalDestroy !== 'function') {
        console.warn("Class " + constructor.name + " should implement OnDestroy method");
    }
    constructor.prototype.componentDestroy = function () {
        this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
        return this._takeUntilDestroy$.asObservable();
    };
    constructor.prototype.ngOnDestroy = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof originalDestroy === 'function') {
            originalDestroy.apply(this, args);
        }
        if (this._takeUntilDestroy$) {
            this._takeUntilDestroy$.next();
            this._takeUntilDestroy$.complete();
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZS11bnRpbC1kZXN0cm95LmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZWNvcmF0b3IvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL3Rha2UtdW50aWwtZGVzdHJveS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQjs7RUFFRTtBQUNGLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxXQUFxQjtJQUNsRCxJQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztJQUUxRCxJQUFLLE9BQU8sZUFBZSxLQUFLLFVBQVUsRUFBRTtRQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVMsV0FBVyxDQUFDLElBQUksdUNBQW9DLENBQUMsQ0FBQztLQUMvRTtJQUVELFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUc7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUMsQ0FBQztJQUVGLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHO1FBQVMsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7UUFDaEQsSUFBSSxPQUFPLGVBQWUsS0FBSyxVQUFVLEVBQUU7WUFDdkMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gICAqIEBwYXJhbSBjb25zdHJ1Y3RvciBDbGFzcyBjb25zdHJ1Y3RvclxuKi9cbmV4cG9ydCBmdW5jdGlvbiBUYWtlVW50aWxEZXN0cm95KGNvbnN0cnVjdG9yOiBGdW5jdGlvbikge1xuICAgIGNvbnN0IG9yaWdpbmFsRGVzdHJveSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZS5uZ09uRGVzdHJveTtcblxuICAgIGlmICggdHlwZW9mIG9yaWdpbmFsRGVzdHJveSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zb2xlLndhcm4oYENsYXNzICR7Y29uc3RydWN0b3IubmFtZX0gc2hvdWxkIGltcGxlbWVudCBPbkRlc3Ryb3kgbWV0aG9kYCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudERlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fdGFrZVVudGlsRGVzdHJveSQgPSB0aGlzLl90YWtlVW50aWxEZXN0cm95JCB8fCBuZXcgU3ViamVjdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFrZVVudGlsRGVzdHJveSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbERlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsRGVzdHJveS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl90YWtlVW50aWxEZXN0cm95JCkge1xuICAgICAgICAgICAgdGhpcy5fdGFrZVVudGlsRGVzdHJveSQubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5fdGFrZVVudGlsRGVzdHJveSQuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=