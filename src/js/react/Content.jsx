'use strict';
// @flow

import React from 'react';
import Menu from './Menu.jsx';

export default class Content extends React.Component {
    menuComponent: Menu;

    constructor(props: Object) {
        super(props);

        const self: any = this;

        self.menuMounted = self.menuMounted.bind(self);
        self.setMenu = self.setMenu.bind(self);
    }

    menuMounted(menu: Menu): void {
        this.menuComponent = menu;
    }

    setMenu(state: boolean): void {
        this.menuComponent.setActive(state);
    }

    render() {
        return (
            <section className='content'>
                <h1>
                    Content
                </h1>
                <Menu ref={this.menuMounted}/>
            </section>
        );
    }
}