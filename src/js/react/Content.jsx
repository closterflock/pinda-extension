'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import SearchBar from './SearchBar.jsx';
import LinkList from './LinkList.jsx';
import Menu from './Menu.jsx';

export default class Content extends binder(React.Component) {
    static propTypes = {
        hidden: React.PropTypes.bool.isRequired,
        onSearch: React.PropTypes.func.isRequired,
        links: React.PropTypes.array.isRequired,
        onSaveLink: React.PropTypes.func.isRequired,
        onDeleteLink: React.PropTypes.func.isRequired,
        onLogout: React.PropTypes.func.isRequired,
        menuActive: React.PropTypes.bool.isRequired
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
                <LinkList
                    links={this.props.links}
                    onSave={this.props.onSaveLink}
                    onDelete={this.props.onDeleteLink}
                />
                <Menu
                    active={this.props.menuActive}
                    onLogout={this.props.onLogout}
                />
            </section>
        );
    }
}