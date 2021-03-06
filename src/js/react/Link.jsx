'use strict';
// @flow

import React from 'react';
import binder from 'react-class-binder';

export default class Link extends binder(React.Component) {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    urlInput: HTMLInputElement;

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        onSave: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired
    };

    state: {
        editable: boolean
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            editable: false
        };
    }

    isEditable(): boolean {
        return this.state.editable;
    }

    getDisabledTag(): string {
        return (this.isEditable() ? '' : 'readonly');
    }

    clicked(): void {
        if (!this.isEditable()) {
            chrome.tabs.create({
                url: this.props.url
            });
        }
    }

    toggleEditable(): void {
        this.setState({
            editable: !this.isEditable()
        });
    }

    getData(): Object {
        return {
            title: this.titleInput.value,
            description: this.descriptionInput.value,
            url: this.urlInput.value
        }
    }

    save(e: Event): void {
        e.preventDefault();
        if (this.isEditable()) {
            this.props.onSave(this.props.id, this);
            this.toggleEditable();
        }
    }

    deleteLink(e: Event): void {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    }

    inputMounted(component: HTMLInputElement, name: string): void {
        let key = `${name}Input`;
        var self = this;
        self[key] = component;
    }

    renderInput(name: string, value: string, classes: ?string): React.Element<any> {
        return (
            <input
                name={name}
                className={classes}
                type='text'
                onClick={this.clicked}
                readOnly={this.getDisabledTag()}
                defaultValue={value}
                ref={(c) => { this.inputMounted(c, name); }}
            />
        );
    }

    render(): React.Element<any> {
        let editButtonClass = `fa fa-${this.isEditable() ? 'times active' : 'pencil'}`;
        return (
            <form className='link' onSubmit={this.save}>
                <div className='title-bar'>
                    <label htmlFor='title'>
                        {this.renderInput('title', this.props.title, 'title')}
                    </label>
                    <i className={editButtonClass} onClick={this.toggleEditable}/>
                    <i className="fa fa-trash" onClick={this.deleteLink} />
                </div>
                <label htmlFor='url'>
                    {this.renderInput('url', this.props.url, 'url')}
                </label>
                <label htmlFor='description'>
                    {this.renderInput('description', this.props.description, 'description')}
                </label>
                <button className={this.isEditable() ? '' : 'no-display'} onClick={this.save}>
                    Save
                </button>
            </form>
        );
    }
}