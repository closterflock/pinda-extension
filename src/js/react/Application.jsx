'use strict';
// @flow

var React = require('react');
var Header = require('./Header.jsx');

module.exports = React.createClass({
    onBackButton: function () {

    },
    onNavButton: function () {

    },
    render: function () {
        return (
            <div className="app">
                <Header onBackButton={this.onBackButton} onNavButton={this.onNavButton}/>

            </div>
        );
    }
});