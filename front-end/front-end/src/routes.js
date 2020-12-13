import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard/'
import Event from './pages/Events';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/' exact component={Dashboard} />
                <Route path='/event' component={Event} />
            </Switch>
        </BrowserRouter>
    );
}