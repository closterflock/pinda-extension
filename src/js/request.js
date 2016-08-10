'use strict';

var request = require('request');

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
Request.prototype.isDefined = function (value) {
    return (typeof value != 'undefined');
};

/**
 * Sets the request method.
 *
 * @param method
 */
Request.prototype.setMethod = function (method) {
    this.method = method;
};

/**
 * Sets the URL.
 *
 * @param url
 */
Request.prototype.setUrl = function (url) {
    this.url = url;
};

/**
 * Appends a parameter to the object.
 *
 * @param key
 * @param value
 */
Request.prototype.appendParam = function (key, value) {
    this.params[key] = value;
};

/**
 * Sets a whole object worth of parameters.
 *
 * @param params
 */
Request.prototype.setParams = function (params) {
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
Request.prototype.replaceParams = function (params) {
    this.params = params;
};

/**
 * Sets a whole object worth of headers.
 *
 * @param headers
 */
Request.prototype.setHeaders = function (headers) {
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
Request.prototype.appendHeader = function (key, value) {
    this.headers[key] = value;
};

/**
 * Completely replaces headers.
 *
 * @param headers
 */
Request.prototype.replaceHeaders = function (headers) {
    this.headers = headers;
};

/**
 * Sets parameters and makes a request. A convenience method to pass all params in a single place.
 *
 * @param method
 * @param url
 * @param params
 * @param headers
 */
Request.prototype.request = function (method, url, params, headers) {
    this.checkForDefinedValues(method, url, params, headers);

    if (!this.hasRequiredFields()) {
        this.throwRequiredFieldsError();
    }
    this.makeRequest();
};

/**
 * Makes a request.
 * 
 * @return {Promise}
 */
Request.prototype.makeRequest = function () {
    return new Promise(function (resolve, reject) {
        request(this.prepareOptions(), function (error, response, body) {
            var data = {
                error: error,
                response: response,
                body: body
            };

            if (error) {
                return reject(data);
            } else {
                return resolve(data);
            }
        });
    });
};

/**
 * Prepares the option object to pass to the request library.
 */
Request.prototype.prepareOptions = function () {

    var options = {
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
Request.prototype.checkForDefinedValues = function (method, url, params, headers) {

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
Request.prototype.hasRequiredFields = function () {
    return (this.method != undefined && this.url != undefined);
};

/**
 * Throws an error if fields aren't set.
 */
Request.prototype.throwRequiredFieldsError = function () {
    throw new Error('Please fill all required fields before attempting a request again.');
};

/**
 * @type {Request}
 */
module.exports = Request;