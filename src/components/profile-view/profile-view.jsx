//Libraries & Packages
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//React components
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

//Actions
import { setUser } from '../../actions/actions';

//Styling
import './profile-view.scss';
import TrashIcon from '../../assets/icons/trash.svg'
import { Container } from 'react-bootstrap';

export function ProfileView(props) {
    //Redux
    const { userData, movies } = props,
        dispatch = useDispatch();

    //Local state
    const [ username, setUsername ] = useState(''),
        [ password, setPassword ] = useState(''),
        [ confirm, setConfirm] = useState(''),
        [ email, setEmail ] = useState(''),
        [ birthday, setBirthday ] = useState(''),
        [ isVisible, setVisibility ] = useState(false),
        [ isReadOnly, setReadOnly] = useState(true);

    //Favorited movies
    const favData = movies.filter(m => userData.Favorites.includes(m._id));

    //Ref hook for form validation
    const form = useRef(null);

    //Handlers for modal interaction
    const handleOpen = () => setVisibility(true),
        handleClose = () => setVisibility(false);

    //Resets state
    const handleStateReset = () => {
        setUsername('');
        setPassword('');
        setConfirm('');
        setEmail('');
        setBirthday('');
    }

    //Deletes movie from user favorites list
    const handleUnfav = (movie) => {
        const token = localStorage.getItem('token');

        axios
            .delete(`https://the-moviebook.herokuapp.com/users/${userData.Username}/favs/${movie}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => dispatch(setUser(response.data))) //Will change once redux is implemented
            .catch(error => console.error(error));
    }
    
    //Handles updating user information
    const handleSubmit = (e) => {
        e.preventDefault();

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
            .then((response) => {
                if (response.data !== 'No fields to update') dispatch(setUser(response.data));
                handleStateReset();
                setReadOnly(!isReadOnly);
            })
            .catch(e => {
                console.log('Something went wrong');
                console.error(e);
            });
        }
    };

    //Handles user account deletion
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
        <Row className="profile-view justify-content-center">
                <Card className="profile-view-card mx-auto">
                    <Container>
                        <Row className="profile-view-card__row justify-content-center justify-content-lg-between m-xs-2 m-lg-5">
                            <Col xs={10} md={8} className="">
                                <Form ref={form} className="profile-view-card__form px-3 pb-5 pt-4 pt-lg-0 px-md-0">
                                    <h2>Personal Info</h2>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            autoComplete="username"
                                            readOnly={ isReadOnly }
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
                                            readOnly={ isReadOnly }
                                            defaultValue={ userData.Email }
                                            onChange={ e => setEmail(e.target.value) }
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBirthday" className="mb-4">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            autoComplete="bday"
                                            readOnly={ isReadOnly }
                                            defaultValue={ (userData.Birth) ? userData.Birth.substr(0, 10) : '' } //Only set default value if bday present
                                            onChange={ e => setBirthday(e.target.value) }
                                        />
                                    </Form.Group>

                                    <h2>Password</h2>
                                    <Form.Row>
                                        <Form.Group as={Col} xs={12} lg={6}controlId="formNewPassword">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="New Password"
                                                autoComplete="new-password"
                                                readOnly={ isReadOnly }
                                                defaultValue={''}
                                                onChange={ e => setPassword(e.target.value) }
                                                minLength={8}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} xs={12} lg={6}controlId="formConfirmPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="New Password"
                                                autoComplete="new-password"
                                                readOnly={ isReadOnly }
                                                defaultValue={''}
                                                onChange={ e => {
                                                    setConfirm(e.target.value);
                                                    (e.target.value !== password) ? e.target.setCustomValidity('Password must match') : e.target.setCustomValidity('');
                                                }}
                                                minLength={8}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Button
                                        variant={isReadOnly ? 'primary' : 'danger'}
                                        type="button"
                                        onClick={ () => setReadOnly( !isReadOnly )}
                                    >
                                        {( isReadOnly ) ? 'Edit Profile' : 'Cancel' }
                                    </Button>
                                    <Button 
                                        hidden={ isReadOnly }
                                        variant="primary"
                                        className="ml-3"
                                        type="submit" onClick={ handleSubmit }
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                            

                            <Card as={Col} xs={10} md={8} lg={4} className="favs-card mb-4">
                                <Card.Body>
                                    <Card.Title>Favorites</Card.Title>
                                    <hr />
                                    { favData.map(movie => (
                                        <React.Fragment key={ movie._id }>
                                            <Row>
                                                <Col xs={10}>
                                                    <Link to={`/movies/${movie._id}`} className="favs-card__item">
                                                        <Card.Text>{ movie.Title }</Card.Text>
                                                        <Card.Text className="text-truncate">{ movie.Description }</Card.Text>
                                                    </Link>
                                                </Col>
                                                <Button variant="link" as={Col} xs={2} onClick={ () => handleUnfav(movie._id) }>
                                                    <img src={ TrashIcon } alt="Delete movie from your favorites"/>
                                                </Button>
                                            </Row>
                                            <hr />
                                        </React.Fragment>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Row>
                        
                        <Row className="w-100 justify-content-end">
                            <Button variant="link" onClick={ handleOpen }>Delete my account</Button>
                        </Row>
                    </Container>
                    
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
        </Row>
    );
}

ProfileView.propTypes = {
    userData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birth: PropTypes.date,
        Favorites: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,

    movies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Genre: PropTypes.arrayOf(PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Description: PropTypes.string.isRequired
            })).isRequired,
            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Bio: PropTypes.string.isRequired,
                Birth: PropTypes.string.isRequired,
                Death: PropTypes.string
            }).isRequired,
            ImagePath: PropTypes.string.isRequired,
            Featured: PropTypes.bool,
            Year: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};