'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import Link from './Link.jsx';

export default class LinkList extends binder(React.Component) {
    static propTypes = {
        links: React.PropTypes.array.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired
    };

    render() {
        let links = this.props.links.map((link) => {
            return (
                <Link
                    key={link.id}
                    {...link}
                    onSave={this.props.onSave}
                    onDelete={this.props.onDelete}
                />
            );
        });

        return (
            <div className="link-list">
                {links}
            </div>
        );
    }
}