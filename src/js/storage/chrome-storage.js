'use strict';
// @flow

type TokenAndTimestamp = {
    token?: string,
    timestamp?: string
};

class ChromeStorage {
    _storage: any;
    _accessTokenKey: string;
    _lastSyncedTimestamp: string;
    _cachedDataKey: string;

    constructor() {
        this._storage = chrome.storage.local;
        this._accessTokenKey = 'accessToken';
        this._lastSyncedTimestamp = 'lastSynced';
        this._cachedDataKey = 'cachedData';
    }

    /**
     * Stores an object into the storage.
     *
     * @param data
     * @returns {Promise}
     */
    store(data: Object): Promise<*> {
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
    set(key: string, value: any): Promise<*> {
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
    remove(key: string): Promise<*> {
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
    clearAll(): Promise<*> {
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
    get(key: string, defaultValue: any = undefined): Promise<*> {
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
    getAccessToken(): Promise<string> {
        return this.get(this._accessTokenKey);
    };

    /**
     * Retrieves the last synced timestamp from storage.
     *
     * @returns {Promise}
     */
    getLastSyncedTimestamp(): Promise<string> {
        return this.get(this._lastSyncedTimestamp);
    }

    setLastSyncedTimestamp(timestamp: string): Promise<*> {
        return this.set(this._lastSyncedTimestamp, timestamp);
    }

    getCachedData(): Promise<string> {
        return this.get(this._cachedDataKey);
    }

    setCachedData(cachedData: string): Promise<*> {
        return this.set(this._cachedDataKey, cachedData);
    }

    /**
     * Sets the access token.
     *
     * @param value
     * @returns {Promise}
     */
    setAccessToken(value: any): Promise<*> {
        return this.set(this._accessTokenKey, value);
    };

    /**
     * Clears the access token.
     *
     * @returns {Promise}
     */
    clearAccessToken(): Promise<*> {
        return this.remove(this._accessTokenKey);
    };
}

export type {TokenAndTimestamp};

export default new ChromeStorage();