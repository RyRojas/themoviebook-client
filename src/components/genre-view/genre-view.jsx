//Libraries & Packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Bootstrap Components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Styling
import './genre-view.scss';

//App Components
import { MovieCard } from '../movie-card/movie-card';

export function GenreView({ match }) {
    //Search for movie by genre name
    const genreSearch = movie => movie.Genre.find(genre => genre.Name === match.params.name);

    //Pull data directly from store
    const genreData = useSelector(state => state.movies.find(genreSearch).Genre.find( g => g.Name === match.params.name)),
        genreMovies = useSelector(state => state.movies.filter(genreSearch));
    
    //History hook for back button functionality
    const history = useHistory();

    return (
        <Row className="genre-view justify-content-md-center">
            <Col md={8}>
                <Card className="genre-view-card mx-auto">
                    <Card.Body>
                        <Card.Title>{ genreData.Name }</Card.Title>

                        <Card.Text className="text-muted mb-2">Description</Card.Text>
                        <Card.Text className="mb-4">{ genreData.Description }</Card.Text>

                        <hr className="mb-4" />
                        <Card.Text>Other Films in the { genreData.Name } Genre</Card.Text>
                        <Row className="row-cols-2 row-cols-md-3 mb-3">
                            { genreMovies.map(movie => (
                                <Col className="my-2 px-2" key={ movie._id}>
                                    <MovieCard 
                                        movieData={ movie }
                                    />
                                </Col>
                            ))}
                        </Row>

                        <Button onClick={ () => history.goBack() }>Back</Button>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

GenreView.propTypes = {
    match: PropTypes.object.isRequired
};