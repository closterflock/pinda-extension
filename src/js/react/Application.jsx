'use strict';
// @flow

import React from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import DataStore from './../storage/data-store';
import type {CachedData} from './../storage/data-store';
import APIRepository from './../api/api-repository';
import APIResponse from './../api/api-response';
import AuthForm from './AuthForm.jsx';
import ChromeStorage from './../storage/chrome-storage';
import binder from 'react-class-binder';
import Link from './Link.jsx';
import NewLink from './NewLink.jsx';
import Menu from './Menu.jsx';
import {CONTENT_COMPONENT, AUTH_COMPONENT, NEW_LINK_COMPONENT} from './component-constants';
import type {DisplayedComponent} from './component-constants';

export default class Application extends binder(React.Component) {
    contentComponent: Content;
    authFormComponent: AuthForm;
    headerComponent: Header;
    newLinkComponent: NewLink;

    static propTypes = {
        loggedIn: React.PropTypes.bool
    };

    state: {
        loggedIn: boolean;
        menuActive: boolean;
        links: Array<Object>;
        newLinkActive: boolean;
        displayedComponent: DisplayedComponent;
    };

    constructor(props: Object) {
        if (typeof props.loggedIn !== 'boolean') {
            props.loggedIn = false;
        }
        super(props);

        this.state = {
            loggedIn: props.loggedIn,
            menuActive: false,
            links: [],
            newLinkActive: false,
            displayedComponent: props.loggedIn ? CONTENT_COMPONENT : AUTH_COMPONENT
        };
    }

    getDisplayedComponent(): DisplayedComponent {
        return this.state.displayedComponent;
    }

    setDisplayedComponent(view: DisplayedComponent): void {
        this.setState({
            displayedComponent: view
        }, () => {
            console.log(this.state.displayedComponent);
        });
    }

    isDisplayed(view: DisplayedComponent): boolean {
        return this.getDisplayedComponent() === view;
    }

    toggleDisplay(view: DisplayedComponent): void {
        if (this.isDisplayed(view)) {
            this.setDisplayedComponent(CONTENT_COMPONENT);
        } else {
            this.setDisplayedComponent(view);
        }
    }

    toggleNewLink(): void {
        this.toggleDisplay(NEW_LINK_COMPONENT);
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

    newLinkMounted(newLink: NewLink): void {
        this.newLinkComponent = newLink;
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
        let token: string = response.getBody().data.token;
        this.authFormComponent.clearInputs();
        ChromeStorage.setAccessToken(token);
        APIRepository.setAuthToken(token);
        this.setState({
            loggedIn: true,
            displayedComponent: CONTENT_COMPONENT
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
        ChromeStorage.clearAccessToken();
        APIRepository.clearAuthToken();
        self.setState({
            loggedIn: false,
            menuActive: false,
            displayedComponent: AUTH_COMPONENT
        });
    }

    newLink(title: string, description: string, url: string): void {
        APIRepository.newLink(title, description, url);
        this.newLinkComponent.clearInputs();
        this.setDisplayedComponent(CONTENT_COMPONENT);
    }

    toggleMenu(): void {
        let newState = !(this.state.menuActive);
        this.setState({
            menuActive: newState
        });
    }

    onSearch(term: string) {
        var self = this;

        if (term.length < 1) {
            return self.setState({
                links: []
            });
        }

        term = term.toLowerCase();
        DataStore.getCachedData().then(function (cachedData: CachedData) {
            console.log('cachedData', cachedData);
            var linkObj: Object = cachedData.links;
            let links = window.Object.values(linkObj).filter(function (link: Object) {
                return (typeof link.title === 'string' && link.title.toLowerCase().indexOf(term) > -1) ||
                    (typeof link.description === 'string' && link.description.toLowerCase().indexOf(term) > -1) ||
                    link.url.toLowerCase().indexOf(term) > -1;
            });
            console.log('newLinks', links);
            self.setState({
                links: links
            });
        });
        // APIRepository.search(term).then(function (response: APIResponse) {
        //     let data: Array<Object> = response.getData().links;
        //     self.setState({
        //         links: data
        //     });
        // });
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
                    toggleNewLink={this.toggleNewLink}
                    onNavButton={this.onNavButton}
                    loggedIn={this.isLoggedIn()}
                    navActive={this.state.menuActive}
                    toggleMenu={this.toggleMenu}
                    displayedComponent={this.getDisplayedComponent()}
                />
                <section className="main">
                    <Content
                        ref={this.contentMounted}
                        onSearch={this.onSearch}
                        links={this.state.links}
                        onSaveLink={this.updateLink}
                        onDeleteLink={this.deleteLink}
                        displayedComponent={this.getDisplayedComponent()}
                    />
                    <AuthForm
                        ref={this.authFormMounted}
                        onSubmit={this.attemptLogin}
                        displayedComponent={this.getDisplayedComponent()}
                    />
                    <NewLink
                        ref={this.newLinkMounted}
                        displayedComponent={this.getDisplayedComponent()}
                        onSubmit={this.newLink}
                    />
                    <Menu
                        active={this.state.menuActive}
                        onLogout={this.logout}
                    />
                </section>
            </div>
        );
    }
}