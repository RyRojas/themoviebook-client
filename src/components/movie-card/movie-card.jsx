import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export function MovieCard(props) {
    const { movieData } = props;

    return (
        <Card className="movie-card">
            <Card.Img variant="top" src={ `/${movieData.ImagePath}` } alt={ movieData.Title } />
            <Card.Body>
                <Card.Title>{ movieData.Title }</Card.Title>
                <Card.Text className="text-truncate">{ movieData.Description }</Card.Text>
                <hr />
                <Link to={`/movies/${movieData._id}`}>
                    <Button variant="link">See Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

MovieCard.propTypes = {
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
