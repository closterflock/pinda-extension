'use strict';
// @flow

import React from 'react';
import Menu from './Menu.jsx';

export default class Content extends React.Component {
    menuComponent: Menu;

    state: {
        hidden: boolean
    };

    constructor(props: Object) {
        super(props);

        const self: any = this;

        this.state = {
            hidden: true
        };

        self.menuMounted = self.menuMounted.bind(self);
        self.setMenu = self.setMenu.bind(self);
        self.isHidden = self.isHidden.bind(self);
        self.show = self.show.bind(self);
        self.hide = self.hide.bind(self);
    }

    isHidden(): boolean {
        return this.state.hidden;
    }

    show(): void {
        let state: Object = this.state;
        state.hidden = false;
        this.setState(state);
    }

    hide(): void {
        let state: Object = this.state;
        state.hidden = true;
        this.setState(state);
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