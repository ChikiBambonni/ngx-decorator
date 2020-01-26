import { ChangesStrategy } from '../enums/changes-strategy.enum';
/**
   * @param key @Input() fieled name
   * @param methodName method name to be called
   * @param strategy changes strategy to be applied
   * @returns {Function}
*/
export declare function TrackChanges<T>(key: string, methodName: string, strategy?: ChangesStrategy): (targetClass: any, functionName: string, descriptor: any) => any;
