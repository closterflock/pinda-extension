'use strict';
// @flow

var React = require('react');

module.exports = React.createClass({
    propTypes: {
        onBackButton: React.PropTypes.func.isRequired,
        onNavButton: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            backButtonShown: false,
            navActive: false
        }
    },
    getCurrentState: function () {
        return this.state;
    },
    backButtonShown: function () {
        return this.state.backButtonShown;
    },
    toggleBackButtonShown: function (newState: boolean) {
        if (typeof newState !== 'boolean') {
            newState = !this.backButtonShown();
        }
        var state: Object = this.getCurrentState();

        this.props.onBackButton(newState);
        state.backStateActive = newState;
        this.setState(state);
    },
    navIsActive: function () {
        return this.state.navActive;
    },
    toggleNav: function (newState: boolean) {
        if (typeof newState !== 'boolean') {
            newState = !this.navIsActive();
        }
        var state: Object = this.getCurrentState();

        this.props.onNavButton(newState);
        state.navActive = newState;
        this.setState(state);
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