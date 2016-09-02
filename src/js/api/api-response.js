'use strict';
// @flow

function APIResponse(response: Object, body: string) {
    this.setResponseObject(response);
    this.setRawResponse(body);
    this.setBody(JSON.parse(body));
}

/**
 * Retrieves error.
 */
APIResponse.prototype.getError = function (): any {
    return this._error;
};

/**
 * Sets error.
 */
APIResponse.prototype.setError = function (value: any) {
    this._error = value;
};

/**
 * Retrieves raw response.
 */
APIResponse.prototype.getRawResponse = function (): string {
    return this._rawResponse;
};

/**
 * Sets raw response.
 */
APIResponse.prototype.setRawResponse = function (value: Object) {
    this._rawResponse = value;
};

/**
 * Retrieves body.
 */
APIResponse.prototype.getBody = function (): Object {
    return this._body;
};

/**
 * Sets body.
 */
APIResponse.prototype.setBody = function (value: Object) {
    this._body = value;
};

/**
 * Retrieves response object.
 */
APIResponse.prototype.getResponseObject = function (): Object {
    return this._responseObject;
};

/**
 * Sets response object.
 */
APIResponse.prototype.setResponseObject = function (value: Object) {
    this._responseObject = value;
};

module.exports = APIResponse;