'use strict';
// @flow

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
            <div className={'hamburger-wrapper ' + (this.state.active ? 'active' : '')} onClick={this.toggleNav}>
                <div className='hamburger'></div>
            </div>
        );
    }
});