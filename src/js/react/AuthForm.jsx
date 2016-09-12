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

    addToState(newState: Object): void {
        let state: Object = this.state;

        for (var key in newState) {
            if (newState.hasOwnProperty(key)) {
                state[key] = newState[key];
            }
        }

        this.setState(state);
    }

    onSubmit(e: Event): void {
        e.preventDefault();
        this.clearErrors();

        //TODO add input validation

        if (this.isRegistration()) {
            this.props.onSubmit(
                this.emailInput.value,
                this.passwordInput.value,
                true,
                this.nameInput.value
            );
        } else {
            this.props.onSubmit(this.emailInput.value, this.passwordInput.value);
        }
    };

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