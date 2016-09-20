'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Application from './react/Application.jsx';
import ChromeStorage from './storage/chrome-storage';
import APIRepository from './api/api-repository';

ChromeStorage.getAccessToken().then(function (token) {
    let loggedIn = (typeof token !== 'undefined');
    if (loggedIn) {
        APIRepository.setAuthToken(token);
    }
    ReactDom.render(
        React.createElement(Application, {
            loggedIn: loggedIn
        }),
        document.querySelector('.popup')
    );
});