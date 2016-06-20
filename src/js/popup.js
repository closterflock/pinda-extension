'use strict';

var Vue = require('vue');
Vue.use(require('vue-resource'));

var ChromeStorage = require('./chrome-storage');

var AuthForm = require('./components/AuthForm.vue');
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
                            id: 4,
                            name: 'gaming'
                        },
                        {
                            id: 17,
                            name: 'kinja'
                        },
                        {
                            id: 18,
                            name: 'blog'
                        }
                    ]
                },
                {
                    title: 'Facebook',
                    url: 'http://facebook.com',
                    tags: [
                        {
                            id: 25,
                            name: 'social media'
                        },
                        {
                            id: 35,
                            name: 'blog'
                        }
                    ]
                }
            ],
            loggedIn: true,
            links: []
        };
    },
    components: {
        'search-bar': SearchBar,
        'result-list': ResultList,
        'auth-form': AuthForm
    },
    methods: {
        onTermChange: function (term) {
            this.links = this.searchForTerm(term);
            console.log(this.links);
        },
        termIsTagSearch: function (term) {
            return (term.match(/\[tag=(.+)\]/g));
        },
        searchForTerm: function (term) {
            var self = this;

            if (self.termIsTagSearch(term)) {
                var expression = new RegExp(/\[tag=(.+)\]/g);
                var matches = expression.exec(term);
                term = matches[1];
            }

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
        prepareTagSearch: function (tag) {
            return '[tag=' + tag + ']';
        },
        onClickedTag: function (name) {
            console.log('name = ' + name);
            console.log(name);
            this.$refs.searchBar.setSearch(this.prepareTagSearch(name), true);
            // this.links = this.data.filter(function (link) {
            //     return link.tags.some(function (tag) {
            //         return (tagId === tag.id);
            //     });
            // });
        },
        checkForMatch: function (needle, haystack) {
            if (typeof haystack === 'undefined' || typeof needle === 'undefined') {
                return false;
            }
            console.log('checking ' + needle + ' vs ' + haystack);
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
        },
        onLogin: function (token) {
            console.log(token);
            this.token = token;
            this.loggedIn = true;
        }
    }
});