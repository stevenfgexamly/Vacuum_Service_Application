import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NavbarDropDown, Container, Card, ButtonGroup, Button, Table, Row, Col, Form } from 'react-bootstrap';
import CustomToast from './CustomToast';
import { Link } from 'react-router-dom';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookAppointment from './BookAppointment';


function FilterServiceList() {
    const [show, setShow] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [services, setServices] = useState([]);
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [city, setCity] = useState("");
    const [searchData, setSearchData] = useState(services);
    const [pricing, setPricing] = useState("ch");

    useEffect(() => {
        getServices();
    }, []);

    const getServices = () => {
        axios.get("http://localhost:8080/api/service/getAllServices")
            .then(response => response.data)
            .then((data) => {
                setServices(data);
                setSearchData(data);
            });
    }

    const handleSearch = () => {
        const filterData = services.filter(x => x.name == (name == "" ? x.name : name))
            .filter(y => y.place == (place == "" ? y.place : place))
            .filter(z => z.city == (city == "" ? z.city : city));

        filterData.sort((pA, pB) => {
            if (pricing == 'ch')
                return pA.price - pB.price;
            else
                return pB.price - pA.price;
        });
        setSearchData(filterData);
    };

    const resetFilters = () => {
        setName("");
        setPlace("");
        setCity("");
        searchData = setSearchData(services);
    };

    return (
        <>
            <Card className='bg-dark text-white' >
                <Card.Header>
                    <label style={{ fontSize: "1.5rem" }} >Search Filters</label>
                </Card.Header>
                <Card.Body className="bg-dark">
                    <Row>
                        <Col>
                            <Form.Control required value={name} name="name" type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Control required value={place} name="place" type="text" placeholder="Place" onChange={(e) => { setPlace(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Control required value={city} name="city" type="text" placeholder="City" onChange={(e) => { setCity(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row><h1></h1><h1></h1></Row>
                    <Row>
                        <Col>
                            <Form.Select className="bg-dark text-white" onChange={(e) => { setPricing(e.target.value) }}>
                                <option className="text-white" value="ch">Cheapest</option>
                                <option className="text-white" value="ex">Expensive</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button size="lg" onClick={() => handleSearch()}>Search</Button>
                        </Col>
                        <Col>
                            <Button size="lg" className="btn-danger" onClick={() => resetFilters()}>Clear Filters</Button>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
            <div style={{ "display": show ? "block" : "none" }}>
                <CustomToast children={{ show: show, message: "Service removed", type: "danger" }}></CustomToast>
            </div>
            {/* <Table responsive variant="dark" striped bordered style={{ width: '100%' }}>
                <thead >
                    <tr>
                        <th>Center Code</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody> */}
            <Container className="p-4">
                <Row>
                    {
                        searchData == 0 ?
                            <Card className='bg-dark text-white m-2'>
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "30px" }} >No Service Centers Available.</Card.Title>
                                </Card.Body>
                            </Card>
                            :
                            searchData.map(service =>
                                // <tr key={service.sid}>
                                //     <td>{service.scode}</td>
                                //     <td>{service.name}</td>
                                //     <td>{service.city}</td>
                                //     <td>{service.price}</td>
                                //     <td>{service.avail ? "Yes" : "No"}</td>
                                // </tr>

                                <Card key={service.sid} className='bg-dark text-white m-2' style={{ width: "30%" }} >
                                    <Card.Header>
                                        <Card.Title style={{ fontSize: "30px" }} >{service.scode}  -  {service.name}</Card.Title>
                                    </Card.Header>
                                    <Card.Body className='bg-dark text-white' >
                                        <Card.Text style={{ fontSize: "20px" }}>
                                            Place : {service.place}<br />
                                            City : {service.city}<br />
                                            Price : ${service.price}
                                        </Card.Text>
                                        {/* <Button variant="primary">Book Appointment</Button> */}
                                        <Link type="button" to={{ pathname: `/bookappointment/${service.sid}` }}><Button variant="primary">Book Appointment</Button></Link>
                                    </Card.Body>
                                </Card>
                            )
                    }
                </Row>
            </Container>
            {/* </tbody>
            </Table> */}
        </>
    );
}

export default FilterServiceList;