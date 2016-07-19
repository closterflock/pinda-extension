'use strict';

var Vue = require('vue');
Vue.use(require('vue-resource'));

var ChromeStorage = require('./chrome-storage');

var AuthForm = require('./components/AuthForm.vue');
var SearchBar = require('./components/SearchBar.vue');
var ResultList = require('./components/ResultList.vue');
var NewLink = require('./components/NewLink.vue');
var NavMenu = require('./components/NavMenu.vue');

ChromeStorage.getAccessToken().then(function (authToken) {
    Vue.http.headers.common['X-Auth-Token'] = authToken;
    new Vue({
        el: 'body',
        data: function () {
            return {
                loggedIn: typeof authToken !== 'undefined',
                links: [],
                linkForm: false
            };
        },
        components: {
            'search-bar': SearchBar,
            'result-list': ResultList,
            'auth-form': AuthForm,
            'new-link': NewLink,
            'nav-menu': NavMenu
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
                    .get('http://pinda.app/api/v1/links/search', {term: term})
                    .then(function (response) {
                        var data = response.data.data;
                        console.log(response.data);
                        self.links = data.links;
                    });
            },
            attemptLogin: function (email, password) {
                var self = this;
                self
                    .$http
                    .post('http://pinda.app/api/v1/login', {email: email, password: password})
                    .then(function (response) {
                        console.log(response.data.data);
                        var token = response.data.data.token;
                        Vue.http.headers.common['X-Auth-Token'] = token;
                        ChromeStorage.setAccessToken(token).then(function () {
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
            },
            newLink: function () {
                this.linkForm = true;
            },
            onLogout: function () {
                console.log('LOGGING OUT!');
            }
        }
    });
});