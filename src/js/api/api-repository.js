'use strict';
// @flow

import Request from './request';
import VueSettings from './../config/vue-settings';
import APIResponse from './api-response';

class APIRepository {
    static getBaseUrl(): string {
        return 'http://pinda.app';
    }

    /**
     * Prepares a request and sets the auth token.
     *
     * @return {Request}
     */
    static prepareRequest(): Request {
        var request: Request = new Request();
        //TODO set auth token via a settings class, other than vue-settings
        request.appendHeader('X-Auth-Token', VueSettings.getAuthTokenHeader());

        return request;
    };

    /**
     * Retrieves tags from the API.
     *
     * @return {Promise<Class<APIResponse>>}
     */
    getTags(): Promise<APIResponse> {
        var request: Request = APIRepository.prepareRequest();
        request.setMethod('GET');
        request.setUrl(this.constructor.getBaseUrl() + '/api/v1/tags');

        return request.makeRequest();
    };
}

export default new APIRepository();