import { ChangesStrategy } from '../enums/changes-strategy.enum';
/**
   * @param key @Input() fieled name
   * @param methodName method name to be called
   * @param strategy changes strategy to be applied
   * @returns {Function}
*/
export function TrackChanges(key, methodName, strategy) {
    if (strategy === void 0) { strategy = ChangesStrategy.Each; }
    return function (targetClass, functionName, descriptor) {
        var source = descriptor.value;
        descriptor.value = function (changes) {
            if (changes && changes[key]
                && changes[key].currentValue) {
                var isFirstChange = changes[key].firstChange;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2stY2hhbmdlcy5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGVjb3JhdG9yLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy90cmFjay1jaGFuZ2VzLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFakU7Ozs7O0VBS0U7QUFDRixNQUFNLFVBQVUsWUFBWSxDQUFJLEdBQVcsRUFBRSxVQUFrQixFQUFFLFFBQWdEO0lBQWhELHlCQUFBLEVBQUEsV0FBNEIsZUFBZSxDQUFDLElBQUk7SUFDL0csT0FBTyxVQUFTLFdBQVcsRUFBRSxZQUFvQixFQUFFLFVBQVU7UUFDM0QsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUVoQyxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVUsT0FBc0I7WUFFakQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQzttQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRTtnQkFDOUIsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFFL0MsSUFBSSxRQUFRLEtBQUssZUFBZSxDQUFDLElBQUk7b0JBQ2xDLENBQUMsUUFBUSxLQUFLLGVBQWUsQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDO29CQUNyRCxDQUFDLFFBQVEsS0FBSyxlQUFlLENBQUMsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQzVELFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFpQixDQUFDLENBQUM7aUJBQ3BFO2FBQ0Y7WUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQztRQUVGLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENoYW5nZXNTdHJhdGVneSB9IGZyb20gJy4uL2VudW1zL2NoYW5nZXMtc3RyYXRlZ3kuZW51bSc7XG5cbi8qKlxuICAgKiBAcGFyYW0ga2V5IEBJbnB1dCgpIGZpZWxlZCBuYW1lXG4gICAqIEBwYXJhbSBtZXRob2ROYW1lIG1ldGhvZCBuYW1lIHRvIGJlIGNhbGxlZFxuICAgKiBAcGFyYW0gc3RyYXRlZ3kgY2hhbmdlcyBzdHJhdGVneSB0byBiZSBhcHBsaWVkXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiovXG5leHBvcnQgZnVuY3Rpb24gVHJhY2tDaGFuZ2VzPFQ+KGtleTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcsIHN0cmF0ZWd5OiBDaGFuZ2VzU3RyYXRlZ3kgPSBDaGFuZ2VzU3RyYXRlZ3kuRWFjaCkge1xuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0Q2xhc3MsIGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBkZXNjcmlwdG9yKSB7XG4gICAgY29uc3Qgc291cmNlID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzW2tleV1cbiAgICAgICAgJiYgY2hhbmdlc1trZXldLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICBjb25zdCBpc0ZpcnN0Q2hhbmdlID0gY2hhbmdlc1trZXldLmZpcnN0Q2hhbmdlO1xuXG4gICAgICAgIGlmIChzdHJhdGVneSA9PT0gQ2hhbmdlc1N0cmF0ZWd5LkVhY2ggfHxcbiAgICAgICAgICAgKHN0cmF0ZWd5ID09PSBDaGFuZ2VzU3RyYXRlZ3kuRmlyc3QgJiYgaXNGaXJzdENoYW5nZSkgfHxcbiAgICAgICAgICAgKHN0cmF0ZWd5ID09PSBDaGFuZ2VzU3RyYXRlZ3kuTm90Rmlyc3QgJiYgIWlzRmlyc3RDaGFuZ2UpKSB7XG4gICAgICAgICAgdGFyZ2V0Q2xhc3NbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBjaGFuZ2VzW2tleV0uY3VycmVudFZhbHVlIGFzIFQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzb3VyY2UuY2FsbCh0aGlzLCBjaGFuZ2VzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH07XG59Il19