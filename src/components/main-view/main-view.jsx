import React, { useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//App Components
import { PrivateRoute } from '../common/private-route';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { MoviesList } from '../movies-list/movies-list';

//Actions
import { setMovies, setUser } from '../../actions/actions';

import './main-view.scss';

export default function MainView() {
  //Redux global state
  const dispatch = useDispatch();

  //Retrieves array of movies from API
  const getMovies = (token) => {
    axios
      .get('https://the-moviebook.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(setMovies(response.data));
      })
      .catch((err) => handleError(err));
  };

  //Retrieves user object from API
  const getUser = (user, token) => {
    axios
      .get(`https://the-moviebook.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => dispatch(setUser(response.data)))
      .catch((err) => handleError(err));
  };

  //Handle errors from API requests
  const handleError = (error) => {
    console.error(error);

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  //Sets local storage for basic auth check
  const onLogin = (authData) => {
    setUser(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    getMovies(authData.token);
    getUser(authData.user.Username, authData.token);
  };

  //Retrive movies and user when user already logged in
  useEffect(() => {
    let accessToken = localStorage.getItem('token'),
      storedUser = localStorage.getItem('user');

    if (accessToken && storedUser) {
      getUser(storedUser, accessToken);
      getMovies(accessToken);
    }
  }, []);

  return (
    <div className="main-view">
      <Switch>
        <Route path="/login" render={() => <LoginView onLogin={onLogin} />} />
        <Route path="/register" component={RegistrationView} />
        <PrivateRoute exact path="/" component={MoviesList} />
        <PrivateRoute path="/movies/:movieID" component={MovieView} />
        <PrivateRoute path="/directors/:name" component={DirectorView} />
        <PrivateRoute path="/genres/:name" component={GenreView} />
        <PrivateRoute path="/users/:username" component={ProfileView} />
      </Switch>
    </div>
  );
}
