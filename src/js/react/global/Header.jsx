'use strict';
// @flow

var React = require('react');
var NavButton = require('./NavButton.jsx');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            backStateActive: false
        }
    },
    backStateIsActive: function () {
        return this.state.backStateActive;
    },
    toggleState: function (newState: boolean) {
        if (typeof newState !== 'boolean') {
            newState = !this.backStateIsActive();
        }

        this.setState({
            backStateActive: newState
        });
    },
    render: function () {
        return (
            <div className='header'>
                <h1 className={'back-button ' + (this.backStateIsActive() ? 'active' : '')}>
                    &lt;
                </h1>
                <h1 className="header-text">
                    Header
                </h1>
                <NavButton/>
            </div>
        );
    }
});