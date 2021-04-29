//Libraries & Packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

//React Components
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

//Actions
import { setUser } from '../../actions/actions';

//Styling
import './movie-view.scss';
import FavIconEmpty from '../../assets/icons/heart.svg';
import FavIconFilled from '../../assets/icons/filled-heart.svg';

export function MovieView({ movieData, isFaved }) {
    //Redux
    const dispatch = useDispatch();

    //React Router
    const history = useHistory();

    //Send favorite request to server
    const handleFav = () => {
        axios
            .post(`https://the-moviebook.herokuapp.com/users/${ localStorage.getItem('user') }/favs`, {
                MovieID: movieData._id
            }, {
                headers: { Authorization: `Bearer ${ localStorage.getItem('token') }`}
            })
            .then(response => dispatch(setUser(response.data))) //Will change once redux is implemented
            .catch(e => console.error(e));
    }

    //Deletes movie from user favorites list
    const handleUnfav = (movie) => {
        const token = localStorage.getItem('token');

        axios
            .delete(`https://the-moviebook.herokuapp.com/users/${ localStorage.getItem('user') }/favs/${movie}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => dispatch(setUser(response.data))) //Will change once redux is implemented
            .catch(error => console.error(error));
    }

    //Conditionally display button depending on whether film is on user favorites
    let button;

    if (isFaved) {
        button = <Button className="fav-button py-1 px-2" variant="dark" onClick={ () => handleUnfav(movieData._id) }>
                <Image roundedCircle src={ FavIconFilled } alt="Remove from your favorites" />
            </Button>
    } else {
        button = <Button className="fav-button py-1 px-2" variant="dark" onClick={ handleFav }>
                <Image roundedCircle src={ FavIconEmpty} alt="Add to your favorites" />
            </Button>
    }

    //Render component
    return (
        <Card className="movie-view-card">
            <Card.Img 
                className="movie-poster"
                variant="top"
                src={ `/${movieData.ImagePath}` }
                alt={ movieData.Title } 
            />
            <Card.Body>
                <div>{ movieData.Year }</div>
                <Row className="justify-content-between px-3">
                    <Card.Title>{ movieData.Title }</Card.Title>
                    {button}
                </Row>
                

                <Card.Text className="text-muted">Description</Card.Text>
                <Card.Text>{ movieData.Description }</Card.Text>

                <hr />
                <Row>
                    <Col sm={5}>
                        <Card.Text className="text-muted mb-2">Directed by</Card.Text>
                        <Link to={`/directors/${movieData.Director.Name}`}>
                            <Button variant="link" className="pl-0 mb-2">{ movieData.Director.Name }</Button>
                        </Link>
                    </Col>
                    <Col sm={5}>
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
                    </Col>
                </Row>
                <hr />

                <Button onClick={ () => history.goBack() }>Back</Button>
            
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