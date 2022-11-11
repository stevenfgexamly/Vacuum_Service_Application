import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Form, Row, Col, Table } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CustomToast from './CustomToast.js';
import axios from 'axios';
import ToastError from './ToastError';
import { useParams, useNavigate } from "react-router-dom";

const initialValues = {
    email: "", name: "", newpass: "", oldpass: "",token:""
};

function AccountDetails() {

    const navigate = useNavigate();
    const [user, setUser] = useState(initialValues)
    const [show, setShow] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [errormessage, setErrormessage] = useState("");
    const [showmodal, setShowmodal] = useState(false);


    const logOut = () => {
        localStorage.clear();
        localStorage.setItem("isauth","false");
        navigate("/login");
    };

    const inputChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const updateEmail = () => {

        user.token = localStorage.getItem("jwt");
        axios.post("http://localhost:8080/api/auth/updateemail", user)
            .then(response => {
                if (response.data === "success") {
                    setUser(initialValues);
                    localStorage.setItem("email", user.email);
                    window.location.reload();
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);

                }
                else if (response.data === "exists") {
                    setShowError(true);
                    setErrormessage("Email already in use");
                    setTimeout(() => setShowError(false), 3000);
                }
                else {
                    setShow(false);
                    setShowError(false);
                }
            })

    }

    const updateName = () => {

        axios.post("http://localhost:8080/api/auth/updatename", user)
            .then(response => {
                if (response.data === "success") {
                    setUser(initialValues);
                    localStorage.setItem("name", user.name);
                    window.location.reload();
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);

                }
            })

    }

    const updatePass = () => {

        axios.post("http://localhost:8080/api/auth/updatepass", user)
            .then(response => {
                if (response.data === "success") {
                    setUser(initialValues);
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);

                }
                else if (response.data === "incorrect") {
                    setShowError(true);
                    setErrormessage("Incorrect Password");
                    setTimeout(() => setShowError(false), 3000);
                }
            })

    }

    const deleteAccount = () => {

        axios.post("http://localhost:8080/api/auth/deleteaccount", user)
            .then(response => {
                if (response.data === "success") {
                    setUser(initialValues);
                    logOut();
                    

                }
                else if (response.data === "incorrect") {
                    setShowError(true);
                    setErrormessage("Incorrect Password");
                    setTimeout(() => setShowError(false), 3000);
                }
            })

    }

    const toggleModal = () => {
        setShowmodal(c => !c);
    }


    return (
        <><br></br>
            <Row>
                <Col>
                    <div style={{ "display": show ? "block" : "none" }}>
                        <CustomToast show={show} message={"Account Updated"} type={"success"}></CustomToast>
                    </div>
                    <div style={{ "display": showerror ? "block" : "none" }}>
                        <CustomToast show={showerror} message={errormessage} type={"delete"}></CustomToast>
                    </div>
                    <Card className="bg-dark text-white">
                        <CardHeader><h2>Update Account Details</h2></CardHeader>
                        <Form id="addServiceForm">
                            <Card.Body>
                                <Form.Label>Email Address</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Control name="email" type="text" placeholder="New Email"
                                                value={user.email} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button onClick={updateEmail} size="lg" variant="primary" style={{ marginLeft: '1rem' }}> Update Email</Button>
                                    </Col>
                                </Row>
                                <Form.Label>Name</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Control name="name" type="text" placeholder="New Name"
                                                value={user.name} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button onClick={updateName} size="lg" variant="primary" style={{ marginLeft: '1rem' }}> Update Name</Button>
                                    </Col>
                                </Row>
                                <Form.Label>Password</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Control name="oldpass" type="password" placeholder="Old Password"
                                                value={user.oldpass} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Control name="newpass" type="password" placeholder="New Password"
                                                value={user.newpass} onChange={inputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button onClick={updatePass} size="lg" variant="primary" style={{ marginLeft: '1rem' }} > Update Password</Button>
                                    </Col>
                                </Row>

                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={toggleModal} size="lg" variant="danger" style={{ marginLeft: '1rem' }}>Delete Account</Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Modal variant="dark" show={showmodal}>
                <Modal.Header>
                    <Modal.Title>Confirm User Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">Are you sure you want to delete your account? (Account will be lost forever).</div>
                    <Form.Group className="mb-3">
                        <Form.Control name="oldpass" type="password" placeholder="Password"
                            value={user.oldpass} onChange={inputChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={toggleModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteAccount}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AccountDetails;


