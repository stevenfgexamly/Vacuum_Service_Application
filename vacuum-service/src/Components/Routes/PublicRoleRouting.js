import { BrowserRouter as Router, Routes, Route,Outlet,Navigate,useLocation } from 'react-router-dom';
import React, { useState } from 'react';

const PublicRoleRouting = ({allowedR}) => {
    const [r,SetR]=useState(localStorage.getItem("role"));
    const location = useLocation();
    const [u,SetU]=useState(localStorage.getItem("current_user"));

    let ro = [];

    ro = [ ...ro,r];

    return(
        u == null
        ? <Outlet/>
        : <Navigate to="/services" state={{ from : location}} replace />

    ); 
};
export default PublicRoleRouting;