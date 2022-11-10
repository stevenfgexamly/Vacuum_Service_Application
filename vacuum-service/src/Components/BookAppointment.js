import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import CustomToast from './CustomToast.js';
import dayjs from 'dayjs';
import AppointmentCalendar from './AppointmentCalendar';



const initialValues = {
    sid: "", scode: "", name: "", place: "", city: "", avail: false, price: "", review: [], bookings: []
};

const initialReview = {
    sid: "", review: "", date: ""
};

function BookAppointment() {

    const params = useParams();
    const [service, setService] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewpost, setReviewpost] = useState(initialReview);
    const [deletepost, setDeletepost] = useState("");
    const [showdelete, setShowdelete] = useState(false);
    const [bookeddates, setBookeddates] = useState([]);
    const [bookings, setBookings] = useState([]);

    const books = [];

    const marks = ['2022-10-24'];



    const role = localStorage.getItem('role');
    const uname = localStorage.getItem('name');


    const getService = () => {
        if (params.id) {
            axios.get("http://localhost:8080/api/service/getService?sid=" + params.id)
                .then(response => response.data)
                .then((data) => {
                    setService(data);
                    let rev = data.review.reverse();
                    setReviews(rev);
                });
        }
    }

    const getBookings = () => {
        if (params.id) {
            axios.get("http://localhost:8080/api/service/getServiceBookings?sid=" + params.id)
                .then(response => response.data)
                .then((data) => {
                    setBookings(data);
                    // addBookings();
                });
        }

    }

    useEffect(() => {
        getService();
        // setReviews(service.review);
        reviewpost.sid = params.id;
        reviewpost.date = new Date().toDateString();


    });

    const addBookings = () => {
        (service.bookings)?.map((b) => (marks.push(dayjs(b.date).format("YYYY-MM-DD"))));
        // marks?.find(x => console.log(x == dayjs(x).format("YYYY-MM-DD")));

    }

    const inputChange = (e) => {
        const { name, value } = e.target;

        setReviewpost({
            ...reviewpost,
            [name]: value,
        });
    };

    const submitReview = () => {
        if (reviewpost.review == "") {
            alert("Enter in review before posting");
        }
        else {
            axios.post("http://localhost:8080/api/review/postReview", reviewpost)
                .then(response => response.data)
                .then((data) => {
                });
            getService();
            setReviewpost(initialReview);
        }
    }

    const deleteReview = (rid) => () => {
        if (rid) {
            axios.get("http://localhost:8080/api/review/deleteReview?rid=" + rid)
                .then(response => response.data)
                .then((data) => {
                    getService();
                    setShowdelete(true);
                    setTimeout(() => setShowdelete(false), 2500);
                });
        }
    }
    // getBookings();

    const returnBookings = () => {
        getBookings();
        return bookings;
    }


    return (
        <Container>
            <br></br>
            <Row>
                <Col sm={3}>
                    <Card className="bg-dark" >
                        <Card.Title>
                            <br />
                            <center><h2 className="text-white">{service.scode} - {service.name}</h2></center>
                        </Card.Title>
                        <Card.Body className="bg-dark">
                            <center><h2 className="text-white">City : {service.city}</h2></center><br />
                            <center><h2 className="text-white">Place : {service.place}</h2></center><br />
                            <center><h2 className="text-white">Price : ${service.price}</h2></center>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={9}>
                    <Card className="bg-dark" >
                        <Card.Header>
                            <Card.Title>
                                <br />
                                <center><h2 className="text-white">Book Appointment</h2></center>
                                <br />
                                <AppointmentCalendar sid={params.id} bookings={returnBookings()} />
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Card className="bg-dark" >
                    <Card.Title>
                        <br />
                        <h3 className="text-white">Leave a review</h3>
                    </Card.Title>
                    <Card.Body className="bg-dark">
                        <Form>
                            <Form.Group>
                                <Form.Control placeholder='Add review' name="review" onChange={inputChange} value={reviewpost.review} as="textarea" rows={3} />
                            </Form.Group>
                            <br></br>
                            <Button onClick={submitReview} size="lg" variant="success" > Post Review </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <h1></h1>
                {
                    service.review == 0 ?

                        <Card className="bg-dark" >
                            <Card.Body className="bg-dark">
                                <h2 className="text-white">No Reviews </h2>
                            </Card.Body>
                        </Card>

                        :

                        reviews?.map(rev =>
                            <>
                                <Card className="bg-dark rounded" >
                                    <Card.Header>
                                        <Card.Title className="bg-dark text-white">

                                            <h2 style={{ marginLeft: '1rem' }} className="text-white">{rev.uname} </h2>
                                            <h5 style={{ marginLeft: '1rem' }} className="text-grey">{rev.date} </h5>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body className="bg-dark rounded">
                                        <h3 className="text-white" >{rev.review} </h3>
                                        <br></br>
                                        {
                                            role == "ROLE_ADMIN" || uname == rev.uname ?
                                                <Button onClick={deleteReview(rev.reviewid)} size="lg" variant="danger" > Delete Review </Button>
                                                :
                                                <></>
                                        }
                                    </Card.Body>
                                </Card>
                                <h1></h1>
                            </>
                        )
                }
            </Row>
            <div style={{ "display": showdelete ? "block" : "none" }}>
                <CustomToast show={showdelete} message={"Review Deleted"} type={"danger"}></CustomToast>
            </div>
        </Container>
    );
}

export default BookAppointment;