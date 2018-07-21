'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Application from './react/Application.jsx';
import ChromeStorage from './storage/chrome-storage';
import APIRepository from './api/api-repository';
import DataStore from './storage/data-store';
import type {TokenAndTimestamp} from './storage/chrome-storage';

function renderApp(loggedIn: boolean): void {
    ReactDom.render(
        React.createElement(Application, {
            loggedIn: loggedIn
        }),
        document.querySelector('.popup')
    );
}

ChromeStorage.getAccessToken().then(function (token: string) {
    let loggedIn = (typeof token !== 'undefined');
    if (loggedIn) {
        APIRepository.setAuthToken(token);

        console.log('syncing data up');

        DataStore.triggerSync()
            .then(function (data) {
                console.log('synced data', data);
                renderApp(loggedIn);
            });
        return;
    }

    renderApp(loggedIn);
});