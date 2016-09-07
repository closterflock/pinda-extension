'use strict';
// @flow

export default class APIResponse {

    _error: any;
    _rawResponse: string;
    _body: Object;
    _responseObject: Object;

    constructor(response: Object, body: string) {
        this.setResponseObject(response);
        this.setRawResponse(body);
        this.setBody(JSON.parse(body));
    }

    /**
     * Retrieves error.
     *
     * @returns {any|*}
     */
    getError(): any {
        return this._error;
    }

    /**
     * Sets error.
     *
     * @param value
     */
    setError(value: any): void {
        this._error = value;
    }

    /**
     * Retrieves the raw response.
     *
     * @returns {string}
     */
    getRawResponse(): string {
        return this._rawResponse;
    }

    /**
     * Sets the raw response.
     *
     * @param value
     */
    setRawResponse(value: string) {
        this._rawResponse = value;
    }

    /**
     * Retrieves the body.
     *
     * @returns {Object}
     */
    getBody(): Object {
        return this._body;
    }

    /**
     * Sets the body.
     *
     * @param value
     */
    setBody(value: Object): void {
        this._body = value;
    }

    /**
     * Retrieves the response object.
     *
     * @returns {Object}
     */
    getResponseObject(): Object {
        return this._responseObject;
    }

    /**
     * Sets the response object.
     *
     * @param value
     */
    setResponseObject(value: Object): void {
        this._responseObject = value;
    }

}