import React from 'react';
import PropTypes from 'prop-types';

import './genre-view.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';

import { Link } from 'react-router-dom';

export function GenreView(props) {
    const { genreData, genreMovies } = props;

    return (
        <Card className="genre-view-card">
            <Card.Body>
                <Card.Title>{ genreData.Name }</Card.Title>

                <Card.Text className="text-muted">Description</Card.Text>
                <Card.Text>{ genreData.Description }</Card.Text>

                <hr />
                <Card.Text>Other Films in the { genreData.Name } Genre</Card.Text>
                <Row className="row-cols-2 row-cols-md-3 row-cols-xl-4 mb-3">
                    { genreMovies.map(movie => (
                        <Col className="my-2 px-2" key={ movie._id}>
                            <MovieCard 
                                movieData={ movie }
                            />
                        </Col>
                    ))}
                </Row>

                <Link to={"/"}>
                    <Button>Back</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

GenreView.propTypes = {
    genreData: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
};