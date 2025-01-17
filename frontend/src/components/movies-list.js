// import React, { useEffect, useState } from "react";
// import MovieDataService from "../services/movies"
// import {Link} from "react-router-dom"
// import Form from "react-bootstrap/Form"
// import {Button} from 'react-bootstrap'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
// import Container from 'react-bootstrap/Container'
// import Card from 'react-bootstrap/Card'

import React, { useEffect, useState } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"; // Ensure correct import
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"; // Ensure correct import
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if not already included

const MoviesList = props => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, []) //without second argument, useEffect is run on every render

    const retrieveMovies = () => {
        MovieDataService.getAll().then(response => {
            console.log(response.data)
            setMovies(response.data.movies)
        }).catch(e=>{
            console.log(e)
        })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings().then(response => {
            console.log(response.data)
            setRatings(["All Ratings"].concat(response.data))
        }).catch(e=>{
            console.log(e)
        })
    }

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle)
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating)
    }

    const find = (query, by) => {
        MovieDataService.find(query, by).then(
            response=>{
                console.log(response.data)
                setMovies(response.data.movies)
            }
        ).catch(e => {
            console.log(e)
        })
    }

    const findbyTitle = () => {
        find(searchTitle, "title")
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle} />
                            </Form.Group>
                            <Form.Group>
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={findbyTitle}>
                                    Search
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                
                <Row>
                    {movies.map((movie) => {
                        return (
                            <Col>
                                <Card style={{width:'18rem'}}>
                                    <Card.Img src={movie.poster+"/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            Rating:{movie.rated}
                                        </Card.Text>
                                        <Card.Text>
                                            {movie.plot}
                                        </Card.Text>
                                        <Link to={"/movies/"+movie._id}>View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default MoviesList