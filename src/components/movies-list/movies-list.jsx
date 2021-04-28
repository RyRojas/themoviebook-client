import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card';

export function MoviesList(props) {
    const { movies, visibilityFilter } = props;

    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />

    return (
        <Container>
            <Row className="main-view justify-content-center">
                { filteredMovies.map(movie => (
                    <Col sm={9} md={5} lg={3} className="my-2 px-2" key={ movie._id}>
                        <MovieCard 
                            movieData={ movie }
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

MoviesList.propTypes = {
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
    ).isRequired,

    visibilityFilter: PropTypes.string.isRequired
};