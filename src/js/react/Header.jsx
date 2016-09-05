'use strict';
// @flow

import React from 'react';

type State = {
    backButtonShown: boolean;
    navActive: any
};

export default class Header extends React.Component {
    propTypes: {
        onBackButton: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired
    };
    state: State;

    static getInitialState(): State {
        return {
            backButtonShown: false,
            navActive: false
        };
    }

    getCurrentState(): State {
        return this.state;
    }

    backButtonShown(): boolean {
        return this.getCurrentState().backButtonShown;
    }

    toggleBackButtonShown(newState: boolean): void {
        if (typeof newState !== 'boolean') {
            newState = !this.backButtonShown();
        }
        var state: State = this.getCurrentState();

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
        var state: State = this.getCurrentState();

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