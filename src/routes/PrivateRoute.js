import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { auth } from '../components/firebase/config'
import { onAuthStateChanged, } from "firebase/auth";
const PrivateRoute = ({component:C , ...props}) => {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const red =()=>{
        return(
            alert("Inicia con tu cuenta para poder ingresar"),
            <Redirect to='/sign-up/'   />
        )
    }
    return (
        <Route {...props} render={routeProps => user ? <C {...routeProps}/> :
        red() }/>
    )
}
export default PrivateRoute;
