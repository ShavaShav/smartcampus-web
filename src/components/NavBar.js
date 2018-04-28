import React, { Component } from 'react';
import { Navbar, Grid } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">SmartCampus</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
    );
  }
}

export default NavBar;