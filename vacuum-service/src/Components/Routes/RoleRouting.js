import { BrowserRouter as Router, Routes, Route,Outlet,Navigate,useLocation } from 'react-router-dom';
import React, { useState } from 'react';

const RoleRouting = ({allowedR}) => {
    const [r,SetR]=useState(localStorage.getItem("role"));
    const location = useLocation();
    const [u,SetU]=useState(localStorage.getItem("current_user"));

    let ro = [];

    ro = [ ...ro,r];

    return(
        ro.find(role => allowedR?.includes(role))
        ?<Outlet />
        : u == null
            ? <Navigate to="/login" state={{ from : location}} replace />
            : <Navigate to="/unauthorized" state={{ from : location}} replace />

    ); 
};
export default RoleRouting;