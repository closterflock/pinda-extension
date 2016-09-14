'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import Link from './Link.jsx';

export default class LinkList extends binder(React.Component) {
    static propTypes = {
        links: React.PropTypes.array.isRequired
    };

    constructor(props: Object) {
        super(props);
    }

    onSaveChild(id: string, child: Link) {
        console.log('saving id ' + id);
        console.log(child.getData());
    }

    render() {
        let links = this.props.links.map((link, index) => {
            return (
                <Link key={index} {...link} onSave={this.onSaveChild}/>
            );
        });

        return (
            <div className="link-list">
                {links}
            </div>
        );
    }
}