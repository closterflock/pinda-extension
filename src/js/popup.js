'use strict';

var Vue = require('vue');
var SearchBar = require('./components/SearchBar.vue');
var ResultList = require('./components/ResultList.vue');

new Vue({
    el: 'body',
    data: function () {
        return {
            data: [
                {
                    title: 'Kotaku',
                    description: 'Kotaku\'s main page.',
                    url: 'http://kotaku.com',
                    tags: [
                        {
                            name: 'gaming'
                        },
                        {
                            name: 'kinja'
                        },
                        {
                            name: 'blog'
                        }
                    ]
                },
                {
                    title: 'Facebook',
                    url: 'http://facebook.com',
                    tags: [
                        {
                            name: 'social media'
                        }
                    ]
                }
            ],
            links: []
        };
    },
    components: {
        'search-bar': SearchBar,
        'result-list': ResultList
    },
    methods: {
        onTermChange: function (term) {
            this.links = this.searchForTerm(term);
            console.log(this.links);
        },
        searchForTerm: function (term) {
            var self = this;
            return this.data.filter(function (link) {
                if (self.checkForMatch(term, link.title)) {
                    console.log('title matches.');
                }

                if (self.checkForMatch(term, link.description)) {
                    console.log('description');
                }

                return (
                    self.checkForMatch(term, link.title)
                    ||
                    self.checkForMatch(term, link.description)
                    ||
                    link.tags.some(function (tag) {
                        return self.checkForMatch(term, tag.name);
                    })
                );
            });
        },
        checkForMatch: function (needle, haystack) {
            if (typeof haystack === 'undefined' || typeof needle === 'undefined') {
                return false;
            }
            console.log('checking ' + needle + ' vs ' + haystack);
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
        }
    }
});