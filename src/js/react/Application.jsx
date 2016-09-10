'use strict';
// @flow

import React from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import APIRepository from './../api/api-repository';
import APIResponse from './../api/api-response';
import AuthForm from './AuthForm.jsx';

export default class Application extends React.Component {
    contentComponent: Content;

    constructor(props: Object) {
        super(props);

        const self: any = this;

        self.onBackButton = self.onBackButton.bind(self);
        self.onNavButton = self.onNavButton.bind(self);
        self.contentMounted = self.contentMounted.bind(self);
        self.attemptLogin = self.attemptLogin.bind(self);
        self.loginSuccess = self.loginSuccess.bind(self);
        self.loginFailure = self.loginFailure.bind(self);
    }

    onBackButton(active: boolean): void {

    }

    onNavButton(active: boolean): void {
        this.contentComponent.setMenu(active);
    }

    contentMounted(content: Content): void {
        this.contentComponent = content;
    }

    attemptLogin(email: string, password: string, register: boolean = false, name: string = '') {
        let promise: ?Promise<APIResponse> = null;
        if (register) {
            promise = APIRepository.register(name, email, password);
        } else {
            promise = APIRepository.login(email, password);
        }

        console.log(this);
        console.log(this.loginSuccess);
        console.log(this.loginFailure);
        //TODO reject on error response, so we can catch it here
        promise
            .then(this.loginSuccess.bind(this))
            .catch(this.loginFailure.bind(this));
    }

    loginSuccess(response: APIResponse) {
        console.log('success');
        console.log(response);
    }

    loginFailure(response: APIResponse) {
        console.log('failure');
        console.log(response);
    }

    render() {
        return (
            <div className='app'>
                <Header onBackButton={this.onBackButton} onNavButton={this.onNavButton}/>
                {/*<Content ref={this.contentMounted}/>*/}
                <AuthForm onSubmit={this.attemptLogin}/>
            </div>
        );
    }
}