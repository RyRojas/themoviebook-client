import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={ movieData.ImagePath } alt={ movieData.Title }/>
                </div>
                <div className="movie-release-year">{ movieData.Year }</div>
                <div className="movie-title">{ movieData.Title }</div>
                <div className="movie-description">{ movieData.Description }</div>

                <div className="movie-details">
                    <div className="movie-director">
                        <span className="label">Directed by </span>
                        <span className="value">{ movieData.Director.Name }</span>
                    </div>
                    <div className="movie-genre">
                        <span className="label">Genre</span>
                        <span>{ movieData.Genre.map( genre => <li key={genre.Name}>{ genre.Name }</li>) }</span>
                    </div>
                    
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.arrayOf(PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool,
        Year: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};