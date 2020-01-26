import { SafeLogLevel } from '../enums/log-level.enum';
export interface SafeParams<T> {
    logLevel?: SafeLogLevel;
    returnValue?: T;
}
