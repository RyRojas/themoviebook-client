//Libraries
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

//React components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Styling
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState(''),
        [ password, setPassword ] = useState(''),
        [ email, setEmail ] = useState(''),
        [ birthday, setBirthday ] = useState('');
    
    const form = useRef(null);
    
    const validateInput = () => {
        return form.current.reportValidity();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationStatus = validateInput();
        
        if (validationStatus) {
            axios.post('https://the-moviebook.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                console.log(response.data);
                window.open('/', '_self');
            })
            .catch(e => {
                console.error('Error registering new user');
                console.error(e);
            })
        } 
    }

    return(
        <Row className="login-registration-view justify-content-center">
            <Card as={Col} className="login-registration-card justify-items-center pt-4 pb-3">
                <h2 className="mx-auto">Great to meet you!</h2>
                <p className="mx-auto text-muted">Create an account</p>
                <Form ref={form}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            onChange={ e => setUsername(e.target.value) }
                            autoComplete="username"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@email.com"
                            onChange={ e => setEmail(e.target.value) }
                            autoComplete="email"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={ e => setPassword(e.target.value) }
                            autoComplete="false"
                            minLength={8} //Turns out this maxes out at 15, the error properly displays values above 15 but it won't trigger the error
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            onChange={ e => setBirthday(e.target.value) }
                            autoComplete="bday"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={ handleSubmit } className="mb-2 w-100">Submit</Button>
                </Form>
            </Card>
        </Row>
    );
}

RegistrationView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.instanceOf(Date),
    onLogin: PropTypes.func
};