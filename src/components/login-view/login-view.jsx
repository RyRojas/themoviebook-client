import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
    const [ username, setUsername ] = useState(''),
        [ password, setPassword ] = useState('');

    const { onRegister } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    return (
        <form>
            <label>
                Username:
                <input type="text" value={ username } onChange={ e => setUsername(e.target.value) } />
            </label>
            <label>
                Password:
                <input type="password" value={ password } onChange={ e => setPassword(e.target.value) } />
            </label>
            <button type="submit" onClick={ handleSubmit }>Submit</button>
            <button type="button" onClick={ onRegister(false) }>Register</button>
        </form>
    );
}

LoginView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    onLoggedIn: PropTypes.func,
    onRegister: PropTypes.func
};