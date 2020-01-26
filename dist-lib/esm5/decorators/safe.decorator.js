import { SafeLogLevel } from '../enums/log-level.enum';
/**
    * @param params SafeParams interface
    * @returns {Function}
*/
export function Safe(params) {
    if (params === void 0) { params = {}; }
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        var logLevel = params.logLevel || SafeLogLevel.Default;
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
                        throw new Error("\n                Class with 'Safe' decorator and logLevel 'ErrorHandler'\n                should have 'errorHandler' class property with 'ErrorHandler' class.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGVjb3JhdG9yLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9zYWZlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQ7OztFQUdFO0FBQ0YsTUFBTSxVQUFVLElBQUksQ0FBSSxNQUEwQjtJQUExQix1QkFBQSxFQUFBLFdBQTBCO0lBQ2hELE9BQU8sVUFBUyxNQUFjLEVBQUUsV0FBbUIsRUFBRSxVQUF3QztRQUMzRixJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUV6RCxVQUFVLENBQUMsS0FBSyxHQUFHLFNBQVMsV0FBVztZQUNyQyxJQUFJO2dCQUNGLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDOUM7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxJQUFJLFFBQVEsS0FBSyxZQUFZLENBQUMsT0FBTyxFQUFFO29CQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQUU7Z0JBRWhFLElBQUksUUFBUSxLQUFLLFlBQVksQ0FBQyxZQUFZLEVBQUU7b0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGlLQUV5RCxDQUFDLENBQUM7cUJBQzVFO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN0QztpQkFDRjtnQkFFRCxPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNhZmVQYXJhbXMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NhZmUtcGFyYW1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTYWZlTG9nTGV2ZWwgfSBmcm9tICcuLi9lbnVtcy9sb2ctbGV2ZWwuZW51bSc7XG5cbi8qKlxuICAgICogQHBhcmFtIHBhcmFtcyBTYWZlUGFyYW1zIGludGVyZmFjZVxuICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBTYWZlPFQ+KHBhcmFtczogU2FmZVBhcmFtczxUPiA9IHt9KTogRnVuY3Rpb24ge1xuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPGFueT4pOiBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjxhbnk+IHtcbiAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgY29uc3QgbG9nTGV2ZWwgPSBwYXJhbXMubG9nTGV2ZWwgfHwgU2FmZUxvZ0xldmVsLkRlZmF1bHQ7XG5cbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gU2FmZVdyYXBwZXIoKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChsb2dMZXZlbCA9PT0gU2FmZUxvZ0xldmVsLkNvbnNvbGUpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH1cblxuICAgICAgICBpZiAobG9nTGV2ZWwgPT09IFNhZmVMb2dMZXZlbC5FcnJvckhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgICAgICAgICAgIENsYXNzIHdpdGggJ1NhZmUnIGRlY29yYXRvciBhbmQgbG9nTGV2ZWwgJ0Vycm9ySGFuZGxlcidcbiAgICAgICAgICAgICAgICBzaG91bGQgaGF2ZSAnZXJyb3JIYW5kbGVyJyBjbGFzcyBwcm9wZXJ0eSB3aXRoICdFcnJvckhhbmRsZXInIGNsYXNzLmApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcy5yZXR1cm5WYWx1ZSB8fCBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH07XG59XG4iXX0=