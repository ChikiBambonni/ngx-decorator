import { ChangesStrategy } from '../enums/changes-strategy.enum';
/**
   * @param key @Input() fieled name
   * @param methodName method name to be called
   * @param strategy changes strategy to be applied
   * @returns {Function}
*/
export function TrackChanges(key, methodName, strategy = ChangesStrategy.Each) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2stY2hhbmdlcy5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGVjb3JhdG9yLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy90cmFjay1jaGFuZ2VzLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFakU7Ozs7O0VBS0U7QUFDRixNQUFNLFVBQVUsWUFBWSxDQUFJLEdBQVcsRUFBRSxVQUFrQixFQUFFLFdBQTRCLGVBQWUsQ0FBQyxJQUFJO0lBQy9HLE9BQU8sVUFBUyxXQUFXLEVBQUUsWUFBb0IsRUFBRSxVQUFVO1FBQzNELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFaEMsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLE9BQXNCO1lBRWpELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUM7bUJBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUU7Z0JBQzlCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7Z0JBRS9DLElBQUksUUFBUSxLQUFLLGVBQWUsQ0FBQyxJQUFJO29CQUNsQyxDQUFDLFFBQVEsS0FBSyxlQUFlLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQztvQkFDckQsQ0FBQyxRQUFRLEtBQUssZUFBZSxDQUFDLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUM1RCxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBaUIsQ0FBQyxDQUFDO2lCQUNwRTthQUNGO1lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUM7UUFFRixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDaGFuZ2VzU3RyYXRlZ3kgfSBmcm9tICcuLi9lbnVtcy9jaGFuZ2VzLXN0cmF0ZWd5LmVudW0nO1xuXG4vKipcbiAgICogQHBhcmFtIGtleSBASW5wdXQoKSBmaWVsZWQgbmFtZVxuICAgKiBAcGFyYW0gbWV0aG9kTmFtZSBtZXRob2QgbmFtZSB0byBiZSBjYWxsZWRcbiAgICogQHBhcmFtIHN0cmF0ZWd5IGNoYW5nZXMgc3RyYXRlZ3kgdG8gYmUgYXBwbGllZFxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIFRyYWNrQ2hhbmdlczxUPihrZXk6IHN0cmluZywgbWV0aG9kTmFtZTogc3RyaW5nLCBzdHJhdGVneTogQ2hhbmdlc1N0cmF0ZWd5ID0gQ2hhbmdlc1N0cmF0ZWd5LkVhY2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldENsYXNzLCBmdW5jdGlvbk5hbWU6IHN0cmluZywgZGVzY3JpcHRvcikge1xuICAgIGNvbnN0IHNvdXJjZSA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlc1trZXldXG4gICAgICAgICYmIGNoYW5nZXNba2V5XS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgY29uc3QgaXNGaXJzdENoYW5nZSA9IGNoYW5nZXNba2V5XS5maXJzdENoYW5nZTtcblxuICAgICAgICBpZiAoc3RyYXRlZ3kgPT09IENoYW5nZXNTdHJhdGVneS5FYWNoIHx8XG4gICAgICAgICAgIChzdHJhdGVneSA9PT0gQ2hhbmdlc1N0cmF0ZWd5LkZpcnN0ICYmIGlzRmlyc3RDaGFuZ2UpIHx8XG4gICAgICAgICAgIChzdHJhdGVneSA9PT0gQ2hhbmdlc1N0cmF0ZWd5Lk5vdEZpcnN0ICYmICFpc0ZpcnN0Q2hhbmdlKSkge1xuICAgICAgICAgIHRhcmdldENsYXNzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgY2hhbmdlc1trZXldLmN1cnJlbnRWYWx1ZSBhcyBUKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc291cmNlLmNhbGwodGhpcywgY2hhbmdlcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9O1xufSJdfQ==