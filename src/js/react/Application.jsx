'use strict';
// @flow

var React = require('react');
var Header = require('./global/Header.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Header/>
                <h2>Application</h2>
            </div>
        );
    }
});