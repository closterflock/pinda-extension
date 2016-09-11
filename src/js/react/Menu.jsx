'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'

export default class Menu extends binder(React.Component) {

    state: {
        active: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            active: false,
        };
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
        let classes = `menu ${this.isActive() ? 'active' : ''}`;
        return (
            <div className={classes}>
                <h1>Menu</h1>
                <ul className='nav'>
                    <li className='item'>Logout</li>
                </ul>
            </div>
        );
    }
}