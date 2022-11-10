import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CustomToast from './CustomToast.js';
import axios from 'axios';
import ToastError from './ToastError';


const initialValues = {
    scode: "", name: "", place: "", city: "", avail: false, price: ""
};

function AddService() {

    const [service, setService] = useState(initialValues)
    const [show, setShow] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [enabled, setEnabled] = useState(true);

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

    const resetForm = () => {
        setService(initialValues);
    };

    const createService = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8080/api/service/admin/saveService", service)
            .then(response => {
                if (response.data === "success") {
                    setService(initialValues);
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);
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

    return (
        <><br></br>
            <div style={{ "display": show ? "block" : "none" }}>
                <CustomToast show={show} message={"Service created"} type={"success"}></CustomToast>
            </div>
            <div style={{ "display": showerror ? "block" : "none" }}>
                <ToastError children={{ show: showerror, message: "Service with same code Already exists" }}></ToastError>
            </div>
            <Card className="bg-dark text-white">
                <CardHeader><h2>Add Service Center</h2></CardHeader>
                <Form onReset={resetForm} onSubmit={createService} id="addServiceForm">
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
                            <Button size="lg" variant="success" style={{ marginRight: '1rem' }} type="submit"> Create Service</Button>
                            <Button size="lg" variant="danger" style={{ marginLeft: '1rem' }} className='float-right' type="reset">Clear Details</Button>
                        </center>
                    </Card.Footer>
                </Form>
            </Card>
        </>
    );
}

export default AddService;


