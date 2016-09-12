'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'

type ComponentKey = 'name' | 'email' | 'password' | 'confirmPassword';

export default class AuthForm extends binder(React.Component) {
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    confirmPasswordInput: HTMLInputElement;
    nameInput: HTMLInputElement;

    state: {
        isRegistration: boolean;
        errors: Array<string>
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            isRegistration: false,
            errors: []
        };
    }

    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
        hidden: React.PropTypes.bool.isRequired
    };

    clearInputs(): void {
        this.emailInput.value = '';
        this.passwordInput.value = '';
        this.confirmPasswordInput.value = '';
        this.nameInput.value = '';
    }

    onSubmit(e: Event): void {
        var self = this;
        e.preventDefault();
        self.clearErrors();

        //TODO add input validation

        if (self.isRegistration()) {
            self.validateRegistration().then(function (errors: Array<string>) {
                if (errors.length > 0) {
                    self.setErrors(errors);
                    return;
                }

                self.props.onSubmit(
                    self.emailInput.value,
                    self.passwordInput.value,
                    true,
                    self.nameInput.value
                );
            });
        } else {
            self.validateLogin().then(function (errors: Array<string>) {
                if (errors.length > 0) {
                    self.setErrors(errors);
                    return;
                }

                self.props.onSubmit(
                    self.emailInput.value,
                    self.passwordInput.value
                );
            });
        }
    };

    validateLogin(): Promise<Array<string>> {
        let self = this;
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return new Promise(function (resolve, reject) {
            let errors: Array<string> = [];
            if (!regex.test(self.emailInput.value)) {
                errors.push('Please provide a valid email address.');
            }
            
            if (self.passwordInput.value.length < 1) {
                errors.push('Please provide a password.');
            }

            return resolve(errors);
        });
    }

    validateRegistration(): Promise<Array<string>> {
        let self = this;
        return self.validateLogin().then(function (errors: Array<string>) {
            if (self.nameInput.value.length < 1) {
                errors.push('Please provide a name.');
            }

            if (self.confirmPasswordInput.value.length < 1) {
                errors.push('Please confirm your password.');
            } else if (self.confirmPasswordInput.value !== self.passwordInput.value) {
                errors.push('Please ensure your passwords match.');
            }

            return errors;
        });
    }

    isRegistration(): boolean {
        return this.state.isRegistration;
    }

    inputRef(input: HTMLInputElement, key: ComponentKey): void {
        let componentKey = `${key}Input`;

        const self: any = this;
        self[componentKey] = input;
    }

    toggleRegistration(): void {
        this.setState({
            isRegistration: !this.isRegistration()
        });
    }

    getIsRegistrationClass(): string {
        return this.isRegistration() ? '' : 'hidden';
    }

    clearErrors(): void {
        this.setState({
            errors: []
        });
    }

    setErrors(errors: Array<string>): void {
        this.setState({
            errors: errors
        });
    }

    render() {
        let errors: Array<React.Element<any>> = this.state.errors.map(function (error, index) {
            return (
                <p key={index} className="error">
                    {error}
                </p>
            );
        });

        return (
            <form className={`auth-form ${this.props.hidden ? 'hidden' : ''}`}>
                {errors}
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
                    <input type="password" id="password" name="password" ref={(i) => this.inputRef(i, 'password')}/>
                </label>
                <label htmlFor="register">
                    Register
                    <input type="checkbox" id="register" name="register" checked={this.isRegistration()} onChange={this.toggleRegistration}/>
                </label>
                <label htmlFor="confirmPassword" className={this.getIsRegistrationClass()}>
                    Confirm Password
                    <input type="password" id="confirmPassword" name="confirmPassword" ref={(i) => this.inputRef(i, 'confirmPassword')}/>
                </label>
                <button onClick={this.onSubmit}>Submit</button>
            </form>
        );
    }
}