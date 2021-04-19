//Libraries & Packages
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

//React components
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

//Styling
import './profile-view.scss';

export function ProfileView(props) {
    const { userData, movies } = props,
        [ username, setUsername ] = useState(''),
        [ password, setPassword ] = useState(''),
        [ confirm, setConfirm] = useState(''),
        [ email, setEmail ] = useState(''),
        [ birthday, setBirthday ] = useState(''),
        [ isVisible, setVisibility ] = useState(false),
        [userFavs, setUserFavs] = useState(userData.Favorites);

    const favData = movies.filter(m => userFavs.includes(m._id));

    //Ref hook for form validation
    const form = useRef(null);

    //Handlers for modal interaction
    const handleOpen = () => setVisibility(true),
        handleClose = () => setVisibility(false);

    //Deletes movie from user favorites list
    const handleUnfav = (movie) => {
        const token = localStorage.getItem('token');

        axios
            .delete(`https://the-moviebook.herokuapp.com/users/${userData.Username}/favs/${movie}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => setUserFavs(userFavs.filter(m => (m !== movie)))) //Will change once redux is implemented
            .catch(error => console.error(error));
    }
    
    //Handles updating user information
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e);

        const token = localStorage.getItem('token'),
            formData = {};
        
        const validationStatus = form.current.reportValidity();

        //Confirm validity prior to running
        if (validationStatus) {
            //Build req body
            if (username) {
                formData.Username = username;
                localStorage.setItem('user', username);
            }
            if (password) formData.Password = password;
            if (email) formData.Email = email;
            if (birthday) formData.Birth = birthday;

            //Send to server for authentication
            axios.put(`https://the-moviebook.herokuapp.com/users/${userData.Username}`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {                
                window.open(`/users/${ localStorage.getItem('user') }`, '_self');
                alert('Profile successfully updated.')
            })
            .catch(e => {
                console.log('Something went wrong');
                console.error(e);
            });
        }
    };

    const handleDelete = () => {
        axios
            .delete(`https://the-moviebook.herokuapp.com/users/${ userData.Username }`, {
                headers: {Authorization: `Bearer ${ localStorage.getItem('token') }`}
            })
            .then(response => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.open('/', '_self');
            })
            .catch(error => console.error(error));
    }

    return (
        <Card className="profile-view-card">
            <Row>
                <Col xs={8}>
                    <Form ref={form}>
                        <h2>Personal Info</h2>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                autoComplete="username"
                                defaultValue={ userData.Username }
                                onChange={ e => setUsername(e.target.value) } 
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="example@email.com"
                                autoComplete="email"
                                defaultValue={ userData.Email }
                                onChange={ e => setEmail(e.target.value) }
                            />
                        </Form.Group>

                        <Form.Group controlId="formBirthday">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                autoComplete="bday"
                                defaultValue={ (userData.Birth) ? userData.Birth.substr(0, 10) : '' } //Only set default value if bday present
                                onChange={ e => setBirthday(e.target.value) }
                            />
                        </Form.Group>

                        <h2>Password</h2>
                        <Form.Group controlId="formCurrentPassword" as={Col} xs={6} className="pl-0 pr-1">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Current Password"
                                autoComplete="current-password"
                                defaultValue={''}
                                //onChange={ e => setPassword(e.target.value) }
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="New Password"
                                    autoComplete="new-password"
                                    defaultValue={''}
                                    onChange={ e => setPassword(e.target.value) }
                                    minLength={8}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="New Password"
                                    autoComplete="new-password"
                                    defaultValue={''}
                                    onChange={ e => {
                                        setConfirm(e.target.value);
                                        (e.target.value !== password) ? e.target.setCustomValidity('Password must match') : e.target.setCustomValidity('');
                                    }}
                                    minLength={8}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Button className="ms-auto" variant="primary" type="submit" onClick={ handleSubmit }>Submit</Button>
                    </Form>
                </Col>
                

                <Card as={Col} xs={4} className="favs-card">
                    <Card.Body>
                        <Card.Title>Favs</Card.Title>
                        <hr />
                        { favData.map(movie => (
                            <React.Fragment key={ movie._id }>
                                <Row>
                                    <Col xs={10}>
                                        <Card.Text>{ movie.Title }</Card.Text>
                                        <Card.Text className="text-truncate">{ movie.Description }</Card.Text>
                                    </Col>
                                    <Button variant="link" as={Col} xs={2} onClick={ () => handleUnfav(movie._id) }>
                                        X
                                    </Button>
                                </Row>
                                <hr />
                            </React.Fragment>
                        ))}
                    </Card.Body>
                </Card>
                
                <Row className="w-100 justify-content-end">
                    <Button variant="link" onClick={ handleOpen }>Delete my account</Button>
                </Row>
            </Row>

            <Modal show={ isVisible } onHide={ handleClose }>

                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Once deleted, your account cannot be recovered.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={ handleDelete }>Delete it!</Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

ProfileView.propTypes = {
    userData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birth: PropTypes.date,
        Genre: PropTypes.arrayOf(PropTypes.string),
    }).isRequired
};