import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Casablanca', Description: 'desc 1...', ImagePath: '...' },
                { _id: 2, Title: 'Tokyo Story', Description: 'desc 2...', ImagePath: '...' },
                { _id: 3, Title: 'In the Mood for Love', Description: 'desc 3...', ImagePath: '...' }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) {
            return <MovieView movieData={ selectedMovie } 
                onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>;
        }

        if (movies.length === 0) {
            return <div className="main-view">The list is empty!</div>;
        }

        return (
            <div className="main-view">
                { movies.map((movie) => <MovieCard key={ movie._id } movieData={ movie } 
                    onMovieClick={movie => { this.setSelectedMovie(movie) }} />)}
            </div>
        );
    }
}