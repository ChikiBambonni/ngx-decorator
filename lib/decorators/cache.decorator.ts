import { serializeObject } from 'lib/utils/core.utils';
import { CacheParams } from 'lib/interfaces/cache-params.interface';

/**
 * @param params cache params
 * @returns {Function}
 */
// tslint:disable-next-line: ban-types
export function Cache(params: CacheParams = {}): Function {
    const cache = {
        data: new Map<string, any>(),
        get<T>(key: string): T {
            return this.data.get(key) as T;
        },
        set<T>(key: string, value: T): void {
            this.data.set(key, value);
        }
    };

    // tslint:disable-next-line: only-arrow-functions
    return function(target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }

        const originalMethod = descriptor.value;

        descriptor.value = function() {
            let savedKey = params.cacheKey || key;

            if (params.useParamsAsKeys) {
                savedKey = `${savedKey}-${serializeObject(arguments)}`;
            }

            const cacheResult = cache.get(savedKey);
            if (cacheResult) {
                console.log('Returning from cache: ', cacheResult);
                return cacheResult;
            }

            const result = originalMethod.apply(this, arguments);
            cache.set(savedKey, result);

            return result;
        };

        return descriptor;
    };
}
