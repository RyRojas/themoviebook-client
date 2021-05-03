//Libraries & Packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

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

export function MovieView({ match }) {
    //Subscribe to store and allow dispatches to store
    const movieData = useSelector(state => state.movies.find(movie => movie._id === match.params.movieID)),
        isFaved = useSelector(state => state.user.Favorites.includes(match.params.movieID)),
        dispatch = useDispatch();

    //History hook for back button functionality
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
        button = <Image src={ FavIconFilled } className="fav-button" onClick={ () => handleUnfav(movieData._id) } alt="Remove from your favorites" />
    } else {
        button = <Image src={ FavIconEmpty} className="fav-button" onClick={ handleFav } alt="Add to your favorites" />
    }

    //Render component
    return (
        <Row className="movie-view justify-content-md-center">
            <Col sm={12} md={8} className="mx-auto">
                <Card className="movie-view-card mx-auto">
                    <Card.Img 
                        className="movie-poster"
                        variant="top"
                        src={ `/banner-${movieData.ImagePath}` }
                        alt={ movieData.Title } 
                    />
                    <Card.Body>
                        <Row className="justify-content-between px-3 mb-2 align-items-center">
                            <div className="d-flex align-items-end">
                                <Card.Title as={ 'h4' }>{ movieData.Title }</Card.Title>
                                <Card.Title><small className="ml-2 mb-3">{`(${movieData.Year})`}</small></Card.Title>
                            </div>
                            {button}
                        </Row>
                        

                        <Card.Text className="text-muted mb-2">Description</Card.Text>
                        <Card.Text className="mb-4">{ movieData.Description }</Card.Text>

                        <hr />
                        <Row className="my-4">
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
                        <hr className="mb-4"/>

                        <Button onClick={ () => history.goBack() }>Back</Button>
                    
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

MovieView.propTypes = {
    match: PropTypes.object.isRequired
};