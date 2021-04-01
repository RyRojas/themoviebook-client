import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState(''),
        [ password, setPassword ] = useState(''),
        [ email, setEmail ] = useState(''),
        [ birthday, setBirthday ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onLoggedIn(username);
    }

    return(
        <form>
            <label>
                Username:
                <input
                    type="text" 
                    value={ username } 
                    onChange={ e => setUsername(e.target.value) }
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={ password }
                    onChange={ e => setPassword(e.target.value) }
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={ email }
                    onChange={ e => setEmail(e.target.value) }
                />
            </label>
            <label>
                Birthday:
                <input
                    type="date"
                    value={ birthday }
                    onChange={ e => setBirthday(e.target.value) }
                />
            </label>
            <button type="submit" onClick={ handleSubmit }>Submit</button>
        </form>
    );
}

RegistrationView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.instanceOf(Date)
};