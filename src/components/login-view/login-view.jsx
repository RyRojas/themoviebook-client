import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import '../registration-view/registration-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState(''),
        [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLogin(username);
    }

    return (
        <Row className="login-registration-view justify-content-center">
            <Card as={Col} className="login-registration-card justify-items-center pt-4 pb-3">
                <h2 className="mx-auto">Welcome in</h2>
                <p className="mx-auto text-muted">Log in to your account</p>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" onChange={ e => setUsername(e.target.value) } />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" onChange={ e => setPassword(e.target.value) } />
                    </Form.Group>
                    <Button className="ms-auto" variant="primary" type="submit" onClick={ handleSubmit }>Submit</Button>
                    <hr />
                    <Button className="w-100" variant="info" type="button" onClick={ () => props.onRegister(false) }>Register</Button>
                </Form>
            </Card>
        </Row>
    );
}

LoginView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func
};