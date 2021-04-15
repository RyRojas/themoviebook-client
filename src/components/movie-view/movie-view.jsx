import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export function MovieView(props) {
    const { movieData } = props;

    return (
        <Card className="movie-view-card">
            <Card.Img 
                className="movie-poster"
                variant="top"
                src={ `../${movieData.ImagePath}` }
                alt={ movieData.Title } 
            />
            <Card.Body>
                <Card.Title>{ movieData.Title }</Card.Title>

                <Card.Text className="text-muted">Description</Card.Text>
                <Card.Text>{ movieData.Description }</Card.Text>

                <hr />
                <Card.Text className="text-muted">Directed by</Card.Text>
                <Link to={`/directors/${movieData.Director.Name}`}>
                    <Button variant="link" className="d-inline">{ movieData.Director.Name }</Button>
                </Link>

                <Card.Text className="text-muted">Genre</Card.Text>
                <ListGroup horizontal>
                    { movieData.Genre.map( genre => {
                        return(
                            <Link to={`/genres/${genre.Name}`} key={genre.Name}>
                                <Button variant="link">
                                    { genre.Name }
                                </Button>
                            </Link>  
                        )}
                    )}
                </ListGroup>
                <hr />

                <Link to={"/"}>
                    <Button>Back</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.arrayOf(PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool,
        Year: PropTypes.string.isRequired
    }).isRequired
};