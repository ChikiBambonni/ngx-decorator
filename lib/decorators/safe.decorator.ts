import { SafeParams } from '../interfaces/safe-params.interface';
import { SafeLogLevel } from '../enums/log-level.enum';

/**
    * @param params SafeParams interface
    * @returns {Function}
*/
export function Safe<T>(params: SafeParams<T> = {}): Function {
  return function(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;
    const logLevel = params.logLevel || SafeLogLevel.Default;

    descriptor.value = function SafeWrapper() {
      try {
        return originalMethod.apply(this, arguments);
      } catch (error) {
        if (logLevel === SafeLogLevel.Console) { console.error(error); }

        if (logLevel === SafeLogLevel.ErrorHandler) {
          if (!this.errorHandler) {
            throw new Error(`
                Class with 'Safe' decorator and logLevel 'ErrorHandler'
                should have 'errorHandler' class property with 'ErrorHandler' class.`);
          } else {
            this.errorHandler.handleError(error);
          }
        }

        return params.returnValue || false;
      }
    };

    return descriptor;
  };
}
