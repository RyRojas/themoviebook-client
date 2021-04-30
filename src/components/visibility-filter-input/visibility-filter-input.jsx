import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';
import SearchIcon from '../../assets/icons/search.svg';

export function VisibilityFilterInput({ visibilityFilter }) {
    const dispatch = useDispatch();

    return (
        <div className="search-bar mx-auto w-50 d-flex pl-2">
            <span className="align-self-center">
                <img src={SearchIcon} aria-hidden="true" className="search-bar__icon" />
            </span>
            <Form.Control
                className="search-bar__input shadow-none"
                onChange={ e => dispatch(setFilter(e.target.value))}
                value={ visibilityFilter }
                placeholder="Search by title"
            />
        </div>
    );
}

VisibilityFilterInput.propTypes = {
    visibilityFilter: PropTypes.string
};