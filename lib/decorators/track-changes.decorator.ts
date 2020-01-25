import { SimpleChanges } from '@angular/core';

import { ChangesStrategy } from '../enums/changes-strategy.enum';

/**
   * @param key @Input() fieled name
   * @param methodName method name to be called
   * @param strategy changes strategy to be applied
*/
export function TrackChanges<T>(key: string, methodName: string, strategy: ChangesStrategy = ChangesStrategy.Each) {
  return function(targetClass, descriptor) {
    const source = descriptor.value;

    descriptor.value = function (changes: SimpleChanges) {

      if (changes && changes[key]
        && changes[key].currentValue) {
        const isFirstChange = changes[key].firstChange;

        if (strategy === ChangesStrategy.Each ||
           (strategy === ChangesStrategy.First && isFirstChange) ||
           (strategy === ChangesStrategy.NotFirst && !isFirstChange)) {
          targetClass[methodName].call(this, changes[key].currentValue as T);
        }
      }

      return source.call(this, changes);
    };

    return descriptor;
  };
}