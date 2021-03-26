import React from 'react';

export class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={ movieData.ImagePath } alt={ movieData.Title }/>
                </div>
                <div className="movie-title">{ movieData.Title }</div>
                <div className="movie-description">{ movieData.Description }</div>

                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}