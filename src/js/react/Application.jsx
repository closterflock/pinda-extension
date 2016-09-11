'use strict';
// @flow

import React from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import APIRepository from './../api/api-repository';
import APIResponse from './../api/api-response';
import AuthForm from './AuthForm.jsx';
import ChromeStorage from './../storage/chrome-storage';

export default class Application extends React.Component {
    contentComponent: Content;
    authFormCompoent: AuthForm;
    headerComponent: Header;

    constructor(props: Object) {
        super(props);

        const self: any = this;

        self.onBackButton = self.onBackButton.bind(self);
        self.onNavButton = self.onNavButton.bind(self);
        self.contentMounted = self.contentMounted.bind(self);
        self.attemptLogin = self.attemptLogin.bind(self);
        self.loginSuccess = self.loginSuccess.bind(self);
        self.loginFailure = self.loginFailure.bind(self);
        self.authFormMounted = self.authFormMounted.bind(self);
        self.headerMounted = self.headerMounted.bind(self);
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
        this.authFormCompoent = authForm;
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
        console.log('success');
        console.log(response);
        ChromeStorage.setAccessToken(response.getBody().data.token);
        //TODO show menu button
        this.authFormCompoent.hide();
        this.contentComponent.show();
        this.headerComponent.toggleNavHidden(false);
    }

    loginFailure(response: APIResponse) {
        //TODO show validation errors
        console.log('failure');
        console.log(response);
    }

    render() {
        //TODO determine if we should hide nav based on if we have an auth token
        return (
            <div className='app'>
                <Header
                    ref={this.headerMounted}
                    onBackButton={this.onBackButton}
                    onNavButton={this.onNavButton}
                    navButtonHidden={true}
                />
                <Content ref={this.contentMounted}/>
                <AuthForm ref={this.authFormMounted} onSubmit={this.attemptLogin}/>
            </div>
        );
    }
}