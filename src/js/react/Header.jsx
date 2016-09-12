'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'

export default class Header extends binder(React.Component) {
    static propTypes = {
        onBackButton: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired,
        backButtonShown: React.PropTypes.bool.isRequired,
        navButtonHidden: React.PropTypes.bool.isRequired
    };

    state: {
        navActive: boolean
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            navActive: false
        };
    }

    toggleNav(newState: boolean) {
        if (typeof newState !== 'boolean') {
            newState = !this.navIsActive();
        }
        this.props.onNavButton(newState);
        this.setState({
            navActive: newState
        });
    }

    backButtonShown(): boolean {
        return this.props.backButtonShown;
    }

    navIsActive(): boolean {
        return this.state.navActive;
    }

    navButtonHidden(): boolean {
        return this.props.navButtonHidden;
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