// import React, {useState, useEffect} from "react";
// import MovieDataService from '../services/movies'
// import {Link} from 'react-router-dom'
// import {Button} from 'react-bootstrap'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
// import Container from 'react-bootstrap/Container'
// import Card from 'react-bootstrap/Card'
// import Image from 'react-bootstrap/Image'
// import Media from 'react-bootstrap/Media'
// import moment from 'moment'
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Movie = (props) => {
//     const [movie, setMovie] = useState({
//         id: null,
//         title: "",
//         rated: "",
//         reviews: []
//     })

//     const getMovie = id => {
//         MovieDataService.get(id).then(
//             response => {
//                 setMovie(response.data)
//                 console.log(response.data)
//             }
//         ).catch(e=>{
//             console.log(e)
//         })
//     }

//     useEffect(() => {
//         getMovie(props.match.params.id)
//     }, [props.match.params.id])

//     return (
//         <div>
//             <Container>
//                 <Row>
//                     <Col>
//                         <Image src={movie.poster+"/100px250"} fluid/>
//                     </Col>
//                     <Col>
//                         <Card>
//                             <Card.Header as="h5">{movie.title}</Card.Header>
//                             <Card.Body>
//                                 <Card.Text>
//                                     {movie.plot}
//                                 </Card.Text>
//                                 {props.user && <Link to={"/movies/" + props.match.params.id + "/review"}>
//                                     Add Review
//                                 </Link>}
//                             </Card.Body>
//                         </Card>
//                         <br></br>
//                         <h2>Reviews</h2>
//                         <br></br>
//                         {movie.reviews.map((review, index) => {
//                             return (
//                                 <Media key={index}>
//                                     <Media.Body>
//                                         <h5>{review.name + "reviewed on "}{moment(review.date).format("Do MMMM YYYY")}</h5>
//                                         <p>
//                                             {review.review}
//                                         </p>
//                                         {props.user && props.user.id === review.user_id &&
//                                             <Row>
//                                                 <Col>
//                                                     <Link to = {{
//                                                         pathname:"/movies/" + props.match.params.id + "/review",
//                                                         state:{currentReview: review}
//                                                     }}>Edit</Link>
//                                                 </Col>
//                                                 <Col><Button variant="link">Delete</Button></Col>
//                                             </Row>
//                                         }
//                                     </Media.Body>
//                                 </Media>
//                             )
//                         })}
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default Movie;

import React, { useState, useEffect } from "react";
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const Movie = (props) => {
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    });

    const getMovie = (id) => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getMovie(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {props.user && (
                                    <Link to={"/movies/" + props.match.params.id + "/review"}>
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                        <br />
                        <h2>Reviews</h2>
                        <br />
                        {movie.reviews.map((review, index) => {
                            return (
                                <Card className="mb-3" key={index}>
                                    <Card.Body>
                                        <Card.Title>
                                            {review.name + " reviewed on "}{moment(review.date).format("Do MMMM YYYY")}
                                        </Card.Title>
                                        <Card.Text>
                                            {review.review}
                                        </Card.Text>
                                        {props.user && props.user.id === review.user_id && (
                                            <Row>
                                                <Col>
                                                    <Link
                                                        to={{
                                                            pathname: "/movies/" + props.match.params.id + "/review",
                                                            state: { currentReview: review }
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link">Delete</Button>
                                                </Col>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Movie;
