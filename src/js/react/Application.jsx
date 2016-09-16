'use strict';
// @flow

import React from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import APIRepository from './../api/api-repository';
import APIResponse from './../api/api-response';
import AuthForm from './AuthForm.jsx';
import ChromeStorage from './../storage/chrome-storage';
import binder from 'react-class-binder';
import Link from './Link.jsx';

export default class Application extends binder(React.Component) {
    contentComponent: Content;
    authFormComponent: AuthForm;
    headerComponent: Header;

    static propTypes = {
        loggedIn: React.PropTypes.bool
    };

    state: {
        loggedIn: boolean;
        menuActive: boolean;
        links: Array<Object>;
    };

    constructor(props: Object) {
        if (typeof props.loggedIn !== 'boolean') {
            props.loggedIn = false;
        }
        super(props);

        this.state = {
            loggedIn: props.loggedIn,
            menuActive: false,
            links: []
        };
    }

    onBackButton(active: boolean): void {

    }

    onNavButton(active: boolean): void {
        this.contentComponent.setMenu(active);
    }

    contentMounted(content: Content): void {
        this.contentComponent = content;
    }

    authFormMounted(authForm: AuthForm): void {
        this.authFormComponent = authForm;
    }

    headerMounted(header: Header): void {
        this.headerComponent = header;
    }

    attemptLogin(email: string, password: string, register: boolean = false, name: string = '') {
        let promise: ?Promise<APIResponse> = null;
        if (register) {
            promise = APIRepository.register(name, email, password);
        } else {
            promise = APIRepository.login(email, password);
        }

        promise
            .then(this.loginSuccess.bind(this))
            .catch(this.loginFailure.bind(this));
    }

    loginSuccess(response: APIResponse) {
        this.authFormComponent.clearInputs();
        ChromeStorage.setAccessToken(response.getBody().data.token);
        this.setState({
            loggedIn: true,
            menuActive: false
        });
    }

    loginFailure(response: APIResponse) {
        this.authFormComponent.setErrors(response.getBody().data);
    }

    isLoggedIn(): boolean {
        return this.state.loggedIn;
    }

    logout(): void {
        let self = this;
        ChromeStorage.clearAccessToken().then(function () {
            self.setState({
                loggedIn: false,
                menuActive: false
            });
        });
    }

    toggleMenu(): void {
        let newState = !(this.state.menuActive);
        this.setState({
            menuActive: newState
        });
    }

    onSearch(term: string) {
        var self = this;
        APIRepository.search(term).then(function (response: APIResponse) {
            let data: Array<Object> = response.getData().links;
            self.setState({
                links: data
            });
        });
    }

    updateLink(id: string, link: Link) {
        let data: Object = link.getData();
        APIRepository.updateLink(id, data).then(() => {
            let links: Array<Object> = this.state.links.map((link: Object) => {
                if (link.id === id) {
                    link.title = data.title;
                    link.url = data.url;
                    link.description = data.description;
                }
                return link;
            });

            this.setState({
                links: links
            });
        });
    }

    deleteLink(id: string) {
        APIRepository.deleteLink(id);

        let links: Array<Object> = this.state.links.filter((link: Object) => {
            return (link.id !== id);
        });

        this.setState({
            links: links
        });
    }

    render() {
        return (
            <div className='app'>
                <Header
                    ref={this.headerMounted}
                    onBackButton={this.onBackButton}
                    onNavButton={this.onNavButton}
                    backButtonShown={false}
                    navButtonHidden={!this.isLoggedIn()}
                    navActive={this.state.menuActive}
                    toggleMenu={this.toggleMenu}
                />
                <Content
                    ref={this.contentMounted}
                    hidden={!this.isLoggedIn()}
                    onSearch={this.onSearch}
                    links={this.state.links}
                    onSaveLink={this.updateLink}
                    onDeleteLink={this.deleteLink}
                    menuActive={this.state.menuActive}
                    onLogout={this.logout}
                />
                <AuthForm
                    ref={this.authFormMounted}
                    onSubmit={this.attemptLogin}
                    hidden={this.isLoggedIn()}
                />
            </div>
        );
    }
}