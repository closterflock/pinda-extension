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

export default class Application extends binder(React.Component) {
    contentComponent: Content;
    authFormComponent: AuthForm;
    headerComponent: Header;

    static propTypes = {
        loggedIn: React.PropTypes.bool
    };

    state: {
        loggedIn: boolean;
    };

    constructor(props) {
        if (typeof props.loggedIn !== 'boolean') {
            props.loggedIn = false;
        }
        super(props);

        this.state = {
            loggedIn: props.loggedIn
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
        ChromeStorage.setAccessToken(response.getBody().data.token);
        this.setState({
            loggedIn: true,
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
                loggedIn: false
            });
        });
    }

    render() {
        //TODO determine if we should hide nav based on if we have an auth token
        return (
            <div className='app'>
                <Header
                    ref={this.headerMounted}
                    onBackButton={this.onBackButton}
                    onNavButton={this.onNavButton}
                    backButtonShown={false}
                    navButtonHidden={!this.isLoggedIn()}
                />
                <Content
                    ref={this.contentMounted}
                    hidden={!this.isLoggedIn()}
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