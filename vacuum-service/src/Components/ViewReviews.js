import React, { useEffect, useState } from 'react';
import { Modal,Card, Button, Form, Row, Col, Table } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CustomToast from './CustomToast';
import axios from 'axios';
import ToastError from './ToastError';
import { useParams, useNavigate } from "react-router-dom";

const initialValues = {
    sid: "", scode: "", name: "", place: "", city: "", avail: false, price: ""
};

const initialReview = {
    sid: "", review: "", date: ""
};

function ViewReviews() {

    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [reviewpost, setReviewpost] = useState(initialReview);
    const [service, setService] = useState(initialValues)
    const [show, setShow] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [showmodal, setShowmodal] = useState(false);


    const inputChange = (e) => {
        const { name, value } = e.target;

        setService({
            ...service,
            [name]: value,
        });
    };

    const booleanInputChange = (e) => {
        setEnabled(current => !current);
        setService({
            ...service,
            avail: enabled,
        });
        console.log(enabled);
    }

    const deleteService = () => {
        axios.get("http://localhost:8080/api/service/admin/deleteService?sid=" + service.sid)
            .then(response => {
                if (response.data != null) {
                    setService(initialValues);
                    toggleModal();
                    setShowError(true);
                    getServices();
                    setTimeout(() => setShowError(false), 2500);
                }
            });
    };
    const updateService = (event) => {
        event.preventDefault();


        axios.put("http://localhost:8080/api/service/admin/updateService", service)
            .then(response => {
                if (response.data === "success") {
                    setService(initialValues);
                    getServices();
                    setShow(true);
                    setTimeout(() => setShow(false), 2500);

                }
                else if (response.data === "exists") {
                    setShowError(true);
                    setTimeout(() => setShowError(false), 3000);
                }
                else {
                    setShow(false);
                    setShowError(false);
                }
            })
    };

    const toggleModal = () => {
        setShowmodal(c => !c);
    }

    useEffect(() => {
        getServices();
    }, []);

    const getServices = () => {
        axios.get("http://localhost:8080/api/service/getAllServices")
            .then(response => response.data)
            .then((data) => {
                setServices(data);
            });
    }

    const getService = () => {
        if (id) {
            axios.get("http://localhost:8080/api/service/getService?sid=" + id)
                .then(response => response.data)
                .then((data) => {
                    setService(data);
                    console.log(service);
                });
        }
    }
    return (
        <><br></br>
            <Row>
                <Col>
                <div>
                            {
                                services === 0 ?
                                    <tr><td>No users</td></tr>
                                    :
                                    reviews?.map(rev =>
                                        <>
                                            {/* <Card className="bg-dark rounded" >
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
                                            <h1></h1> */}
                                        </>
                                    )

                            }
                    </div>
                </Col>
                <Col>
                    <div style={{ "display": show ? "block" : "none" }}>
                        <CustomToast show={show} message={"Service Updated"} type={"success"}></CustomToast>
                    </div>
                    <div style={{ "display": showerror ? "block" : "none" }}>
                        <CustomToast show={showerror} message={"Service Deleted"} type={"danger"}></CustomToast>
                    </div>
                    <Card className="bg-dark text-white">
                        <CardHeader><h2>Update Service Center</h2></CardHeader>
                        <Form onSubmit={updateService} id="addServiceForm">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label>Service Center Code</Form.Label>
                                            <Form.Control required name="scode" type="text" placeholder="Code"
                                                value={service.scode} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label>Service Center Name</Form.Label>
                                            <Form.Control required name="name" type="text" placeholder="Name"
                                                value={service.name} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label>Place</Form.Label>
                                            <Form.Control required name="place" type="text" placeholder="Place"
                                                value={service.place} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control required name="city" type="text" placeholder="City"
                                                value={service.city} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col>
                                        <Form.Group>
                                            <Form.Label>Availability</Form.Label>
                                            <Form.Switch name="avail"
                                                onChange={booleanInputChange}
                                                style={{ fontSize: '2rem' }}></Form.Switch>
                                        </Form.Group>
                                    </Col> */}
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label>Pricing</Form.Label>
                                            <Form.Control required name="price" type="number" placeholder="Pricing"
                                                value={service.price} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>

                                </Row>

                            </Card.Body>
                            <Card.Footer>
                                <center>
                                    <Button size="lg" variant="success" style={{ marginLeft: '1rem' }} type="submit"> Update Service</Button>
                                    <Button  onClick={toggleModal} size="lg" variant="danger" style={{ marginLeft: '1rem' }} className='float-right' type="button">Delete</Button>
                                    <Button onClick={() => { setService(initialValues) }} size="lg" style={{ marginLeft: '1rem' }} className='float-right btn-primary' type="button">Cancel</Button>
                                </center>
                            </Card.Footer>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Modal variant="dark" show={showmodal}>
                <Modal.Header>
                    <Modal.Title>Confirm Service Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">Service will be deleted forever.</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={toggleModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteService}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewReviews;


