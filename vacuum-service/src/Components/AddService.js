import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CustomToast from './CustomToast.js';
import axios from 'axios';
import ToastError from './ToastError';
import { useFormik } from 'formik'

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

    const validate = values => {
        const errors = {};
         if (values.scode.length != 4) {
          errors.scode = 'Must be 4 numbered code';
        }
    
         if (values.price.length >= 4) {
          errors.price = 'Price too high';
        }

     
     
        return errors;
     
      };

    const formik = useFormik({
        initialValues: {
          scode: '', name: '', place: '', city: '', avail: false, price: ''
        },
        validate,
        onSubmit:values => {

            axios.post("http://localhost:8080/api/service/admin/saveService", values)
            .then(response => {
                if (response.data === "success") {
                    formik.resetForm();
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
            
          },
   
      });

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
                <Form  onSubmit={formik.handleSubmit} id="addServiceForm">
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Service Center Code</Form.Label>
                                    <Form.Control required name="scode" type="text" placeholder="Code"
                                        value={formik.values.scode} onChange={formik.handleChange} />
                                        {formik.errors.scode ? <div>{formik.errors.scode}</div> : null}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Service Center Name</Form.Label>
                                    <Form.Control required name="name" type="text" placeholder="Name"
                                        value={formik.values.name} onChange={formik.handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Place</Form.Label>
                                    <Form.Control required name="place" type="text" placeholder="Place"
                                        value={formik.values.place} onChange={formik.handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control required name="city" type="text" placeholder="City"
                                        value={formik.values.city} onChange={formik.handleChange} />
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
                                    <Form.Control required name="price" type="number" placeholder="$"
                                        value={formik.values.price} onChange={formik.handleChange} />
                                        {formik.errors.price ? <div>{formik.errors.price}</div> : null}
                                </Form.Group>
                            </Col>
                            <Col></Col>

                        </Row>

                    </Card.Body>
                    <Card.Footer>
                        <center>
                            <Button size="lg" variant="success" style={{ marginRight: '1rem' }} type="submit"> Create Service</Button>
                            <Button size="lg" variant="danger" style={{ marginLeft: '1rem' }} className='float-right' onClick={e => formik.resetForm()} type="reset">Clear Details</Button>
                        </center>
                    </Card.Footer>
                </Form>
            </Card>
        </>
    );
}

export default AddService;


