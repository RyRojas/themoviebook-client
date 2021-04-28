import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';
import SearchIcon from '../../assets/icons/search.svg';

export function VisibilityFilterInput(props) {
    const dispatch = useDispatch();

    return (<Form.Control className="search-bar mx-auto"
        onChange={ e => dispatch(setFilter(e.target.value))}
        value={props.visibilityFilter}
        placeholder="Search by title"
    />);
}

VisibilityFilterInput.propTypes = {
    visibilityFilter: PropTypes.string
};