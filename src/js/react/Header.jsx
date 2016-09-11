'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'

export default class Header extends binder(React.Component) {
    static propTypes = {
        onBackButton: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired,
        navButtonHidden: React.PropTypes.bool
    };

    state: {
        backButtonShown: boolean;
        navActive: boolean;
        navButtonHidden: boolean;
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            backButtonShown: false,
            navActive: false,
            navButtonHidden: (typeof props.navButtonHidden === 'boolean' ? props.navButtonHidden: true)
        };
    }

    getCurrentState(): Object {
        return this.state;
    }

    backButtonShown(): boolean {
        return this.getCurrentState().backButtonShown;
    }

    toggleBackButtonShown(newState: boolean): void {
        if (typeof newState !== 'boolean') {
            newState = !this.backButtonShown();
        }
        var state: Object = this.getCurrentState();

        this.props.onBackButton(newState);
        state.backButtonShown = newState;
        this.setState(state);
    }

    navIsActive(): boolean {
        return this.getCurrentState().navActive;
    }

    toggleNav(newState: boolean): void {
        if (typeof newState !== 'boolean') {
            newState = !this.navIsActive();
        }
        var state: Object = this.getCurrentState();

        this.props.onNavButton(newState);
        state.navActive = newState;
        this.setState(state);
    }

    toggleNavHidden(newState: boolean): void {
        if (typeof newState !== 'boolean') {
            newState = !this.navButtonHidden();
        }
        let state: Object = this.getCurrentState();

        state.navButtonHidden = newState;
        this.setState(state);
    }

    navButtonHidden(): boolean {
        return this.getCurrentState().navButtonHidden;
    }

    render() {
        let navClasses: string = 'nav-button' +
            (this.navIsActive() ? ' active' : '') +
            (this.navButtonHidden() ? ' hidden' : '');
        return (
            <div className='header'>
                <h1 className={'back-button ' + (this.backButtonShown() ? 'active' : '')}>
                    &lt;
                </h1>
                <h1 className="header-text">
                    Pinda
                </h1>
                <div className={navClasses} onClick={this.toggleNav}>
                    <div className='icon'></div>
                </div>
            </div>
        );
    }
}