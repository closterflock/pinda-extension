'use strict';
// @flow

var Vue = require('vue');

function VueSettings() {
    Vue.use(require('vue-resource'));
    this._authHeaderKey = 'X-Auth-Token';
    this.setCustomDirectives();
}

/**
 * Sets the custom directives on Vue.
 */
VueSettings.prototype.setCustomDirectives = function (): void {
    Vue.directive('opaque', function (value) {
        if (value) {
            this.el.style.opacity = 1;
            this.el.style.zIndex = '';
        } else {
            this.el.style.opacity = 0;
            this.el.style.zIndex = -999999999;
        }
    });
};

/**
 * Clears our auth header.
 */
VueSettings.prototype.clearAuthTokenHeader = function (): void {
    Vue.http.headers.common[this._authHeaderKey] = undefined;
};

/**
 * Retrieves our auth header.
 *
 * @returns {string}
 */
VueSettings.prototype.getAuthTokenHeader = function (): string {
    return Vue.http.headers.common[this._authHeaderKey];
};

/**
 * Sets our auth header.
 *
 * @param authToken
 */
VueSettings.prototype.setAuthTokenHeader = function (authToken): void {
    Vue.http.headers.common[this._authHeaderKey] = authToken;
};

module.exports = new VueSettings();