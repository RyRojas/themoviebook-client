import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Bootstrap components
import Spinner from 'react-bootstrap/Spinner';

//App Components
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBar } from '../navbar/navbar';
import { ProfileView } from '../profile-view/profile-view';
import { MoviesList } from '../movies-list/movies-list';

//Actions
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

    //Retrive movies and user when user already logged in
    useEffect(() => {
        let accessToken = localStorage.getItem('token'),
            storedUser = localStorage.getItem('user');

        if (accessToken !== null && storedUser !== null) {
            setUser(storedUser);

            getUser(storedUser, accessToken);
            getMovies(accessToken);
        }
    }, []);

    if (!isRegistered) {
        return <RegistrationView />;
    }    

    if (!localStorage.getItem('user') || !user) {
        return <LoginView
            onRegister={ (status) => setRegistration(status) }
        />;
    }

    if (!movies || movies.length === 0) return (
        <div className="d-flex justify-content-center pt-5">
            <Spinner animation="border" role="status" variant="light">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );

    return(
            <div className="main-view">

                <Route path="/login" render={() => <LoginView onRegister={ (status) => setRegistration(status) } />} />

                <NavBar
                    userData={ user }
                    visibilityFilter={ visibilityFilter }
                />

                <Route
                    exact
                    path="/"
                    component={ MoviesList }
                />

                <Route
                    path="/movies/:movieID"
                    component={ MovieView }
                />

                <Route
                    path="/directors/:name"
                    component={ DirectorView }
                />

                <Route
                    path="/genres/:name"
                    component={ GenreView }
                />

                <Route
                    path="/users/:username"
                    component={ ProfileView }
                />
            </div>
    );
}