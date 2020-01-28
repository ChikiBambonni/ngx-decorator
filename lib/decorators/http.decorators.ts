import 'reflect-metadata';

export function HttpApi(apiUrl: string) {
    return function (constructor: any) {
        constructor.prototype.apiUrl = apiUrl;
        return constructor;
    };
}

export function Get(endpoint: string) {
    return function (targetClass, functionName, descriptor) {

        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(targetClass, functionName);
        }

        descriptor.value = function () {
            if (!this.httpClient) {
                throw new Error(`Class with 'Get' decorator should have 'httpClient' class property with 'HttpClient' class.`);
            }

            return `${this.apiUrl}/${endpoint}`;// this.httpClient.get(`${apiUrl}/${endpoint}`);
        };

        return descriptor;
    };
}
