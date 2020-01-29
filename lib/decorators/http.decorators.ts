import { HttpParams } from '@angular/common/http';

const getRequestParams = (params: object | null): HttpParams => {
    let requestParams: HttpParams = new HttpParams();

    if (params) {
        Object.keys(params)
            .filter((key: string) => params[key] !== undefined && params[key] !== null)
            .forEach((key: string) => requestParams = requestParams.set(key, params[key]));
    }

    return requestParams;
  };

export function HttpApi(apiUrl: string) {
    return (constructor: any) => {
        constructor.prototype.apiUrl = apiUrl;
        return constructor;
    };
}

export function Get(endpoint: string) {
    return function(targetClass, functionName, descriptor) {

        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(targetClass, functionName);
        }

        descriptor.value = function() {
            if (!this.httpClient) {
                throw new Error(`Class with 'Get' decorator should have 'httpClient' class property with 'HttpClient' class.`);
            }

            const args = [...arguments];
            const params = args[0];

            return this.httpClient.get(`${this.apiUrl}/${endpoint}`, { params: getRequestParams(params) });
        };

        return descriptor;
    };
}
