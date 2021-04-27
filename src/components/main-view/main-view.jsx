import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//App Components
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBar } from '../navbar/navbar';
import { ProfileView } from '../profile-view/profile-view';
import { MoviesList } from '../movies-list/movies-list';


import { setMovies, setUser } from '../../actions/actions';

import './main-view.scss';

export default function MainView() {
    //Redux global state
    const movies = useSelector(state => state.movies),
        user = useSelector(state => state.user),
        visibilityFilter = useSelector(state => state.visibilityFilter),
        dispatch = useDispatch();

    //Local state
    const [ isRegistered, setRegistration ] = useState(true);

    const getMovies = token => {
        axios.get('https://the-moviebook.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            dispatch(setMovies(response.data));
        })
        .catch(err => console.error(err));
    }

    const getUser = (user, token) => {
        axios
            .get(`https://the-moviebook.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => dispatch(setUser(response.data)))
            .catch(err => console.error(err));
    }

    const onLogin = authData => {
        setUser(authData.user.Username);

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);

        getMovies(authData.token);
        getUser(authData.user.Username, authData.token);
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
    }

    //Retrive movies and user when user already logged in
    useEffect(() => {
        let accessToken = localStorage.getItem('token'),
            storedUser = localStorage.getItem('user');

        if (accessToken !== null && storedUser !== null) {
            setUser(storedUser);

            getMovies(accessToken);
            getUser(storedUser, accessToken);
        }
    }, []);

    if (!isRegistered) {
        return <RegistrationView 
            onLogin={ onLogin }
        />;
    }    

    if (!user) {
        return <LoginView 
            onLogin={ onLogin }
            onRegister={ (status) => setRegistration(status) }
        />;
    }

    if (!movies || movies.length === 0) return <div></div>;

    return(
        <Router>
            <div className="main-view">
                <NavBar
                    onLogout={ onLogout }
                    userData={ user }
                    visibilityFilter={ visibilityFilter }
                />

                <Route
                    exact
                    path="/"
                    render={ () => (
                            <MoviesList
                                movies={ movies }
                                visibilityFilter={ visibilityFilter }
                            />
                        )}
                />

                <Route
                    path="/movies/:movieID"
                    render={ ({ match }) => (
                        <Row className="movie-view justify-content-md-center">
                            <Col md={8}>
                                <MovieView movieData={ movies.find(movie => movie._id === match.params.movieID) } />
                            </Col>
                        </Row>
                    )}
                />

                <Route
                    path="/directors/:name"
                    render={ ({ match }) => {
                        const directorSearch = movie => movie.Director.Name === match.params.name;

                        return(
                            <Row className="director-view justify-content-md-center">
                                <Col md={8}>
                                    <DirectorView 
                                        directorData={movies.find(directorSearch).Director}
                                        directedMovies={movies.filter(directorSearch)}
                                    />
                                </Col>
                            </Row>
                        );
                    }}
                />

                <Route
                    path="/genres/:name"
                    render={ ({ match }) => {
                        const genreSearch = m => m.Genre.find(g => g.Name === match.params.name);

                        return (
                            <Row className="genre-view justify-content-md-center">
                                <Col md={8}>
                                    <GenreView 
                                        genreData={movies.find(genreSearch).Genre.find(g => g.Name === match.params.name)}
                                        genreMovies={movies.filter(genreSearch)}
                                    />
                                </Col>
                            </Row>
                        );
                    }}
                />

                <Route
                    path="/users/:username"
                    render={ ({ match }) => {
                        if (user.Username === match.params.username) {
                            return(
                                <Row className="profile-view justify-content-md-center">
                                    <Col md={10}>
                                        <ProfileView userData={ user } movies={ movies } />
                                    </Col>
                                </Row>
                            )}
                        
                        return <Redirect to="/" />
                    }}
                />
            </div>
        </Router>
    );
}