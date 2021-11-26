import React from 'react'
import { Route} from 'react-router'

const PublicRoute = (props) => {
    console.log(props )
    return (
        <Route {...props}/>
    )
}
export default PublicRoute;
