'use strict';
// @flow

import React from 'react';

type ComponentKey = 'name' | 'email' | 'password' | 'confirmPassword';

export default class AuthForm extends React.Component {
    emailInput: React.Element<any>;
    passwordInput: React.Element<any>;
    confirmPasswordInput: React.Element<any>;
    nameInput: React.Element<any>;

    state: {
        isRegistration: boolean;
    };

    constructor(props: Object) {
        super(props);

        const self: any = this;

        this.state = {
            isRegistration: false
        };

        self.onSubmit = self.onSubmit.bind(this);
        self.inputRef = self.inputRef.bind(this);
        self.isRegistration = self.isRegistration.bind(this);
        self.getIsRegistrationClass = self.getIsRegistrationClass.bind(this);
        self.toggleRegistration = self.toggleRegistration.bind(this);
    }

    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired
    };

    onSubmit(): void {

    }

    isRegistration(): boolean {
        return this.state.isRegistration;
    }

    inputRef(input: React.Element<any>, key: ComponentKey) {
        let componentKey = `${key}Component`;

        const self: any = this;
        self[componentKey] = input;
    }

    toggleRegistration() {
        this.setState({
            isRegistration: !this.isRegistration()
        });
    }

    getIsRegistrationClass(): string {
        return this.isRegistration() ? '' : 'hidden';
    }

    render() {
        return (
            <form className="auth-form">
                <label htmlFor="name" className={this.getIsRegistrationClass()}>
                    Name
                    <input type="text" id="name" name="name" ref={(i) => this.inputRef(i, 'name')}/>
                </label>
                <label htmlFor="email">
                    Email
                    <input type="text" id="email" name="email" ref={(i) => this.inputRef(i, 'email')}/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="text" id="password" name="password" ref={(i) => this.inputRef(i, 'password')}/>
                </label>
                <label htmlFor="register">
                    Register
                    <input type="checkbox" id="register" name="register" checked={this.isRegistration()} onChange={this.toggleRegistration}/>
                </label>
                <label htmlFor="confirmPassword" className={this.getIsRegistrationClass()}>
                    Confirm Password
                    <input type="text" id="confirmPassword" name="confirmPassword" ref={(i) => this.inputRef(i, 'confirmPassword')}/>
                </label>
                <button onClick={this.onSubmit}>Submit</button>
            </form>
        );
    }
}