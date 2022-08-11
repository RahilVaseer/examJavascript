import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
export default function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = true;
    // sessionStorage.getItem("loginStatus")
    // return (
    //     // <Outlet
    //     //     {...rest}
    //     //     render={props => !isAuthenticated ? (
    //     //         <Navigate to="/login" />
    //     //     ) : (
    //     //             <Component {...props} />
    //     //         )}

    //     // />
    //     )
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}