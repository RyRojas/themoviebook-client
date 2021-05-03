import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './director-view.scss';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';

export function DirectorView({ directorData, directedMovies }) {
    const history = useHistory();

    return (
        <Card className="director-view-card mx-auto">
            <Card.Body>
                <Card.Title>{ directorData.Name }</Card.Title>

                <Card.Text className="text-muted">Biography</Card.Text>
                <Card.Text className="mb-4">{ directorData.Bio }</Card.Text>

                <hr />
                <Row className="my-4">
                    <Col sm={4}>
                        <Card.Text className="text-muted">Born</Card.Text>
                        <Card.Text>{ new Date(directorData.Birth).toLocaleDateString() }</Card.Text>
                    </Col>
                    
                    <Col sm={4}>
                        <Card.Text className="text-muted">Died</Card.Text>
                        <Card.Text>{ (directorData.Death) ? new Date(directorData.Death).toLocaleDateString() : '-' }</Card.Text>
                    </Col>
                </Row>
                <hr className="mb-4" />

                <Card.Text>Films Directed by { directorData.Name }</Card.Text>
                    <Row className="row-cols-2 row-cols-md-3 mb-3">
                        { directedMovies.map(movie => (
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
    );
}

DirectorView.propTypes = {
    directorData: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }).isRequired,
        
    directedMovies: PropTypes.arrayOf(
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
    ).isRequired
};