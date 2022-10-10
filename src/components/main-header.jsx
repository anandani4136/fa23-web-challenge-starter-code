import React, { useState } from 'react';
import styles from "../styles/index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBCollapse,
    MDBBtn
  } from 'mdb-react-ui-kit';

function MainHeader() {
    const [showBasic, setShowBasic] = useState(false);
    // Inspired by examples from https://mdbootstrap.com/docs/react/navigation/headers/#!
    return (
        // <h1>Events</h1>
        <header>
      <MDBNavbar expand='lg' className={styles.navbar}>
        <MDBContainer fluid>
          <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <FontAwesomeIcon icon={faBars} />
            {/* <p className={styles.hackIllinois2} ></p> */}
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
                <MDBNavbarLink className={styles.navBarLink} aria-current='page' href='#'>
                    <p className={styles.hackIllinois} ></p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className={styles.navBarLink2} href='#workshops'>Workshops</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className={styles.navBarLink2} href='#miniEvents'>Mini-Events</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className={styles.navBarLink2} href='#qnas'>Q&A</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className={styles.navBarLink2} href='#others'>Other</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </header>
      

    );
};

export default MainHeader;
