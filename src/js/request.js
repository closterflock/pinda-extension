'use strict';
// @flow

type Options = {
    url: string;
    method: string;
    headers: Object;
    json?: Object;
    form?: Object;
}

var request = require('request');
var APIResponse = require('./api-response');

function Request() {
    this.method = undefined;
    this.url = undefined;
    this.params = {};
    this.headers = {};
}

/**
 * Checks if a variable is defined.
 *
 * @param value
 * @returns {boolean}
 */
Request.prototype.isDefined = function (value: any): boolean {
    return (typeof value != 'undefined');
};

/**
 * Sets the request method.
 *
 * @param method
 */
Request.prototype.setMethod = function (method: string): void {
    this.method = method;
};

/**
 * Sets the URL.
 *
 * @param url
 */
Request.prototype.setUrl = function (url: string): void {
    this.url = url;
};

/**
 * Appends a parameter to the object.
 *
 * @param key
 * @param value
 */
Request.prototype.appendParam = function (key: string, value: string): void {
    this.params[key] = value;
};

/**
 * Sets a whole object worth of parameters.
 *
 * @param params
 */
Request.prototype.setParams = function (params: Object): void {
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
Request.prototype.replaceParams = function (params: Object): void {
    this.params = params;
};

/**
 * Sets a whole object worth of headers.
 *
 * @param headers
 */
Request.prototype.setHeaders = function (headers: Object): void {
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
Request.prototype.appendHeader = function (key: string, value: string): void {
    this.headers[key] = value;
};

/**
 * Completely replaces headers.
 *
 * @param headers
 */
Request.prototype.replaceHeaders = function (headers: Object): void {
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
Request.prototype.request = function (method: string, url: string, params: Object, headers: Object): Promise<APIResponse> {
    this.checkForDefinedValues(method, url, params, headers);

    if (!this.hasRequiredFields()) {
        this.throwRequiredFieldsError();
    }
    return this.makeRequest();
};

/**
 * Makes a request.
 *
 * @return {Promise}
 */
Request.prototype.makeRequest = function (): Promise<APIResponse> {
    var self = this;
    return new Promise(function (resolve, reject) {

        request(self.prepareOptions(), function (error, response, body) {
            var apiResponse = new APIResponse(response, body);
            if (error) {
                response.setError(error);
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
Request.prototype.prepareOptions = function (): Options {

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
        if (this.method == 'POST' || this.method == 'PUT') {
            options.json = this.params;
        } else {
            options.form = this.params;
        }
    }

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
Request.prototype.checkForDefinedValues = function (method: string, url: string, params: Object, headers: Object): void {

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
Request.prototype.hasRequiredFields = function (): boolean {
    return (this.method != undefined && this.url != undefined);
};

/**
 * Throws an error if fields aren't set.
 */
Request.prototype.throwRequiredFieldsError = function (): void {
    throw new Error('Please fill all required fields before attempting a request again.');
};

/**
 * @type {Request}
 */
module.exports = Request;