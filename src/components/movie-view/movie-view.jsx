import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';
import axios from 'axios';

export function MovieView(props) {
    const { movieData } = props;

    const handleFav = () => {
        axios
            .post(`https://the-moviebook.herokuapp.com/users/${ localStorage.getItem('user') }/favs`, {
                MovieID: movieData._id
            }, {
                headers: { Authorization: `Bearer ${ localStorage.getItem('token') }`}
            })
            .then(response => document.location.reload(true)) //Will change once redux is implemented
            .catch(e => console.error(e));
    }

    return (
        <Card className="movie-view-card">
            <Card.Img 
                className="movie-poster"
                variant="top"
                src={ `../${movieData.ImagePath}` }
                alt={ movieData.Title } 
            />
            <Card.Body>
                <Row className="justify-content-between px-3">
                    <Card.Title>{ movieData.Title }</Card.Title>
                    <Button variant="link" onClick={ handleFav }>Fav</Button>
                </Row>
                

                <Card.Text className="text-muted">Description</Card.Text>
                <Card.Text>{ movieData.Description }</Card.Text>

                <hr />
                <Card.Text className="text-muted mb-2">Directed by</Card.Text>
                <Link to={`/directors/${movieData.Director.Name}`}>
                    <Button variant="link" className="pl-0 mb-2">{ movieData.Director.Name }</Button>
                </Link>

                <Card.Text className="text-muted mb-2">Genre</Card.Text>
                <ListGroup horizontal>
                    { movieData.Genre.map( genre => {
                        return(
                            <Link to={`/genres/${genre.Name}`} key={genre.Name}>
                                <Button className="pl-0" variant="link">
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
        _id: PropTypes.string.isRequired,
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