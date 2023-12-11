import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: element, ...rest }) => {
    const token = localStorage.getItem('QlmVhATFWF')

    return (
        <Route
            { ...rest }
            render={ (props) => (
                token ? <element { ...props } /> : <Redirect to='/Account' />
            ) }
        >
        </Route>
    )
}

export default ProtectedRoute
