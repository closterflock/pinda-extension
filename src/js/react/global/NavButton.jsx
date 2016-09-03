'use strict';
// @flow

var str: Number = 'stuff';

var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            active: false
        }
    },
    navIsActive: function () {
        return this.state.active;
    },
    toggleNav: function () {
        this.setState({
            active: !this.navIsActive()
        });
    },
    render: function () {
        return (
            <div className={'nav-button ' + (this.state.active ? 'active' : '')} onClick={this.toggleNav}>
                <div className='icon'></div>
            </div>
        );
    }
});