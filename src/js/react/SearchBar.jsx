'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';

export default class SearchBar extends binder(React.Component) {
    searchInput: React.Element<any>;

    static propTypes = {
        onSearch: React.PropTypes.func.isRequired
    };

    bindSearchInput(input: React.Element<any>): void {
        this.searchInput = input;
    }

    onTermChange(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            let term = e.target.value;

            if (term.length > 1) {
                this.props.onSearch(term);
            }
        }
    }

    render() {
        return (
            <div className="search-bar">
                <input type="text" ref={this.bindSearchInput} onChange={this.onTermChange}/>
            </div>
        );
    }
}