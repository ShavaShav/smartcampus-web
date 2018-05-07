import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Modal, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import NewEventForm from './NewEventForm';
import { logout, openModal, closeModal  } from '../actions';

class NavBar extends Component {

  static LOGIN     = 'LOGIN';
  static REGISTER  = 'REGISTER';
  static LOGOUT    = 'LOGOUT';
  static NEW_EVENT = 'NEW_EVENT';

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalType: ''
    };

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

  renderModalBody() {
    switch (this.props.modalType) {
      case NavBar.LOGIN:
        return <LoginForm finish={this.props.closeModal}/>
      case NavBar.REGISTER:
        return <RegisterForm finish={this.props.closeModal}/>
      case NavBar.NEW_EVENT:
        return <NewEventForm finish={this.props.closeModal}/>
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

        <Modal show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              { this.props.modalType === NavBar.LOGIN ? "Login" : 
                this.props.modalType === NavBar.REGISTER ? "Register" :
                "New Event" }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.renderModalBody() }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalType: state.modal.type,
    showModal: state.modal.show
  }
};

const mapDispatchToProps = {
  logout,
  openModal,
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);