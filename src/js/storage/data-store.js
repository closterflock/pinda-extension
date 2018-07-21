'use strict';

import ChromeStorage from './chrome-storage';
import APIRepository from '../api/api-repository';
import APIResponse from '../api/api-response';

type SyncData = {
    links: Array<Object>,
    tags: Array<Object>,
    link_tags: Array<Object>,
    deleted_links: Array<Object>,
    deleted_tags: Array<Object>,
}

type CachedData = {
    links: Object,
    tags: Object,
};

type Link = {
    id: Number,
    title: string,
    description: string,
    url: string,
    tags: Array<Number>
};

type Tag = {
    id: Number,
    name: string
};

class DataStore {
    _cachedData: CachedData;

    constructor() {
        this._cachedData = undefined;
    }

    triggerSync(): Promise<*> {
        var self = this;
        return ChromeStorage.getLastSyncedTimestamp()
            .then(function (timestamp: string) {
                console.log('requesting API');
                return APIRepository.sync(timestamp);
            }).catch(function (response: APIResponse) {
                //TODO properly handle
                console.error('unable to sync up data', response);
            }).then(this.cacheDataChanges.bind(this))
            .then(function () {
                ChromeStorage.setLastSyncedTimestamp(new Date().toISOString());
                return self.getCachedData();
            });
    }

    getCachedData(): Promise<CachedData> {
        if (typeof this._cachedData !== 'undefined') {
            return Promise.resolve(this._cachedData);
        }

        var self = this;
        return ChromeStorage.getCachedData()
            .then(function (json) {
                if (typeof json === 'undefined') {
                    return undefined;
                }

                var cachedData: CachedData = window.JSON.parse(json);
                self._cachedData = cachedData;

                return cachedData;
            })
    }

    saveCachedData(cachedData: CachedData): Promise<*> {
        this._cachedData = cachedData;
        return ChromeStorage.setCachedData(window.JSON.stringify(cachedData));
    }

    cacheDataChanges(response: APIResponse): Promise<*> {
        console.log('response', response);
        var data: SyncData = response.getData();

        var links = data.links;
        var tags = data.tags;
        var linkTags = data.link_tags;
        var deletedLinks = data.deleted_links;
        var deletedTags = data.deleted_tags;

        var self = this;
        return this.getCachedData()
            .then(function (cachedData: CachedData) {
                if (typeof cachedData === 'undefined') {
                    return {
                        links: {},
                        tags: {}
                    };
                }
                //TODO combine new sync data into existing data set
                //TODO do we have to worry about it not being set initially?
                //TODO not worry about it currently
            }).then(function (cachedData: CachedData) {
                deletedLinks.forEach(function (deletedLink: Link) {
                    delete cachedData.links[deletedLink.id];
                });
                deletedTags.forEach(function (deletedTag: Tag) {
                    delete cachedData.tags[deletedTag.id];
                });

                links.forEach(function (newLink: Link) {
                    var linkId = newLink.id;
                    var tagIds = linkTags.filter(function (linkTag) {
                        return linkTag.link_id === linkId;
                    }).map(function (linkTag) {
                        return linkTag.tag_id;
                    });

                    var link: Link = newLink;
                    link.tags = tagIds;
                    cachedData.links[linkId] = link;
                });

                tags.forEach(function (tag: Tag) {
                    var tagId = tag.id;
                    cachedData.tags[tagId] = tag;
                });

                return self.saveCachedData(cachedData);
            });
    }
}

export default new DataStore();