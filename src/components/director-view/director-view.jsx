//Libraries & Packages
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Styling
import './director-view.scss';

//React Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//App components
import { MovieCard } from '../movie-card/movie-card';

export function DirectorView({ match }) {
    //Search for movie by director name
    const directorSearch = movie => movie.Director.Name === match.params.name;

    //Pull data directly from store
    const directorData = useSelector(state => state.movies.find(directorSearch).Director),
        directedMovies = useSelector(state => state.movies.filter(directorSearch));

    //History hook for back button functionality
    const history = useHistory();

    return (
        <Row className="director-view justify-content-md-center">
            <Col md={8}>
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
            </Col>
        </Row>
    );
}

DirectorView.propTypes = {
    match: PropTypes.object.isRequired
};