import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export default function MainView() {
    const [ movies, setMovies ] = useState([]),
        [ selectedMovie, setSelectedMovie ] = useState(null),
        [ user, setUser ] = useState(null),
        [ isRegistered, setRegistration ] = useState(true);

    useEffect(() => {
        axios.get('https://the-moviebook.herokuapp.com/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    if (!isRegistered) {
        return <RegistrationView 
            onLogin={ user => setUser(user) }
            onRegister={ (status) => setRegistration(status) }
        />;
    }    

    if (!user) {
        return <LoginView 
            onLogin={ user => setUser(user) }
            onRegister={ (status) => setRegistration(status) }
        />;
    }

    //Render Movie View if movie is selected
    if (selectedMovie) {
        return (
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <MovieView
                        movieData={ selectedMovie }
                        onBackClick={ newSelectedMovie => setSelectedMovie(newSelectedMovie) }
                    />
                </Col>
            </Row>
        );
    }

    if (movies.length === 0) {
        return <div className="main-view" />
    }

    return(
        <div className="main-view">
            { movies.map(movie => <MovieCard key={ movie._id } movieData={ movie }
                onMovieClick={ movie => setSelectedMovie(movie) } />)}
        </div>
    );
}