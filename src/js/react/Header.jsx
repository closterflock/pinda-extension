'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'
import {NEW_LINK_COMPONENT} from './component-constants';

export default class Header extends binder(React.Component) {
    static propTypes = {
        toggleNewLink: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired,
        navActive: React.PropTypes.bool.isRequired,
        toggleMenu: React.PropTypes.func.isRequired,
        loggedIn: React.PropTypes.bool.isRequired,
        displayedComponent: React.PropTypes.string.isRequired
    };

    newLinkButtonShown(): boolean {
        return this.isLoggedIn();
    }

    toggleNewLink(): void {
        if (this.newLinkButtonShown()) {
            this.props.toggleNewLink();
        }
    }

    newLinkActive(): boolean {
        return this.props.displayedComponent === NEW_LINK_COMPONENT;
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
                <div className={'new-link-button ' + (this.newLinkButtonShown() ? '' : 'hidden')}>
                    <i
                        className={'icon fa fa-plus-circle ' + (this.newLinkActive() ? 'active' : '')}
                        onClick={this.toggleNewLink}
                    />
                </div>
                <h1 className={`header-text ${this.isLoggedIn() ? '' : 'alternate'}`}>
                    Pinda
                </h1>
                <div className={navClasses} onClick={this.toggleMenu}>
                    <div className='icon'></div>
                </div>
            </div>
        );
    }
}