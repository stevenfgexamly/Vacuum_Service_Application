import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CustomToast from './CustomToast';
import axios from 'axios';
import ToastError from './ToastError';
import {Link,useNavigate, useLocation} from 'react-router-dom'



const initialValues = {
    email: "", name: "",pass: "",admin: false ,masterpass: ""
};

function Signup() {

    const [user, setUser] = useState(initialValues)
    const [show, setShow] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [exists, setExists] = useState(false);
    const [master, setMaster] = useState(false);
    const [showbox, setShowbox] = useState(false);

    const navigate = useNavigate();

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
        setExists(false);
        setMaster(false);
    };

    const tickChange = () =>{
            setShowbox(s => !s);
            user.admin = true;
            // setUser(...user);
            console.log(setUser);
    };

    const createUser = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8080/api/auth/signup",JSON.stringify(user), { headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (response.data === "success") {
                    setUser(initialValues);
                    setShow(true);
                    setShowError(false);
                    setExists(false);
                    setTimeout(() => setShow(false), 2000);
                    navigate("/login");
                }
                else if (response.data === "exists") {
                    setExists(true);
                    setMaster(false);

                }
                else if (response.data === "adminfail") {
                    setMaster(true);
                    setExists(false);

                }
                else {
                    setShow(false);
                    setExists(false);
                    setMaster(false);
                }
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
              })
        // alert(JSON.stringify(user));
    };

    return (
        <>
            <div style={{ "display": show ? "block" : "none" }}>
                <CustomToast show={show} message={"Account created"} type={"success"}></CustomToast>
            </div>
            {/* <div style={{ "display": showerror ? "block" : "none" }}>
                <CustomToast show={show} message={"Login Successful"} type={"success"}></CustomToast>
            </div> */}
            <Card className="bg-dark text-white">
                <CardHeader><h2>Create Account</h2></CardHeader>
                <Form onReset={resetForm} onSubmit={createUser}>
                    <Card.Body>
                        <Row>
                            <Form.Group className="mb-3 lg" >
                                <Form.Label >Email</Form.Label>
                                <Form.Control required name="email" type="text" placeholder="Email"
                                    value={user.email} onChange={inputChange} />
                                <div style={{ "display": exists ? "block" : "none", fontSize: 1 }}>
                                    <h2>Email already exists</h2>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label size="lg">Name</Form.Label>
                                <Form.Control required name="name" type="text" placeholder="Name"
                                    value={user.name} onChange={inputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control required name="pass" type="password" placeholder="Password"
                                    value={user.pass} onChange={inputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Check inline label="Admin" name="group1" type={'checkbox'} onChange={tickChange} size="lg" />
                                {/* <Form.Label>Master Password</Form.Label> */}
                                <div style={{ "display": showbox ? "block" : "none" }}>
                                <Form.Control name="masterpass" type="password" placeholder="Master Password"
                                    value={user.masterpass} onChange={inputChange} />
                                <div style={{ "display": master ? "block" : "none", fontSize: 1 }}>
                                    <h2>Master password is incorrect</h2>
                                </div>
                            </div>
                        </Form.Group>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <center>
                        <Button size="lg" variant="success" style={{ marginRight: '1rem' }} type="submit">Create</Button>
                        <Button size="lg" variant="danger" style={{ marginLeft: '1rem' }} className='float-right' type="reset">Clear</Button>
                    </center>
                </Card.Footer>
            </Form>
        </Card>
        </>
    );
}

export default Signup;


