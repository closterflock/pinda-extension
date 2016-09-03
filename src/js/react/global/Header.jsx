'use strict';
// @flow

var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            backStateActive: false,
            navActive: false
        }
    },
    backButtonShown: function () {
        return this.state.backButtonShown;
    },
    toggleBackButtonShown: function (newState: boolean) {
        if (typeof newState !== 'boolean') {
            newState = !this.backButtonShown();
        }

        this.setState({
            backStateActive: newState
        });
    },
    navIsActive: function () {
        return this.state.navActive;
    },
    toggleNav: function () {
        this.setState({
            navActive: !this.navIsActive()
        });
    },
    render: function () {
        return (
            <div className='header'>
                <h1 className={'back-button ' + (this.backButtonShown() ? 'active' : '')}>
                    &lt;
                </h1>
                <h1 className="header-text">
                    Header
                </h1>
                <div className={'nav-button ' + (this.navIsActive() ? 'active' : '')} onClick={this.toggleNav}>
                    <div className='icon'></div>
                </div>
            </div>
        );
    }
});