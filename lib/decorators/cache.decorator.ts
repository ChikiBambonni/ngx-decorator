const serializeObject = (obj?: object): string => {
    let str = '';

    if (obj) {
        Object.keys(obj).forEach((key: string) => {
            if (str !== '') {
                str += '&';
            }
            str += `${key}=${encodeURIComponent(obj[key])}`;
        });
    }

    return str;
};

export interface CacheParams {
    cacheKey?: string;
    useParamsAsKeys?: boolean;
};

/**
 * @param params cache params
 * @returns {Function}
 */
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
