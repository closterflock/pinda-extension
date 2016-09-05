'use strict';
// @flow

import React from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';

export default class Application extends React.Component {
    contentComponent: Content;

    onBackButton(active: boolean): void {

    }

    onNavButton(active: boolean): void {
        console.log(this.contentComponent);
        this.contentComponent.setMenu(active);
    }

    contentMounted(content: Content): void {
        console.log(content);
        this.contentComponent = content;
        console.log(this.contentComponent);
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