import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import Container from 'react-bootstrap/Container';

import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer({
    stateSanitizer: ({ user, movies, visibilityFilter }) => {
        //Remove hashed password from Redux Devtools
        user.Password ? user.Password = '' : user

        return {
            user,
            movies,
            visibilityFilter
        }
    }
}));

function MovieBookApplication() {
        return (
            <Provider store={ store }>
                <Router>
                    <Container fluid>
                        <MainView />
                    </Container>
                </Router>
            </Provider>
        );
}

//Locates root
const container = document.getElementsByClassName('app-container')[0];

//Renders in root
ReactDOM.render(React.createElement(MovieBookApplication), container);