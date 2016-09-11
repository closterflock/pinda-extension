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
        console.log('success');
        console.log(response);
        ChromeStorage.setAccessToken(response.getBody().data.token);
        //TODO show menu button
        this.authFormComponent.hide();
        this.contentComponent.show();
        this.headerComponent.toggleNavHidden(false);
    }

    loginFailure(response: APIResponse) {
        //TODO show validation errors
        console.log('failure');
        console.log(response);
        this.authFormComponent.setErrors(response.getBody().data);
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