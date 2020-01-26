import { SafeLogLevel } from '../enums/log-level.enum';
/**
    * @param params SafeParams interface
    * @returns {Function}
*/
export function Safe(params = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGVjb3JhdG9yLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9zYWZlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQ7OztFQUdFO0FBQ0YsTUFBTSxVQUFVLElBQUksQ0FBSSxTQUF3QixFQUFFO0lBQ2hELE9BQU8sVUFBUyxNQUFjLEVBQUUsV0FBbUIsRUFBRSxVQUF3QztRQUMzRixNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUV6RCxVQUFVLENBQUMsS0FBSyxHQUFHLFNBQVMsV0FBVztZQUNyQyxJQUFJO2dCQUNGLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDOUM7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxJQUFJLFFBQVEsS0FBSyxZQUFZLENBQUMsT0FBTyxFQUFFO29CQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQUU7Z0JBRWhFLElBQUksUUFBUSxLQUFLLFlBQVksQ0FBQyxZQUFZLEVBQUU7b0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDOztxRkFFeUQsQ0FBQyxDQUFDO3FCQUM1RTt5QkFBTTt3QkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDdEM7aUJBQ0Y7Z0JBRUQsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQzthQUNwQztRQUNILENBQUMsQ0FBQztRQUVGLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTYWZlUGFyYW1zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zYWZlLXBhcmFtcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2FmZUxvZ0xldmVsIH0gZnJvbSAnLi4vZW51bXMvbG9nLWxldmVsLmVudW0nO1xuXG4vKipcbiAgICAqIEBwYXJhbSBwYXJhbXMgU2FmZVBhcmFtcyBpbnRlcmZhY2VcbiAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiovXG5leHBvcnQgZnVuY3Rpb24gU2FmZTxUPihwYXJhbXM6IFNhZmVQYXJhbXM8VD4gPSB7fSk6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjxhbnk+KTogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8YW55PiB7XG4gICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIGNvbnN0IGxvZ0xldmVsID0gcGFyYW1zLmxvZ0xldmVsIHx8IFNhZmVMb2dMZXZlbC5EZWZhdWx0O1xuXG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uIFNhZmVXcmFwcGVyKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAobG9nTGV2ZWwgPT09IFNhZmVMb2dMZXZlbC5Db25zb2xlKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9XG5cbiAgICAgICAgaWYgKGxvZ0xldmVsID09PSBTYWZlTG9nTGV2ZWwuRXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmVycm9ySGFuZGxlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgICAgICAgICBDbGFzcyB3aXRoICdTYWZlJyBkZWNvcmF0b3IgYW5kIGxvZ0xldmVsICdFcnJvckhhbmRsZXInXG4gICAgICAgICAgICAgICAgc2hvdWxkIGhhdmUgJ2Vycm9ySGFuZGxlcicgY2xhc3MgcHJvcGVydHkgd2l0aCAnRXJyb3JIYW5kbGVyJyBjbGFzcy5gKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXMucmV0dXJuVmFsdWUgfHwgZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9O1xufVxuIl19