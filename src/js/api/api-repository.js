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
        return 'http://pinda.jamesspencemilwaukee.com';
    }

    /**
     * Prepares a request and sets the auth token.
     *
     * @return {Request}
     */
    prepareRequest(): Request {
        let request: Request = new Request();
        request.appendHeader('X-Auth-Token', this.token);
        return request;
    };

    /**
     * Refreshes the auth token from chrome storage.
     */
    refreshAuthToken(): void {
        let self = this;
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
        let request: Request = this.prepareRequest();
        request.setMethod('GET');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/tags');

        return request.makeRequest();
    };

    /**
     * Attempts login.
     *
     * @param email
     * @param password
     * @returns {Promise.<APIResponse>}
     */
    login(email: string, password: string): Promise<APIResponse> {
        let request: Request = new Request();

        request.setMethod('POST');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/login');
        request.setParams({
            email: email,
            password: password
        });

        return request.makeRequest();
    }

    /**
     * Attempts a registration
     *
     * @param name
     * @param email
     * @param password
     * @returns {Promise.<APIResponse>}
     */
    register(name: string, email: string, password: string): Promise<APIResponse> {
        let request: Request = new Request();

        request.setMethod('POST');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/register');
        request.setParams({
            name: name,
            email: email,
            password: password
        });

        return request.makeRequest();
    }
}

export default new APIRepository();