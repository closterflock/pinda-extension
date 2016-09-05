'use strict';
// @flow

import React from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';

export default class Application extends React.Component {
    contentComponent: Content;

    constructor(props: Object) {
        super(props);

        const self: any = this;

        self.onBackButton = self.onBackButton.bind(self);
        self.onNavButton = self.onNavButton.bind(self);
        self.contentMounted = self.contentMounted.bind(self);
    }

    onBackButton(active: boolean): void {

    }

    onNavButton(active: boolean): void {
        this.contentComponent.setMenu(active);
    }

    contentMounted(content: Content): void {
        this.contentComponent = content;
    }

    render() {
        return (
            <div className='app'>
                <Header onBackButton={this.onBackButton} onNavButton={this.onNavButton}/>
                <Content ref={this.contentMounted}/>
            </div>
        );
    }
}