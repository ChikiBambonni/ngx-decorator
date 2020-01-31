import { HttpParams } from '@angular/common/http';

enum HttpDecoratorType {
    Request = 'Request',
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete'
}

const httpClientInjectorError = (decoratorType: HttpDecoratorType) => `Class with '${decoratorType}' decorator should have 'httpClient' class property with 'HttpClient' class.`;
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
                throw new Error(httpClientInjectorError(HttpDecoratorType.Get));
            }

            return this.httpClient.get(
                `${this.apiUrl}/${endpoint}`,
                { params: getRequestParams(params) }
            );
        };

        return descriptor;
    };
}

export function Post(endpoint: string) {
    return function(targetClass, functionName, descriptor) {

        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(targetClass, functionName);
        }

        descriptor.value = function(params: object, body: object) {
            if (!this.httpClient) {
                throw new Error(httpClientInjectorError(HttpDecoratorType.Post));
            }

            return this.httpClient.post(
                `${this.apiUrl}/${endpoint}`,
                body,
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
                throw new Error(httpClientInjectorError(HttpDecoratorType.Request));
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
