'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';
import {NEW_LINK_COMPONENT} from './component-constants';

export default class NewLink extends binder(React.Component) {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    urlInput: HTMLInputElement;

    static propTypes = {
        displayedComponent: React.PropTypes.string.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    };
    
    submit(e: Event): void {
        e.preventDefault();
        console.log(this.titleInput.value);
        console.log(this.descriptionInput.value);
        console.log(this.urlInput.value);
        this.props.onSubmit(
            this.titleInput.value,
            this.descriptionInput.value,
            this.urlInput.value
        );
    }

    clearInputs(): void {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.urlInput.value = '';
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
                <h1>
                    New Link
                </h1>
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