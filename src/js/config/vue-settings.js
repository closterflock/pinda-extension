'use strict';
// @flow

import Vue from 'vue';
import VueResource from 'vue-resource';

class VueSettings {
    _authHeaderKey: string;

    constructor() {
        Vue.use(VueResource);
        this._authHeaderKey = 'X-Auth-Token';
        this.constructor.setCustomDirectives();
    }

    /**
     * Sets the custom directives on Vue.
     */
    static setCustomDirectives(): void {
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
    clearAuthTokenHeader(): void {
        Vue.http.headers.common[this._authHeaderKey] = undefined;
    };

    /**
     * Retrieves our auth header.
     *
     * @returns {string}
     */
    getAuthTokenHeader(): string {
        return Vue.http.headers.common[this._authHeaderKey];
    };

    /**
     * Sets our auth header.
     *
     * @param authToken
     */
    setAuthTokenHeader(authToken: string): void {
        Vue.http.headers.common[this._authHeaderKey] = authToken;
    };
}

export default new VueSettings();