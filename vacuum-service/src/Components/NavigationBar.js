import React, { Component, useEffect, useState } from 'react';

import { Navbar, Nav, NavDropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
 

function NavigationBar() {

    const [auth,setAuth] = useState(localStorage.getItem('isauth'));
    const role = localStorage.getItem('role');
    const uname = localStorage.getItem('name');
    const navigate = useNavigate();


    const logOut = () => {
        localStorage.clear();
        localStorage.setItem("isauth","false");
        navigate("/login");
    };

    useEffect(() => {
        const uname = localStorage.getItem('name');
        setAuth(localStorage.getItem('isauth'))
    });


    return (
        <>
            <Navbar bg="dark" variant="dark" className="navgrad">
                <Link to={"/services"} className="navbar-brand nav-link" style={{ marginLeft: '1rem' }}>
                    SFG Vacuum Servicing
                </Link>
                {
                    role == "ROLE_ADMIN"
                        ? <Nav className="ml-auto">
                            <Link to={"services"} className="nav-link">View Service Centers</Link>
                            <Link to={"appointments"} className="nav-link">Booked Appointments</Link>
                            <NavDropdown title="Admin Functions" variant="dark">
                                <NavDropdown.Item>
                                <Link to={"add"} className="nav-link text-black" style={{ marginRight: '1rem' }}>Add Service Center</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                <Link to={"editList"} className="nav-link text-black">Edit Service Centers</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                <Link to={"pendingappointments"} className="nav-link text-black">Pending Appointments</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : <></>
                }
                {
                    role == "ROLE_USER"
                        ? <Nav className="ml-auto">
                            <Link to={"services"} className="nav-link">View Service Centers</Link>
                            <Link to={"appointments"} className="nav-link">Booked Appointments</Link>
                        </Nav>
                        : <></>
                }
                {
                    (localStorage.getItem('isauth') == "false") ?
                        <Navbar.Collapse className="justify-content-end text-white">
                            <Nav.Link to={"login"} className="nav-link" style={{ marginRight: '1rem' }}>Login</Nav.Link>
                        </Navbar.Collapse>
                        :
                        <Navbar.Collapse className="justify-content-end text-white">
                            {/* <Nav.Link onClick={logOut} className="nav-link" style={{ marginRight: '1rem' }}>Logout</Nav.Link> */}
                            {/* <NavDropdown right title={uname}  style={{ marginRight: '1rem' }}>
                                
                            </NavDropdown> */}
                            <DropdownButton drop="start" size='lg'  style={{ marginRight: '2rem' }} title={uname}>
                                {
                                    role == "ROLE_ADMIN"
                                    ?
                                    <NavDropdown.Item disabled>ADMIN</NavDropdown.Item>
                                    :
                                    <NavDropdown.Item disabled>USER</NavDropdown.Item>
                                }
                            <NavDropdown.Item disabled>{localStorage.getItem('email')}</NavDropdown.Item>
                                <NavDropdown.Item href="/accountdetails">Account Details</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <Nav.Link onClick={logOut} className="nav-link text-red" style={{ marginRight: '1rem'}}>Logout</Nav.Link>
                                </NavDropdown.Item>
                            </DropdownButton>
                        </Navbar.Collapse>
                }
                {/* <Link to={"signup"} className="nav-link d-flex justify-content-end">Signup</Link> */}
            </Navbar>
        </>
    );
}

export default NavigationBar;