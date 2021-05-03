import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ children, ...rest }) {
    //Collect items from local storage to verify auth
    const user = localStorage.getItem('user'),
        token = localStorage.getItem('token');

    return(
        <Route {...rest} render={ ({ location }) => {
            return (user && token)
                ? children
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }} />
        }} />
    )
}