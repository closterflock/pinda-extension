'use strict';
// @flow

import React from 'react';

export default class Menu extends React.Component {

    state: {
        active: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            active: false
        };

        const self: any = this;

        self.isActive = self.isActive.bind(self);
        self.setActive = self.setActive.bind(self);
    }

    isActive(): boolean {
        return this.state.active;
    }

    setActive(newState: boolean): void {
        if (typeof newState !== 'boolean') {
            newState = !this.isActive();
        }

        var state: Object = this.state;
        state.active = newState;
        this.setState(state);
    }

    render() {
        return (
            <div className={'menu' + (this.isActive() ? ' active' : '')}>
                <h1>Menu</h1>
                <ul className='nav'>
                    <li className='item'>Logout</li>
                </ul>
            </div>
        );
    }
}