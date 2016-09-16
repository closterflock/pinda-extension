'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'

export default class Header extends binder(React.Component) {
    static propTypes = {
        onBackButton: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired,
        backButtonShown: React.PropTypes.bool.isRequired,
        navButtonHidden: React.PropTypes.bool.isRequired,
        navActive: React.PropTypes.bool.isRequired,
        toggleMenu: React.PropTypes.func.isRequired
    };

    backButtonShown(): boolean {
        return this.props.backButtonShown;
    }

    navIsActive(): boolean {
        return this.props.navActive;
    }

    navButtonHidden(): boolean {
        return this.props.navButtonHidden;
    }

    toggleMenu(): void {
        if (!this.navButtonHidden()) {
            this.props.toggleMenu();
        }
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
                <div className={navClasses} onClick={this.toggleMenu}>
                    <div className='icon'></div>
                </div>
            </div>
        );
    }
}