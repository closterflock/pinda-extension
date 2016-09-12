'use strict';
// @flow

import request from 'request';
import APIResponse from './api-response';

type Options = {
    url: string;
    method: string;
    headers: Object;
    json?: Object;
    form?: Object;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class Request {
    method:  Method;
    url: string;
    params: Object = {};
    headers: Object = {};

    /**
     * Checks if a variable is defined.
     *
     * @param value
     * @returns {boolean}
     */
    isDefined(value: any): boolean {
        return (typeof value != 'undefined');
    };

    /**
     * Sets the request method.
     *
     * @param method
     */
    setMethod(method: Method): void {
        this.method = method;
    };

    /**
     * Sets the URL.
     *
     * @param url
     */
    setUrl(url: string): void {
        this.url = url;
    };

    /**
     * Appends a parameter to the object.
     *
     * @param key
     * @param value
     */
    appendParam(key: string, value: string): void {
        this.params[key] = value;
    };

    /**
     * Sets a whole object worth of parameters.
     *
     * @param params
     */
    setParams(params: Object): void {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                this.appendParam(key, params[key]);
            }
        }
    };

    /**
     * Completely replaces parameters.
     *
     * @param params
     */
    replaceParams(params: Object): void {
        this.params = params;
    };

    /**
     * Sets a whole object worth of headers.
     *
     * @param headers
     */
    setHeaders(headers: Object): void {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                this.appendHeader(key, headers[key]);
            }
        }
    };

    /**
     * Appends a header to the object.
     *
     * @param key
     * @param value
     */
    appendHeader(key: string, value: string): void {
        this.headers[key] = value;
    };

    /**
     * Completely replaces headers.
     *
     * @param headers
     */
    replaceHeaders(headers: Object): void {
        this.headers = headers;
    };

    /**
     * Sets parameters and makes a request. A convenience method to pass all params in a single place.
     *
     * @param method
     * @param url
     * @param params
     * @param headers
     * @return {Promise}
     */
    request(method: Method, url: string, params: Object, headers: Object): Promise<APIResponse> {
        this.checkForDefinedValues(method, url, params, headers);

        if (!this.hasRequiredFields()) {
            this.constructor.throwRequiredFieldsError();
        }
        return this.makeRequest();
    };

    /**
     * Makes a request.
     *
     * @return {Promise}
     */
    makeRequest(): Promise<APIResponse> {
        var self = this;
        return new Promise(function (resolve, reject) {

            request(self.prepareOptions(), function (error, response, body) {
                var apiResponse = new APIResponse(response, body);
                if (error || apiResponse.failed()) {
                    apiResponse.setError(error);
                    return reject(apiResponse);
                } else {
                    return resolve(apiResponse);
                }
            });
        });
    };

    /**
     * Prepares the option object to pass to the request library.
     */
    prepareOptions(): Options {

        var options: Options = {
            url: this.url,
            method: this.method,
            headers: this.headers
        };

        for (var key in this.headers) {
            if (this.headers.hasOwnProperty(key)) {
                var value = this.headers[key];
                if (key === 'Content-Type' && value === 'application/x-www-form-urlencoded') {
                    options.form = this.params;
                    break;
                }
            }
        }

        if (typeof options.form === 'undefined') {
            options.form = this.params;
        }

        options.json = true;

        return options;
    };

    /**
     * Checks for defined values, and sets them on the instance.
     *
     * @param method
     * @param url
     * @param params
     * @param headers
     */
    checkForDefinedValues(method: Method, url: string, params: Object, headers: Object): void {

        if (this.isDefined(method)) {
            this.setMethod(method);
        }

        if (this.isDefined(url)) {
            this.setUrl(url);
        }

        if (this.isDefined(params)) {
            this.setParams(params);
        }

        if (this.isDefined(headers)) {
            this.setHeaders(headers);
        }
    };

    /**
     * Checks for required fields.
     *
     * @returns {boolean}
     */
    hasRequiredFields(): boolean {
        return (this.method != undefined && this.url != undefined);
    };

    /**
     * Throws an error if fields aren't set.
     */
    static throwRequiredFieldsError(): void {
        throw new Error('Please fill all required fields before attempting a request again.');
    };
}