import { serializeObject } from '../utils/core.utils';
/**
 * @param params cache params
 * @returns {Function}
 */
// tslint:disable-next-line: ban-types
export function Cache(params) {
    if (params === void 0) { params = {}; }
    var cache = {
        data: new Map(),
        get: function (key) {
            return this.data.get(key);
        },
        set: function (key, value) {
            this.data.set(key, value);
        }
    };
    // tslint:disable-next-line: only-arrow-functions
    return function (target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var savedKey = params.cacheKey || key;
            if (params.useParamsAsKeys) {
                savedKey = savedKey + "-" + serializeObject(arguments);
            }
            var cacheResult = cache.get(savedKey);
            if (cacheResult) {
                console.log('Returning from cache: ', cacheResult);
                return cacheResult;
            }
            var result = originalMethod.apply(this, arguments);
            cache.set(savedKey, result);
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRlY29yYXRvci8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY2FjaGUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd0RDs7O0dBR0c7QUFDSCxzQ0FBc0M7QUFDdEMsTUFBTSxVQUFVLEtBQUssQ0FBQyxNQUF3QjtJQUF4Qix1QkFBQSxFQUFBLFdBQXdCO0lBQzFDLElBQU0sS0FBSyxHQUFHO1FBQ1YsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFlO1FBQzVCLEdBQUcsRUFBSCxVQUFPLEdBQVc7WUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBTSxDQUFDO1FBQ25DLENBQUM7UUFDRCxHQUFHLEVBQUgsVUFBTyxHQUFXLEVBQUUsS0FBUTtZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNKLENBQUM7SUFFRixpREFBaUQ7SUFDakQsT0FBTyxVQUFTLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVTtRQUNuQyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDMUIsVUFBVSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDN0Q7UUFFRCxJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRXhDLFVBQVUsQ0FBQyxLQUFLLEdBQUc7WUFDZixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQztZQUV0QyxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLFFBQVEsR0FBTSxRQUFRLFNBQUksZUFBZSxDQUFDLFNBQVMsQ0FBRyxDQUFDO2FBQzFEO1lBRUQsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxJQUFJLFdBQVcsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLFdBQVcsQ0FBQzthQUN0QjtZQUVELElBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTVCLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUVGLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUMsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXJpYWxpemVPYmplY3QgfSBmcm9tICcuLi91dGlscy9jb3JlLnV0aWxzJztcbmltcG9ydCB7IENhY2hlUGFyYW1zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jYWNoZS1wYXJhbXMuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBAcGFyYW0gcGFyYW1zIGNhY2hlIHBhcmFtc1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGJhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIENhY2hlKHBhcmFtczogQ2FjaGVQYXJhbXMgPSB7fSk6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCBjYWNoZSA9IHtcbiAgICAgICAgZGF0YTogbmV3IE1hcDxzdHJpbmcsIGFueT4oKSxcbiAgICAgICAgZ2V0PFQ+KGtleTogc3RyaW5nKTogVCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChrZXkpIGFzIFQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDxUPihrZXk6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmx5LWFycm93LWZ1bmN0aW9uc1xuICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICBpZiAoZGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHNhdmVkS2V5ID0gcGFyYW1zLmNhY2hlS2V5IHx8IGtleTtcblxuICAgICAgICAgICAgaWYgKHBhcmFtcy51c2VQYXJhbXNBc0tleXMpIHtcbiAgICAgICAgICAgICAgICBzYXZlZEtleSA9IGAke3NhdmVkS2V5fS0ke3NlcmlhbGl6ZU9iamVjdChhcmd1bWVudHMpfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNhY2hlUmVzdWx0ID0gY2FjaGUuZ2V0KHNhdmVkS2V5KTtcbiAgICAgICAgICAgIGlmIChjYWNoZVJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXR1cm5pbmcgZnJvbSBjYWNoZTogJywgY2FjaGVSZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZVJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luYWxNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGNhY2hlLnNldChzYXZlZEtleSwgcmVzdWx0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgICB9O1xufVxuIl19