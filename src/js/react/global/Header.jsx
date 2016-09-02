'use strict';
// @flow

var React = require('react');
var NavButton = require('./NavButton.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="header">
                {/*TODO add buttons*/}
                <h1>
                    Header
                </h1>
                <NavButton/>
            </div>
        );
    }
});