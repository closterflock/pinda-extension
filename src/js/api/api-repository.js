'use strict';
// @flow

import Request from './request';
import ChromeStorage from './../storage/chrome-storage';
import APIResponse from './api-response';

class APIRepository {
    token: string;

    constructor() {
        this.refreshAuthToken();
    }

    static getBaseUrl(): string {
        return 'http://pinda.app';
    }

    /**
     * Prepares a request and sets the auth token.
     *
     * @return {Request}
     */
    prepareRequest(): Request {
        var request: Request = new Request();
        request.appendHeader('X-Auth-Token', this.token);
        return request;
    };

    /**
     * Refreshes the auth token from chrome storage.
     */
    refreshAuthToken(): void {
        var self = this;
        ChromeStorage.getAccessToken().then(function (token) {
            self.setAuthToken(token);
        });
    }

    setAuthToken(token: string): void {
        this.token = token;
    }

    /**
     * Retrieves tags from the API.
     *
     * @return {Promise<Class<APIResponse>>}
     */
    getTags(): Promise<APIResponse> {
        var request: Request = this.prepareRequest();
        request.setMethod('GET');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/tags');

        return request.makeRequest();
    };
}

export default new APIRepository();