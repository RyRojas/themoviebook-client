import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;

        return (
            <Card className="movie-view-card">
                <Card.Img className="movie-poster" variant="top" src={ movieData.ImagePath } alt={ movieData.Title } />
                <Card.Body>
                    <Card.Title>{ movieData.Title }</Card.Title>

                    <Card.Text className="text-muted">Description</Card.Text>
                    <Card.Text>{ movieData.Description }</Card.Text>

                    <hr />
                    <Card.Text className="text-muted">Directed by</Card.Text>
                    <Card.Text>{ movieData.Director.Name }</Card.Text>

                    <Card.Text className="text-muted">Genre</Card.Text>
                    <ListGroup horizontal>
                        { movieData.Genre.map( genre => <ListGroup.Item variant="dark" key={genre.Name}>{ genre.Name }</ListGroup.Item>) }
                    </ListGroup>
                    <hr />

                    <Button onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
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
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};