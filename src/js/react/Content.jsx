'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import SearchBar from './SearchBar.jsx';

export default class Content extends binder(React.Component) {
    static propTypes = {
        hidden: React.PropTypes.bool.isRequired,
        onSearch: React.PropTypes.func.isRequired
    };

    isHidden(): boolean {
        return this.props.hidden;
    }

    render() {
        return (
            <section className={`content ${this.isHidden() ? 'hidden' : ''}`}>
                <h1>
                    Content
                </h1>
                <SearchBar onSearch={this.props.onSearch}/>
            </section>
        );
    }
}