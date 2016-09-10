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

        promise
            .then(this.loginSuccess.bind(this))
            .catch(this.loginFailure.bind(this));
    }

    loginSuccess(response: APIResponse) {

    }

    loginFailure(response: APIResponse) {

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