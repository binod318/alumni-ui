import React from 'react';
import { Route, Routes } from 'react-router';
import SharedLayout from '../components/SharedLayout';
import Home from '../containers/Home';

function Routing(props) {

    return (
        <Routes>
            <Route path='/' element={<SharedLayout/>}>
                <Route index element={<Home/>}/>
            </Route>
        </Routes>
    )

}

export default Routing;