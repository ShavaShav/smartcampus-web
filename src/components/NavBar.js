import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Modal, Grid } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import NewEventForm from './NewEventForm';
import api from '../api';

class NavBar extends Component {

  static LOGIN     = 1;
  static REGISTER  = 2;
  static LOGOUT    = 3;
  static NEW_EVENT = 4;

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalType: ''
    };

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderUserNavItems = this.renderUserNavItems.bind(this);
  }

  handleNavClick(eventKey) {
    switch (eventKey) {
      case NavBar.LOGIN:
        this.setState({ 
          showModal: true,
          modalType: NavBar.LOGIN 
        });
        break;
      case NavBar.REGISTER:
        this.setState({ 
          showModal: true,
          modalType: NavBar.REGISTER
        });
        break;
      case NavBar.LOGOUT:
        api.User.logout().then((res) => {
          this.props.setCurrentUser(null);
        }).catch((err) => {
          alert("Failed to log out! Try again later.");
        });
        break;
      case NavBar.NEW_EVENT:
        this.setState({ 
          showModal: true,
          modalType: NavBar.NEW_EVENT
        });
        break;
      default:
        // undefined
    }
  }

  handleCloseModal(user = null) {
    this.setState({ 
      showModal: false
    });
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

  renderModalBody() {
    switch (this.state.modalType) {
      case NavBar.LOGIN:
        return <LoginForm setCurrentUser={this.props.setCurrentUser} 
          finish={this.handleCloseModal}/>
      case NavBar.REGISTER:
        return <RegisterForm setCurrentUser={this.props.setCurrentUser} 
          finish={this.handleCloseModal}/>
      case NavBar.NEW_EVENT:
        return <NewEventForm addEvent={this.props.addEvent} 
          finish={this.handleCloseModal}/>
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
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

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              { this.state.modalType === NavBar.LOGIN ? "Login" : 
                this.state.modalType === NavBar.REGISTER ? "Register" :
                "New Event" }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.renderModalBody() }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NavBar;