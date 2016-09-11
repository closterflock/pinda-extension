'use strict';
// @flow

import React from 'react';

type ComponentKey = 'name' | 'email' | 'password' | 'confirmPassword';

export default class AuthForm extends React.Component {
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    confirmPasswordInput: HTMLInputElement;
    nameInput: HTMLInputElement;

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
        self.addToState = self.addToState.bind(this);
        self.hide = self.hide.bind(this);
        self.show = self.show.bind(this);
    }

    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired
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

    hide(): void {
        this.addToState({
            hidden: true
        });
    }

    show(): void {
        this.addToState({
            hidden: false
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

    render() {
        return (
            <form className={`auth-form ${this.state.hidden ? 'hidden' : ''}`}>
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
                    <input type="text" id="confirmPassword" name="confirmPassword" ref={(i) => this.inputRef(i, 'confirmPassword')}/>
                </label>
                <button onClick={this.onSubmit}>Submit</button>
            </form>
        );
    }
}