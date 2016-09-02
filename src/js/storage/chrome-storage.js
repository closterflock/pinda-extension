'use strict';
// @flow

function ChromeStorage() {
    this._storage = chrome.storage.local;
    this._accessTokenKey = 'accessToken';
}

/**
 * Stores an object into the storage.
 *
 * @param data
 * @returns {Promise}
 */
ChromeStorage.prototype.store = function (data: Object): Promise<*> {
    var self = this;
    return new Promise(function (resolve) {
        self._storage.set(data, resolve);
    });
};

/**
 * Sets a key and value to the storage.
 *
 * @param key
 * @param value
 * @returns {Promise}
 */
ChromeStorage.prototype.set = function (key: string, value: any): Promise<*> {
    var data = {};
    data[key] = value;
    return this.store(data);
};

/**
 * Removes an item from storage.
 *
 * @param key
 * @returns {Promise}
 */
ChromeStorage.prototype.remove = function (key: string): Promise<*> {
    var self = this;
    return new Promise(function (resolve) {
        self._storage.remove(key, resolve);
    });
};

/**
 * Clears out the storage.
 *
 * @returns {Promise}
 */
ChromeStorage.prototype.clearAll = function (): Promise<*> {
    var self = this;
    return new Promise(function (resolve) {
        self._storage.clear(resolve);
    });
};

/**
 * Retrieves an item from the storage, or returns a default value.
 *
 * @param key
 * @param defaultValue
 * @returns {Promise}
 */
ChromeStorage.prototype.get = function (key: string, defaultValue: any): Promise<*> {
    var self = this;
    return new Promise(function (resolve) {
        self._storage.get(key, function (values) {
            var value = values[key];
            if (typeof value === 'undefined') {
                value = defaultValue;
            }

            return resolve(value);
        })
    });
};

/**
 * Retrieves the access token.
 *
 * @returns {Promise}
 */
ChromeStorage.prototype.getAccessToken = function (): Promise<*> {
    return this.get(this._accessTokenKey);
};

/**
 * Sets the access token.
 *
 * @param value
 * @returns {Promise}
 */
ChromeStorage.prototype.setAccessToken = function (value: any): Promise<*> {
    return this.set(this._accessTokenKey, value);
};

/**
 * Clears the access token.
 *
 * @returns {Promise}
 */
ChromeStorage.prototype.clearAccessToken = function (): Promise<*> {
    return this.remove(this._accessTokenKey);
};

module.exports = new ChromeStorage();