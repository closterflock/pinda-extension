'use strict';
// @flow

import React from 'react';
import Menu from './Menu.jsx';
import binder from 'react-class-binder'

export default class Content extends binder(React.Component) {
    menuComponent: Menu;

    static propTypes = {
        onLogout: React.PropTypes.func.isRequired
    };

    state: {
        menuActive: boolean;
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            menuActive: false
        };
    }

    isHidden(): boolean {
        return this.props.hidden;
    }

    menuMounted(menu: Menu): void {
        this.menuComponent = menu;
    }

    setMenu(state: boolean): void {
        this.setState({
            menuActive: state
        });
    }

    logoutClicked(): void {
        this.setState({
            menuActive: false
        });
        this.props.onLogout();
    }

    render() {
        return (
            <section className={`content ${this.isHidden() ? 'hidden' : ''}`}>
                <h1>
                    Content
                </h1>
                <Menu
                    ref={this.menuMounted}
                    active={this.state.menuActive}
                    onLogout={this.logoutClicked}
                />
            </section>
        );
    }
}