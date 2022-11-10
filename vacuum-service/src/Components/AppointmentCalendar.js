import Calendar from 'react-calendar';
import React, { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import CustomToast from './CustomToast.js';

const initialValues = {
    uid: localStorage.getItem("id"), sid: "", date: "", model: "", details: "", tier: "1",
};

function AppointmentCalendar({ sid,bookings }) {

    const [dateState, setDateState] = useState("");
    const [appointment, setAppointment] = useState(initialValues);
    // const [bookings, setBookings] = useState([]);
    const [show, setShow] = useState(false);
    const [ds, setDs] = useState([]);

    const servid = sid;

    const saveServiceBooking = () => {

        const d = dayjs(dateState).format("YYYY-MM-DD").toString();

        const jobj = {
            sid: servid,
            date: d
        }

        axios.post("http://localhost:8080/api/service/booked/postbooking", jobj)
            .then(response => {
                if (response.data === "success") {
                }
            })
    }

    const saveAppointment = () => {

        const appoi = {
            sid: servid,
            date: appointment.date,
            model : appointment.model,
            details : appointment.details,
            tier : appointment.tier

        }

        axios.post("http://localhost:8080/api/saveappoint", appoi)
            .then(response => {
                if (response.data === "success") {
                    setAppointment(initialValues);
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);


                }
            })


    }

    const saveBooking = () => {

        if (dateState == "" | appointment.model == "" | appointment.details == "") {
            alert("Enter all details");
        }
        else {
            appointment.date = dayjs(dateState).format("YYYY-MM-DD").toString();
            // alert(appointment.tier);
            saveServiceBooking();
            saveAppointment();
            setDateState("")
        }

    }


    useEffect(() => {
        // getBookings();
    }, []);

    const changeDate = (e) => {
        setDateState(e);
        console.log(dayjs(dateState).format('YYYY-MM-DD'));
    }

    const inputChange = (e) => {
        const { name, value } = e.target;

        setAppointment({
            ...appointment,
            [name]: value,
        });
    };


    const [currdate, setCurrdate] = useState(new Date());

    return (
        <>
            <div style={{ "display": show ? "block" : "none" }}>
                <CustomToast show={show} message={"Appointment Booked"} type={"success"}></CustomToast>
            </div>
            <center><Calendar style={{ width: "500px" }}
                variant="dark"
                value={dateState}
                minDate={currdate}
                onChange={changeDate}
                tileClassName={({ date, view }) => {
                    // setBooking(date)
                    const d = dayjs(date).format("YYYY-MM-DD");
                    // console.log(date1);
                    if (bookings?.find((x) => x.date == d)) {
                        return 'highlight'
                    }
                    // marks.find((x) => console.log(x))
                }} />
                <br></br>
                <h2 className="text-white"> Selected Date : {dayjs(dateState).format("DD-MM-YYYY")}</h2>
                <br></br>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col sm={4}>
                                <h2 className="text-white">Vacuum Model</h2>
                            </Col>
                            <Col sm={1}>
                                <Form.Control style={{ width: "500px" }} onChange={inputChange} value={appointment.model} placeholder='Model and make' name="model" as="textarea" rows={2} />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col sm={4}>
                                <h2 className="text-white">Additional Details</h2>
                            </Col>
                            <Col sm={1}>
                                <Form.Control style={{ width: "500px" }} onChange={inputChange} value={appointment.details} placeholder='Additional Details' name="details" as="textarea" rows={2} />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col sm={4}>
                                <h2 className="text-white">Servicing Tiers</h2>
                            </Col>
                            <Col sm={2}>
                                <Form.Group>
                                    <Form.Check defaultChecked name="tier" value="1" onChange={inputChange} className="text-white" type="radio" label="Tier 1 (+$10)" />
                                    <Form.Check name="tier" value="2" onChange={inputChange} className="text-white" type="radio" label="Tier 2 (+$25)" />
                                    <Form.Check name="tier" value="3" onChange={inputChange} className="text-white" type="radio" label="Tier 3 (+$40)" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                    <br></br>
                    <Button size="lg" variant="success" onClick={saveBooking} > Book Appointment </Button>
                </Form>
            </center>
        </>
    );
}

export default AppointmentCalendar;