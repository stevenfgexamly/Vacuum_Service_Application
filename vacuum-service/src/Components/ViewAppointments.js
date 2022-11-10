import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Tooltip,OverlayTrigger,Modal, NavbarDropDown, Container, Card, ButtonGroup, Button, Table, Row, Col, Form } from 'react-bootstrap';
import CustomToast from './CustomToast';
import { Link } from 'react-router-dom';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookAppointment from './BookAppointment';
import dayjs from 'dayjs';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function ViewAppointments() {
    const [show, setShow] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [city, setCity] = useState("");
    const [searchData, setSearchData] = useState();
    const [pricing, setPricing] = useState("ch");
    const uid = localStorage.getItem('id');
    const [currdate, setCurrdate] = useState(new Date());
    const date = dayjs(currdate);
    const [showmodal, setShowmodal] = useState(false);
    const [showmodal2, setShowmodal2] = useState(false);



    useEffect(() => {
        getAppointments();
    });

    const getAppointments = () => {
        axios.get("http://localhost:8080/api/getAppointments")
            .then(response => response.data)
            .then((data) => {
                setAppointments(data);
            });
    }

    function daysDiff(d) {
        // let da = dayjs(d);
        // let diff = da.diff(date, 'hours');
        // if (diff < 0 && diff > -1.0)
        //     return "Today";
        // else return (Math.trunc(diff / 24) + 1) + " day(s)";
        // return (diff / 24);
        return dayjs(d).fromNow();
    }

    const deleteAppointment = (aid) => () => {
        axios.get("http://localhost:8080/api/deleteAppointment?aid=" + aid)
            .then(response => response.data)
            .then((data) => {
                toggleModal();
                setShowError(true);
                setTimeout(() => setShowError(false), 2500);
            });
    }

    const payAppointment = (aid) => () => {
        axios.get("http://localhost:8080/api/payAppointment?aid=" + aid)
            .then(response => response.data)
            .then((data) => {
                setShow(true);
                setTimeout(() => setShow(false), 2500);
            });
    }

    const toggleModal = () => {
        setShowmodal(c => !c);
    }

    const toggleModal2 = () => {
        setShowmodal2(c => !c);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Service pending completition.
        </Tooltip>
      );

    return (
        <>
            <Card className='bg-dark text-white' >
                <Card.Header>
                    <center>
                        <label style={{ fontSize: "1.5rem" }} >Booked Appointments</label>
                    </center>
                </Card.Header>
            </Card>
            <Container>
                <Row>
                    {
                        appointments == 0 ?
                            <Card className='bg-dark text-white m-2'>
                                <Card.Header>
                                    <Card.Title style={{ fontSize: "30px" }} >No Appointments</Card.Title>
                                </Card.Header>
                                <Card.Body className='bg-dark text-white' >
                                    <Card.Text style={{ fontSize: "20px" }}>
                                        Information Not Available
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            :
                            appointments.map(appointment =>
                                <Card key={appointment.aid} className='bg-dark text-white m-2'>
                                    <Card.Header>
                                        <center><Card.Title style={{ fontSize: "30px" }} >{appointment.scode}  -  {appointment.sname}</Card.Title></center>
                                    </Card.Header>

                                    <Card.Body className='bg-dark text-white' >
                                        <Card.Text style={{ fontSize: "20px" }}>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        Date : {appointment.date} , {daysDiff(appointment.date)}
                                                    </Row>
                                                    <Row>
                                                        Status : {appointment.completion == false ? "Pending" : "Completed"}
                                                    </Row>
                                                    <Row>
                                                        Service Tier : {appointment.tier}
                                                    </Row>
                                                    <hr />
                                                    <Row> Details <br />Model : {appointment.model}<br />Details: {appointment.details}</Row>
                                                </Col>
                                                <Col>
                                                    Base Price : ${appointment.bill.price}<br />
                                                    Tier Value : ${appointment.bill.tiervalue}<br />
                                                    Tax        : ${appointment.bill.aftertax}<br />
                                                    <hr />
                                                    Final Cost : ${appointment.bill.finalprice}<br />
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                {
                                                    appointment.completion == false ?
                                                        // <Col>
                                                        //     <Button disabled onClick={payAppointment(appointment.aid)} size="lg" variant="primary" style={{ marginRight: '1rem' }} className='float-left' type="button">Pay ${appointment.bill.finalprice}</Button>
                                                        // </Col>
                                                        <Col>
                                                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                                                            <Button size="lg" variant="secondary" style={{ marginRight: '1rem' }} className='float-left' type="button">Pay ${appointment.bill.finalprice}</Button>
                                                        </OverlayTrigger>
                                                        </Col>

                                                        :

                                                        appointment.status == "Paid"
                                                        ?
                                                        <Col>
                                                            <Button disabled size="lg" variant="primary" style={{ marginRight: '1rem' }} className='float-left' type="button">Paid</Button>
                                                        </Col>
                                                        :
                                                        <Col>
                                                            <Button onClick={payAppointment(appointment.aid)} size="lg" variant="success" style={{ marginRight: '1rem' }} className='float-left' type="button">Pay ${appointment.bill.finalprice}</Button>
                                                        </Col>
                                                        
                                                }
                                                <Col>
                                                    <Button onClick={toggleModal} size="lg" variant="danger" style={{ marginRight: '1rem' }} className='float-left' type="button">Cancel Booking</Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                    <Modal variant="dark" show={showmodal}>
                                        <Modal.Header>
                                            <Modal.Title>Confirm Appointment Cancelation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body><div className="alert alert-danger">Appointment will be canceled.</div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="default" onClick={toggleModal}>
                                                Cancel
                                            </Button>
                                            <Button variant="danger" onClick={deleteAppointment(appointment.aid)}>
                                                Delete
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Card>
                            )
                    }
                </Row>
            </Container>
            <div style={{ "display": showerror ? "block" : "none" }}>
                <CustomToast show={showerror} message={"Appointment Canceled"} type={"danger"}></CustomToast>
            </div>
            <div style={{ "display": show ? "block" : "none" }}>
                <CustomToast show={show} message={"Appointment successfully paid"} type={"success"}></CustomToast>
            </div>
        </>
    );
}

export default ViewAppointments;