import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//Bootstrap components
import Spinner from 'react-bootstrap/Spinner';

//App Components
import { NavBar } from '../navbar/navbar';

export function PrivateRoute({ component: Component, ...rest }) {
    const movies = useSelector(state => state.movies);

    //Collect items from local storage to verify auth
    const user = localStorage.getItem('user'),
        token = localStorage.getItem('token');

    if (!user || !token) {
        return <Redirect to="/login" />
    }

    if (!movies || movies.length === 0) return (
        <div className="d-flex justify-content-center pt-5">
            <Spinner animation="border" role="status" variant="light">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );

    return(
        <Route {...rest} render={ ({ location, ...routeProps }) => {
            return (
                    <React.Fragment>
                        <NavBar />
                        <Component {...routeProps} />
                    </React.Fragment>
                )
        }} />
    )
}