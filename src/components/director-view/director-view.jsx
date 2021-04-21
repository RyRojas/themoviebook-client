import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './director-view.scss';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';

export function DirectorView(props) {
    const { directorData, directedMovies } = props;

    return (
        <Card className="director-view-card">
            <Card.Body>
                <Card.Title>{ directorData.Name }</Card.Title>

                <Card.Text className="text-muted">Biography</Card.Text>
                <Card.Text>{ directorData.Bio }</Card.Text>

                <hr />
                <Card.Text className="text-muted">Born</Card.Text>
                <Card.Text>{ new Date(directorData.Birth).toLocaleDateString() }</Card.Text>

                <Card.Text className="text-muted">Died</Card.Text>
                <Card.Text>{ (directorData.Death) ? new Date(directorData.Death).toLocaleDateString() : '-' }</Card.Text>
                <hr />

                <Card.Text>Films Directed by { directorData.Name }</Card.Text>
                    <Row className="row-cols-2 row-cols-md-3 row-cols-xl-4 mb-3">
                        { directedMovies.map(movie => (
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

DirectorView.propTypes = {
    directorData: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }).isRequired
};