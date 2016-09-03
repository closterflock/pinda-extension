'use strict';
// @flow

var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            active: false
        };
    },
    isActive: function () {
        return this.state.active;
    },
    setActive: function (newState: boolean) {
        if (typeof newState !== 'boolean') {
            newState = !this.isActive();
        }

        var state: Object = this.state;
        state.active = newState;
        this.setState(state);
    },
    render: function () {
        return (
            <div className={'menu' + (this.isActive() ? ' active' : '')}>
                <h1>Menu</h1>
                <ul className='nav'>
                    <li className='item'>Logout</li>
                </ul>
            </div>
        );
    }
});