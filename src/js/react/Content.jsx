'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import SearchBar from './SearchBar.jsx';
import LinkList from './LinkList.jsx';
import {CONTENT_COMPONENT} from './component-constants';
import type {DisplayedComponent} from './component-constants';

export default class Content extends binder(React.Component) {
    static propTypes = {
        onSearch: React.PropTypes.func.isRequired,
        links: React.PropTypes.array.isRequired,
        onSaveLink: React.PropTypes.func.isRequired,
        onDeleteLink: React.PropTypes.func.isRequired,
        displayedComponent: React.PropTypes.string.isRequired,
    };

    getDisplayedComponent(): DisplayedComponent {
        return this.props.displayedComponent;
    }

    contentShowing(): boolean {
        return this.getDisplayedComponent() === CONTENT_COMPONENT;
    }

    menuShowing(): boolean {
        return this.props.menuActive;
    }

    render() {
        return (
            <div className={`content ${this.contentShowing() ? '' : 'hidden'}`}>
                <h1>
                    Search
                </h1>
                <SearchBar onSearch={this.props.onSearch}/>
                <LinkList
                    links={this.props.links}
                    onSave={this.props.onSaveLink}
                    onDelete={this.props.onDeleteLink}
                />
            </div>
        );
    }
}