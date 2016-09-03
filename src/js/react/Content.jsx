'use strict';
// @flow

var React = require('react');
var Menu = require('./Menu.jsx');

module.exports = React.createClass({
    menuMounted: function (menu) {
        this.menuComponent = menu;
    },
    setMenu: function (state: boolean) {
        this.menuComponent.setActive(state);
    },
    render: function () {
        return (
            <section className='content'>
                <h1>
                    Content
                </h1>
                <Menu ref={this.menuMounted}/>
            </section>
        );
    }
});