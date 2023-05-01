import React, { useState } from "react";

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBCollapse,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router";

function Header(props){
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);

    const goTo = (route) => {
        navigate(route);
    }

    return (
        <MDBNavbar expand='lg' dark style={{ backgroundColor: '#353f50' }}>
            <MDBContainer fluid>
                <MDBIcon fas icon="award" color="light" pull="left"/>
                <MDBNavbarBrand onClick={()=> goTo("/")}>Alumni Tracking System</MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNav(!showNav)}
                    >
                <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNav}>
                <MDBNavbarNav>
                    {/* <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        Home
                    </MDBNavbarLink>
                    </MDBNavbarItem> */}
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header;