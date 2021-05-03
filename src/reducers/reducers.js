import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

const visibilityFilter = (state = '', action) => {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

const movies = (state = [], action) => {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

const user = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
});

export default moviesApp;