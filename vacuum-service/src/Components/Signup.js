import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CustomToast from './CustomToast';
import axios from 'axios';
import ToastError from './ToastError';
import {Link,useNavigate, useLocation} from 'react-router-dom'
import { useFormik } from 'formik'


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

    const validate = values => {
        const errors = {};
         if (values.name.length > 20) {
          errors.name = 'Must be 20 characters or less';
        }
    
         if (values.email.length > 20) {
          errors.email = 'Must be 20 characters or less';
        }

        if (values.pass.length > 20) {
            errors.pass = 'Must be within 20 characters or less';
          }
     
     
        return errors;
     
      };

    const formik = useFormik({
        initialValues: {
          email: '',
          name: '',
          pass: '',
          admin:false,
          masterpass:''
        },
        validate,
        onSubmit:values => {
            axios.post("http://localhost:8080/api/auth/signup",JSON.stringify(values), { headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (response.data === "success") {
                    formik.resetForm();
                    setShow(true);
                    setShowError(false);
                    setExists(false);
                    setTimeout(() => window.location.reload(), 500);
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
          },
   
      });

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
                <Form onReset={resetForm} onSubmit={formik.handleSubmit}>
                    <Card.Body>
                        <Row>
                            <Form.Group className="mb-3 lg" >
                                <Form.Label >Email</Form.Label>
                                <Form.Control required name="email" type="text" placeholder="Email"
                                    value={formik.values.email} onChange={formik.handleChange} />
                                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                <div style={{ "display": exists ? "block" : "none", fontSize: 1 }}>
                                    <h4>Email already exists</h4>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label size="lg">Name</Form.Label>
                                <Form.Control required name="name" type="text" placeholder="Name"
                                    value={formik.values.name} onChange={formik.handleChange} />
                                    {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control required name="pass" type="password" placeholder="Password"
                                    value={formik.values.pass} onChange={formik.handleChange} />
                                    {formik.errors.pass ? <div>{formik.errors.pass}</div> : null}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Check inline label="Admin" name="group1" type={'checkbox'} onChange={tickChange} size="lg" />
                                {/* <Form.Label>Master Password</Form.Label> */}
                                <div style={{ "display": showbox ? "block" : "none" }}>
                                <Form.Control name="masterpass" type="password" placeholder="Master Password"
                                    value={formik.values.masterpass} onChange={formik.handleChange} />
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
                        <Button size="lg" variant="danger" style={{ marginLeft: '1rem' }} className='float-right' onClick={e => formik.resetForm()}>Clear</Button>
                    </center>
                </Card.Footer>
            </Form>
        </Card>
        </>
    );
}

export default Signup;


