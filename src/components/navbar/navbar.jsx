import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import { VisibilityFilterInput } from '../visibility-filter-input/visibility-filter-input';

export function NavBar(props) {
    const { onLogout, userData, visibilityFilter } = props;

    return (
        <Navbar variant="dark">
            <Navbar.Brand as={Link} to="/" className="fancy">theMovieBook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <VisibilityFilterInput />
                <Nav>
                    <Nav.Link as={NavLink} to={`/users/${userData.Username}`}>Account</Nav.Link>
                    <Nav.Link onClick={ () => onLogout() }>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}