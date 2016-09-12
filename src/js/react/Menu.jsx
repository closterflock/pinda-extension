'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder'

export default class Menu extends binder(React.Component) {

    static propTypes = {
        active: React.PropTypes.bool.isRequired
    };

    isActive(): boolean {
        return this.props.active;
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