import React from 'react';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

export function VisibilityFilterInput(props) {
    const dispatch = useDispatch();

    return (<Form.Control className="search-bar"
        onChange={ e => dispatch(setFilter(e.target.value))}
        value={props.visibilityFilter}
        placeholder="Search by title"
    />);
}