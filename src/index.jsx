import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

import './index.scss';

class MovieBookApplication extends React.Component {
    render() {
        return (
            <div className="movie-book">
                <MainView />
            </div>
        );
    }
}

//Locates root
const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MovieBookApplication), container);