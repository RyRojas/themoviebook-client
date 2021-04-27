import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import Container from 'react-bootstrap/Container';

import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

function MovieBookApplication() {
        return (
            <Provider store={ store }>
                <Container fluid>
                    <MainView />
                </Container>
            </Provider>
        );
}

//Locates root
const container = document.getElementsByClassName('app-container')[0];

//Renders in root
ReactDOM.render(React.createElement(MovieBookApplication), container);