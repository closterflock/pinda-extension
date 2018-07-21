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
        return 'http://pinda.test';
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

    clearAuthToken(): void {
        this.setAuthToken("");
    }

    setAuthToken(token: string): void {
        this.token = token;
    }

    newLink(title: string, description: string, url: string): Promise<APIResponse> {
        let request: Request = this.prepareRequest();
        request.setMethod('POST');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/links/new');
        request.setParams({
            title: title,
            description: description,
            url: url
        });

        return request.makeRequest();
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
     * Updates a link.
     *
     * @param linkId
     * @param data
     * @returns {Promise.<APIResponse>}
     */
    updateLink(linkId: string, data: Object): Promise<APIResponse> {
        let request: Request = this.prepareRequest();
        request.setMethod('PUT');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/links/' + linkId);
        request.setParams(data);

        return request.makeRequest();
    }

    /**
     * Deletes a link.
     *
     * @param linkId
     * @returns {Promise.<APIResponse>}
     */
    deleteLink(linkId: string): Promise<APIResponse> {
        let request: Request = this.prepareRequest();
        request.setMethod('DELETE');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/links/' + linkId);

        return request.makeRequest();
    }

    /**
     * Searches for links.
     *
     * @param term
     * @returns {Promise.<APIResponse>}
     */
    search(term: string): Promise<APIResponse> {
        let request: Request = this.prepareRequest();
        request.setMethod('GET');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/links/search');
        request.setParams({
            term: term
        });

        return request.makeRequest();
    }

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

    sync(timestamp?: string): Promise<APIResponse> {
        let request: Request = this.prepareRequest();

        request.setMethod('GET');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/sync');
        if (typeof timestamp === 'string') {
            request.setParams({
                timestamp: timestamp
            });
        }

        return request.makeRequest();
    }
}

export default new APIRepository();