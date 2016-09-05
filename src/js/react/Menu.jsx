'use strict';
// @flow

import React from 'react';

type State = {
    active: boolean
};

export default class Menu extends React.Component {

    state: State;

    static getInitialState(): State {
        return {
            active: false
        };
    }

    isActive(): boolean {
        return this.state.active;
    }

    setActive(newState: boolean): void {
        if (typeof newState !== 'boolean') {
            newState = !this.isActive();
        }

        var state: State = this.state;
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