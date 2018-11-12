'use strict';
// @flow

type ResponseStatus = 'error' | 'success';

type ResponseBody = {
    status: ResponseStatus,
    message: string,
    data: Object
};

export default class APIResponse {

    _error: any;
    _rawResponse: string;
    _body: Object;
    _responseObject: Object;
    _status: 'error' | 'success';

    constructor(response: Object, body: ResponseBody) {
        this.setResponseObject(response);
        this.setRawResponse(JSON.stringify(body));
        this.setBody(body);
        this.setStatus(body.status);
    }

    /**
     * Checks if a request failed.
     *
     * @returns {boolean}
     */
    failed(): boolean {
        return (this.getStatus() === 'error');
    }

    /**
     * Checks if a request succeeded.
     *
     * @returns {boolean}
     */
    succeeded(): boolean {
        return !(this.failed());
    }

    /**
     * Retrieves the status.
     *
     * @returns ResponseStatus
     */
    getStatus(): ResponseStatus {
        return this._status;
    }

    /**
     * Sets the status.
     *
     * @param status
     */
    setStatus(status: ResponseStatus) {
        this._status = status;
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

    /**
     * Retrieves the data.
     *
     * @returns {Object}
     */
    getData(): Object {
        return this.getBody().data;
    }

}