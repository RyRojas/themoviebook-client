import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function MovieCard(props) {
    const { movieData, onMovieClick } = props;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ movieData.ImagePath } />
            <Card.Body>
                <Card.Title>{ movieData.Title }</Card.Title>
                <Card.Text>{ movieData.Description }</Card.Text>
                <Button onClick={ () => onMovieClick(movieData) } variant="link">See Details</Button>
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
