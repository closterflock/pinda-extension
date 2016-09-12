'use strict';
// @flow

import React from 'react';
import Menu from './Menu.jsx';
import binder from 'react-class-binder'

export default class Content extends binder(React.Component) {
    menuComponent: Menu;

    constructor(props: Object) {
        super(props);
    }

    isHidden(): boolean {
        return this.props.hidden;
    }

    menuMounted(menu: Menu): void {
        this.menuComponent = menu;
    }

    setMenu(state: boolean): void {
        this.menuComponent.setActive(state);
    }

    render() {
        return (
            <section className={`content ${this.isHidden() ? 'hidden' : ''}`}>
                <h1>
                    Content
                </h1>
                <Menu ref={this.menuMounted}/>
            </section>
        );
    }
}