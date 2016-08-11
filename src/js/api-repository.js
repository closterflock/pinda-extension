'use strict';

var Request = require('./request');
var VueSettings = require('./vue-settings');

function APIRepository() {
    this.baseURL = 'http://pinda.app';
}

/**
 * Prepares a request and sets the auth token.
 *
 * @return {Request}
 */
APIRepository.prototype.prepareRequest = function () {
    var request = new Request();
    //TODO set auth token via a settings class?
    request.appendHeader('X-Auth-Token', VueSettings.getAuthTokenHeader());

    return request;
};

/**
 * Retrieves tags from the API.
 *
 * @return {Promise}
 */
APIRepository.prototype.getTags = function () {
    var request = this.prepareRequest();
    request.setMethod('GET');
    request.setUrl(this.baseURL + '/api/v1/tags');

    return request.makeRequest();
};

module.exports = new APIRepository();