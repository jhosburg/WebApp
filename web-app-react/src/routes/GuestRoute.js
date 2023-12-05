import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const GuestRoute = ({ component: element, ...rest }) => {
    const token = localStorage.getItem('QlmVhATFWF')

    return (
        <Route
            { ...rest }
            render={ (props) => (
                !token ? <element { ...props } /> : <Redirect to='/' />
            ) }
        >
        </Route>
    )
}

export default GuestRoute
