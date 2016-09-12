'use strict';
// @flow

import React from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import APIRepository from './../api/api-repository';
import APIResponse from './../api/api-response';
import AuthForm from './AuthForm.jsx';
import ChromeStorage from './../storage/chrome-storage';
import binder from 'react-class-binder'
import Menu from './Menu.jsx'

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
    };

    constructor(props: Object) {
        if (typeof props.loggedIn !== 'boolean') {
            props.loggedIn = false;
        }
        super(props);

        this.state = {
            loggedIn: props.loggedIn,
            menuActive: false
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

        console.log(this);
        //TODO reject on error response, so we can catch it here
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
                />
                <AuthForm
                    ref={this.authFormMounted}
                    onSubmit={this.attemptLogin}
                    hidden={this.isLoggedIn()}
                />
                <Menu
                    ref={this.menuMounted}
                    active={this.state.menuActive}
                    onLogout={this.logout}
                />
            </div>
        );
    }
}