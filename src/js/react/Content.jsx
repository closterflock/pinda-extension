'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import SearchBar from './SearchBar.jsx';
import LinkList from './LinkList.jsx';
import Menu from './Menu.jsx';
import NewLink from './NewLink.jsx';
import {CONTENT_COMPONENT} from './component-constants';
import type {DisplayedComponent} from './component-constants';

export default class Content extends binder(React.Component) {
    static propTypes = {
        onSearch: React.PropTypes.func.isRequired,
        links: React.PropTypes.array.isRequired,
        onSaveLink: React.PropTypes.func.isRequired,
        onDeleteLink: React.PropTypes.func.isRequired,
        onLogout: React.PropTypes.func.isRequired,
        displayedComponent: React.PropTypes.string.isRequired,
        menuActive: React.PropTypes.bool.isRequired
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
            <section className={`content ${this.contentShowing() ? '' : 'hidden'}`}>
                <h1>
                    Content
                </h1>
                <SearchBar onSearch={this.props.onSearch}/>
                <LinkList
                    links={this.props.links}
                    onSave={this.props.onSaveLink}
                    onDelete={this.props.onDeleteLink}
                />
                <Menu
                    active={this.menuShowing()}
                    onLogout={this.props.onLogout}
                />
                <NewLink
                    displayedComponent={this.props.displayedComponent}
                />
            </section>
        );
    }
}