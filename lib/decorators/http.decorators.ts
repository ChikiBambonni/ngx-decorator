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

        descriptor.value = function(params: object) {
            if (!this.httpClient) {
                throw new Error(`Class with 'Get' decorator should have 'httpClient' class property with 'HttpClient' class.`);
            }

            return this.httpClient.get(
                `${this.apiUrl}/${endpoint}`,
                { params: getRequestParams(params) }
            );
        };

        return descriptor;
    };
}

export function Request(method: string, endpoint: string) {
    return function(targetClass, functionName, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(targetClass, functionName);
        }

        descriptor.value = function(params: object, body: object) {
            if (!this.httpClient) {
                throw new Error(`Class with 'Request' decorator should have 'httpClient' class property with 'HttpClient' class.`);
            }

            return this.httpClient.request(
                method,
                `${this.apiUrl}/${endpoint}`,
                { body, params: getRequestParams(params) }
            );
        };

        return descriptor;
    };
}
