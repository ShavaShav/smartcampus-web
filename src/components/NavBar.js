import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout, openModal } from '../actions';

class NavBar extends Component {

  static LOGIN     = 'LOGIN';
  static REGISTER  = 'REGISTER';
  static LOGOUT    = 'LOGOUT';
  static NEW_EVENT = 'NEW_EVENT';

  constructor(props) {
    super(props);

    this.handleNavClick = this.handleNavClick.bind(this);
    this.renderUserNavItems = this.renderUserNavItems.bind(this);
  }

  handleNavClick(eventKey) {
    switch (eventKey) {
      case NavBar.LOGIN:
        this.props.openModal(NavBar.LOGIN);
        break;
      case NavBar.REGISTER:
        this.props.openModal(NavBar.REGISTER);
        break;
      case NavBar.LOGOUT:
        this.props.logout();
        break;
      case NavBar.NEW_EVENT:
        this.props.openModal(NavBar.NEW_EVENT);
        break;
      default:
        // undefined
    }
  }

  renderUserNavItems() {
    if (this.props.currentUser) {
      return (
        <Nav pullRight onSelect={this.handleNavClick}>
          <NavItem eventKey={NavBar.NEW_EVENT}>
            New Event
          </NavItem>
          <NavItem>
            {this.props.currentUser.username}
          </NavItem>
          <NavItem eventKey={NavBar.LOGOUT}>
            Logout
          </NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav pullRight onSelect={this.handleNavClick}>
          <NavItem eventKey={NavBar.LOGIN}>
            Login
          </NavItem>
          <NavItem eventKey={NavBar.REGISTER}>
            Register
          </NavItem>
        </Nav>
      );
    }
  }

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
          <Navbar.Collapse>
              { this.renderUserNavItems() }
          </Navbar.Collapse>
        </Grid>
      </Navbar>
    );
  }
}

const mapDispatchToProps = {
  logout,
  openModal
};

export default connect(null, mapDispatchToProps)(NavBar);