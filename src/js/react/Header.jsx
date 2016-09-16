'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'

export default class Header extends binder(React.Component) {
    static propTypes = {
        toggleNewLink: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired,
        navActive: React.PropTypes.bool.isRequired,
        toggleMenu: React.PropTypes.func.isRequired,
        loggedIn: React.PropTypes.bool.isRequired,
        newLinkActive: React.PropTypes.bool.isRequired
    };

    newLinkShown(): boolean {
        return this.isLoggedIn();
    }

    toggleNewLink(): void {
        if (this.newLinkShown()) {
            this.props.toggleNewLink();
        }
    }

    newLinkActive(): boolean {
        return this.props.newLinkActive;
    }

    navIsActive(): boolean {
        return this.props.navActive;
    }

    isLoggedIn(): boolean {
        return this.props.loggedIn;
    }

    navButtonHidden(): boolean {
        return !(this.isLoggedIn());
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
                <div className={'new-link-button ' + (this.newLinkShown() ? '' : 'hidden')}>
                    <i
                        className={'fa fa-times ' + (this.newLinkActive() ? 'active' : '')}
                        onClick={this.toggleNewLink}
                    />
                </div>
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