'use strict';
// @flow

var React = require('react');
var Header = require('./Header.jsx');
var Content = require('./Content.jsx');

module.exports = React.createClass({
    onBackButton: function (active: boolean) {

    },
    onNavButton: function (active: boolean) {
        console.log(this.contentComponent);
        this.contentComponent.setMenu(active);
    },
    contentMounted: function (content) {
        console.log(content);
        this.contentComponent = content;
        console.log(this.contentComponent);
    },
    render: function () {
        return (
            <div className='app'>
                <Header onBackButton={this.onBackButton} onNavButton={this.onNavButton}/>
                <Content ref={this.contentMounted}/>
            </div>
        );
    }
});