'use strict';

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
ChromeStorage.prototype.store = function (data) {
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
ChromeStorage.prototype.set = function (key, value) {
    var data = {};
    data[key] = value;
    return this.store(data);
};

/**
 * Retrieves an item from the storage, or returns a default value.
 *
 * @param key
 * @param defaultValue
 * @returns {Promise}
 */
ChromeStorage.prototype.get = function (key, defaultValue) {
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
ChromeStorage.prototype.getAccessToken = function () {
    return this.get(this._accessTokenKey);
};

/**
 * Sets the access token.
 *
 * @param value
 * @returns {Promise}
 */
ChromeStorage.prototype.setAccessToken = function (value) {
    return this.set(this._accessTokenKey, value);
};

module.exports = new ChromeStorage();