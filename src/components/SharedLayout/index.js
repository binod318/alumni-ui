import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router';
import Footer from '../Footer';

function SharedLayout(props){
    return (
        <div id="page-container">
            <div id="content-wrap">
                <Header/>
                <Outlet></Outlet>
            </div>
            <div id="footer">
                <Footer/>
            </div>
        </div>
    )
}

export default SharedLayout;