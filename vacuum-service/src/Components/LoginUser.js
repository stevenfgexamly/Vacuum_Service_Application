import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CustomToast from './CustomToast';
import axios from 'axios';
import ToastError from './ToastError';
import Signup from './Signup';
import { Link, useNavigate, useLocation } from 'react-router-dom'


const initialValues = {
    email: "", pass: ""
};

function LoginUser() {

    const [user, setUser] = useState(initialValues)
    const [show, setShow] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [changeForm, setChangeForm] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/services";

    const inputChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const resetForm = () => {
        setUser(initialValues);
        setShowError(false);
    };

    const loginUser = (event) => {
        event.preventDefault();



        axios.post("http://localhost:8080/api/auth/signin", user, { headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (response.data.status === "success") {
                    localStorage.setItem("jwt", response.data.token);
                    localStorage.setItem("role", response.data.roles);
                    localStorage.setItem("name", response.data.uname);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("isauth", true);
                    setUser(initialValues);
                    setShow(true);
                    setShowError(false);
                    setTimeout(() => setShow(false), 3000);
                    navigate("/services");
                }
                else if (response.data.status === "bad") {
                    setShowError(true);

                }
                else {
                    setShow(false);
                    setShowError(false);
                }
            })
    };

    const changeFormFun = () => {
        setChangeForm(!changeForm);
    };

    return (
        <><br></br><br></br>
            <div style={{ "display": show ? "block" : "none" }}>
                <CustomToast show={show} message={"Login Successful"} type={"success"}></CustomToast>
            </div>
            {/* <div style={{ "display": showerror ? "block" : "none" }}>
                <CustomToast show={show} message={"Login Successful"} type={"success"}></CustomToast>
            </div> */}
            <Row>
                <Col>
                    <div style={{ "display": changeForm ? "block" : "none" }}>
                        <Card className="bg-dark text-white">
                            <CardHeader><h2>Login</h2></CardHeader>
                            <Form onReset={resetForm} onSubmit={loginUser} id="addServiceForm">
                                <Card.Body>
                                    <Row>

                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label size="lg">Email</Form.Label>
                                            <Form.Control required name="email" type="email" placeholder="Email"
                                                value={user.email} onChange={inputChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required name="pass" type="password" placeholder="Password"
                                                value={user.pass} onChange={inputChange} />
                                        </Form.Group>
                                    </Row>
                                    <center>
                                        <div style={{ "display": showerror ? "block" : "none" }}>
                                            <h2 style={{ fontSize: 20 }} className='bg-red'>Wrong username or password</h2>
                                        </div>
                                    </center>
                                </Card.Body>
                                <Card.Footer>
                                    <center>
                                        <Button size="lg" variant="success" style={{ marginRight: '1rem' }} type="submit">Login</Button>
                                        <Button size="lg" variant="danger" style={{ marginLeft: '1rem' }} className='float-right' type="reset">Clear</Button>
                                    </center>
                                </Card.Footer>
                            </Form>
                        </Card>
                    </div>
                    <div style={{ "display": !changeForm ? "block" : "none" }}>
                        <Signup changeForm />
                    </div>
                    <br></br>
                </Col>
                <Col>
                    <Card className="bg-dark text-white">
                        <CardHeader><h1>Home</h1></CardHeader>
                        <Card.Body>
                            <h4 className='text-white'>
                                Browse through various service centers with customizable filters and book available dates to get your vacuum cleaner serviced.
                            </h4>
                            <br></br>
                        </Card.Body>
                        <Card.Footer>
                            <center>
                                <Button size="lg" variant="primary" style={{ marginRight: '1rem' }} onClick={changeFormFun}>Login / Signup</Button>
                            </center>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default LoginUser;


