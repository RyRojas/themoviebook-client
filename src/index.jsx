import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class MovieBookApplication extends React.Component {
    render() {
        return (
            <div className="movie-book">
                <div>Good morning</div>
            </div>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MovieBookApplication), container);