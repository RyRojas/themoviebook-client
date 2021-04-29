import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

//React Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import '../registration-view/registration-view.scss';

export function LoginView({ onLogin, onRegister }) {
    const [ username, setUsername ] = useState(''),
        [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //Send to server for authentication
        axios.post('https://the-moviebook.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            onLogin(response.data);
        })
        .catch(e => {
            alert('Incorrect username or password');
        });
    };

    return (
        <Row className="login-registration-view justify-content-center">
            <Card as={Col} className="login-registration-card justify-items-center pt-4 pb-3">
                <h2 className="mx-auto">Welcome in</h2>
                <p className="mx-auto text-muted">Log in to your account</p>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={ e => setUsername(e.target.value) }
                            autoComplete="username"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={ e => setPassword(e.target.value) }
                            autoComplete="password"
                        />
                    </Form.Group>
                    <Button className="ms-auto" variant="primary" type="submit" onClick={ handleSubmit }>Submit</Button>
                    <hr />
                    <Button className="w-100" variant="info" type="button" onClick={ () => onRegister(false) }>Register</Button>
                </Form>
            </Card>
        </Row>
    );
}

LoginView.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};