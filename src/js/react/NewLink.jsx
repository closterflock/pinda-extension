'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import {NEW_LINK_COMPONENT} from './component-constants';

export default class NewLink extends binder(React.Component) {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    urlInput: HTMLInputElement;
    
    submit(): void {
        console.log(this.titleInput.value);
        console.log(this.descriptionInput.value);
        console.log(this.urlInput.value);
    }

    inputRef(input: HTMLInputElement, name: string): void {
        let key = `${name}Input`;

        let self = this;
        self[key] = input;
    }

    isDisplayed(): boolean {
        return this.props.displayedComponent === NEW_LINK_COMPONENT;
    }

    render() {
        return (
            <form className={`new-link-form ${this.isDisplayed() ? '' : 'hidden'}`} onSubmit={this.submit}>
                <h2>
                    New Link
                </h2>
                <label>
                    Title
                    <input type="text" name="title" ref={(i) => this.inputRef(i, 'title')}/>
                </label>
                <label>
                    Description
                    <input type="text" name="description" ref={(i) => this.inputRef(i, 'description')}/>
                </label>
                <label>
                    URL
                    <input type="text" name="url" ref={(i) => this.inputRef(i, 'url')}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }
}