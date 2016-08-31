'use strict';


function APIResponse(response, body) {
    this.setResponseObject(response);
    this.setRawResponse(body);
    this.setBody(JSON.parse(body));
}

/**
 * Retrieves error.
 */
APIResponse.prototype.getError = function () {
    return this._error;
};

/**
 * Sets error.
 */
APIResponse.prototype.setError = function (value) {
    this._error = value;
};

/**
 * Retrieves raw response.
 */
APIResponse.prototype.getRawResponse = function () {
    return this._rawResponse;
};

/**
 * Sets raw response.
 */
APIResponse.prototype.setRawResponse = function (value) {
    this._rawResponse = value;
};

/**
 * Retrieves body.
 */
APIResponse.prototype.getBody = function () {
    return this._body;
};

/**
 * Sets body.
 */
APIResponse.prototype.setBody = function (value) {
    this._body = value;
};

/**
 * Retrieves response object.
 */
APIResponse.prototype.getResponseObject = function () {
    return this._responseObject;
};

/**
 * Sets response object.
 */
APIResponse.prototype.setResponseObject = function (value) {
    this._responseObject = value;
};

module.exports = APIResponse;