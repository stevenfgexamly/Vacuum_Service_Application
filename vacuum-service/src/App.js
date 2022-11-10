import logo from './logo.svg';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import { Container, Row, } from 'react-bootstrap';
import Footer from './Components/Footer';
import AddService from './Components/AddService';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import UpdateService from './Components/UpdateService';
import FilterServiceList from './Components/FilterServiceList';
import LoginUser from './Components/LoginUser';

import FrontPage from './Components/UnauthorizedPage';
import RoleRouting from './Components/Routes/RoleRouting';
import Signup from './Components/Signup';
import UnauthorizedPage from './Components/UnauthorizedPage';
import PublicRoleRouting from './Components/Routes/PublicRoleRouting';
import React, { useState, useEffect } from 'react';
import AccountDetails from './Components/AccountDetails';
import BookAppointment from './Components/BookAppointment';
import Page404 from './Components/Page404';
import ViewAppointments from './Components/ViewAppointments';
import PendingAppointments from './Components/PendingAppointments';
import ViewReviews from './Components/ViewReviews';
function App() {

  useEffect(() => {
});

  return (
    <Router>
      <NavigationBar />
      <br />
      <center>
        <h1 className='title'>SFG Vacuum Cleaner Servicing</h1>
      </center>
      <br></br>
      <Container>
        <Routes>
          <Route element={<RoleRouting allowedR={["ROLE_ADMIN", "ROLE_USER"]} />}>
            <Route path="/services" element={<FilterServiceList />} />
            <Route path="/accountdetails" element={<AccountDetails />} />
            <Route path="/bookappointment/:id" element={<BookAppointment />} />
            <Route path="/appointments" element={<ViewAppointments />} />
            <Route path="/pendingappointments" element={<PendingAppointments />} />
            <Route path="/" element={<FilterServiceList />} />
          </Route>
          <Route element={<RoleRouting allowedR={"ROLE_ADMIN"} />}>
            <Route path="/add" element={<AddService />} />
            <Route path="/editList" element={<UpdateService />} />
          </Route>
          {/* <Route exact path="/home" element={<FilterServiceList />} /> */}
          <Route element={<PublicRoleRouting allowedR={"Public"} />}>
            <Route path="/login" element={<LoginUser />} />
          </Route>
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          {/* <Route path="/" element={<FilterServiceList />} /> */}
          <Route path="*" element={<Page404 />} />
          
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
