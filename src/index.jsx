import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import './index.scss';

function MovieBookApplication() {
        return (
            <Container>
                <MainView />
            </Container>
        );
}

//Locates root
const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MovieBookApplication), container);