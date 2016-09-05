'use strict';
// @flow

import React from 'react';

export default class Header extends React.Component {
    static propTypes = {
        onBackButton: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired
    };

    state: {
        backButtonShown: boolean;
        navActive: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            backButtonShown: false,
            navActive: false
        };

        const self: any = this;

        self.backButtonShown = self.backButtonShown.bind(self);
        self.toggleBackButtonShown = self.toggleBackButtonShown.bind(self);
        self.navIsActive = self.navIsActive.bind(self);
        self.toggleNav = self.toggleNav.bind(self);
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

    render() {
        return (
            <div className='header'>
                <h1 className={'back-button ' + (this.backButtonShown() ? 'active' : '')}>
                    &lt;
                </h1>
                <h1 className="header-text">
                    Pinda
                </h1>
                <div className={'nav-button ' + (this.navIsActive() ? 'active' : '')} onClick={this.toggleNav}>
                    <div className='icon'></div>
                </div>
            </div>
        );
    }
}