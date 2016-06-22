'use strict';

var Vue = require('vue');
Vue.use(require('vue-resource'));

var ChromeStorage = require('./chrome-storage');

var AuthForm = require('./components/AuthForm.vue');
var SearchBar = require('./components/SearchBar.vue');
var ResultList = require('./components/ResultList.vue');

ChromeStorage.getAccessToken().then(function (authToken) {
    new Vue({
        el: 'body',
        data: function () {
            return {
                loggedIn: typeof authToken !== 'undefined',
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
                self
                    .$http
                    .get('http://pinda/app/api/v1/links/search', {term: term})
                    .then(function (response) {
                        console.log(response.data);
                    });

                // if (self.termIsTagSearch(term)) {
                //     var expression = new RegExp(/\[tag=(.+)\]/g);
                //     var matches = expression.exec(term);
                //     term = matches[1];
                // }
                //
                // return this.data.filter(function (link) {
                //     if (self.checkForMatch(term, link.title)) {
                //         console.log('title matches.');
                //     }
                //
                //     if (self.checkForMatch(term, link.description)) {
                //         console.log('description');
                //     }
                //
                //     return (
                //         self.checkForMatch(term, link.title)
                //         ||
                //         self.checkForMatch(term, link.description)
                //         ||
                //         link.tags.some(function (tag) {
                //             return self.checkForMatch(term, tag.name);
                //         })
                //     );
                // });
            },
            attemptLogin: function (email, password) {
                var self = this;
                self
                    .$http
                    .post('http://pinda.app/api/v1/login', {email: email, password: password})
                    .then(function (response) {
                        console.log(response.data.data);
                        ChromeStorage.setAccessToken(response.data.data.token).then(function () {
                            ChromeStorage.getAccessToken().then(function (token) {
                                console.log('token = ');
                                console.log(token);
                            });
                        }).catch(function (e) {
                            console.log(e);
                        });
                        self.loggedIn = true;
                        // console.log(response);
                    }).catch(function (response) {
                        console.log('error here');
                        console.log(response.data);
                    });

            },
            prepareTagSearch: function (tag) {
                return '[tag=' + tag + ']';
            },
            onClickedTag: function (name) {
                console.log('name = ' + name);
                console.log(name);
                this.$refs.searchBar.setSearch(this.prepareTagSearch(name), true);
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
});