'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';

export default class Link extends binder(React.Component) {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        description: React.PropTypes.string
    };

    render() {
        let description: any = '';
        if (this.props.description !== '') {
            description = <p>{this.props.description}</p>;
        }
        return (
            <div className="link">
                <a href={this.props.url}>
                    <h3>{this.props.title}</h3>
                </a>
                <i className="fa fa-pencil"/>
                {description}
            </div>
        );
    }
}