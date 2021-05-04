import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useLocation } from 'react-router-dom';

//React components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

//App components
import { VisibilityFilterInput } from '../visibility-filter-input/visibility-filter-input';
import { useSelector } from 'react-redux';

export function NavBar() {
    //Subscribe to store for user data
    const userData = useSelector(state => state.user);

    //Location hook used for displaying search bar
    const location = useLocation();

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/login', '_self');
    };

    return (
        <header>
            <Navbar expand="md" variant="dark" className="justify-content-between">
                <Navbar.Brand as={Link} to="/" className="fancy">theMovieBook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end text-right">
                    { /* Conditionally Render Search Bar */
                    (location.pathname === '/') && <VisibilityFilterInput />
                    }
                    <Nav>
                        <Nav.Link as={NavLink} to={`/users/${userData.Username}`}>Account</Nav.Link>
                        <Nav.Link onClick={ onLogout }>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}