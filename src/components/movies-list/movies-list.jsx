import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card';
import { VisibilityFilterInput } from '../visibility-filter-input/visibility-filter-input';

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