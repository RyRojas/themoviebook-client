//Libraries & Packages
import React from 'react';
import { useSelector } from 'react-redux';

//Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//App Components
import { MovieCard } from '../movie-card/movie-card';

export function MoviesList() {
    //Subscribe to store
    const movies = useSelector(state => state.movies),
        visibilityFilter = useSelector(state => state.visibilityFilter);

    //Set array of filtered movies
    let filteredMovies = movies;

    //Filter array if searchbar contains string
    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    return (
        <Container>
            <Row className="main-view justify-content-center">
                { filteredMovies.map(movie => (
                    <Col xs={10} sm={6} md={4} lg={3} className="my-2 px-2" key={ movie._id}>
                        <MovieCard 
                            movieData={ movie }
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}