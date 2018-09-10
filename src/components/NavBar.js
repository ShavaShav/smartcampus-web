import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Nav, Navbar, NavItem } from 'react-bootstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { login, logout, openModal } from '../actions';

class NavBar extends Component {

  static NEW_EVENT = 'NEW_EVENT';

  constructor(props) {
    super(props);

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    
    this.renderUserNavItems = this.renderUserNavItems.bind(this);
  }

  handleNavClick(eventKey) {
    switch (eventKey) {
      case NavBar.NEW_EVENT:
        this.props.openModal(NavBar.NEW_EVENT);
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

  // Authenticates with our backend using google Id token
  handleLoginSuccess(googleResponse) {
    this.props.login(googleResponse.tokenId);
  }

  renderUserNavItems() {
    // CSS to remove Google signin button styling
    const googleButtonStyle = {
      background: 'transparent',
      color: 'inherit',
      border: 'none',
      padding: '0!important',
      font: 'inherit'
    }

    if (this.props.currentUser) {
      return (
        <Nav pullRight onSelect={this.handleNavClick}>
          <NavItem eventKey={NavBar.NEW_EVENT}>
            New Event
          </NavItem>
          <NavItem>
            {this.props.currentUser.name}
          </NavItem>
          <NavItem>
            <GoogleLogout 
              style={googleButtonStyle}
              buttonText="Logout"
              onLogoutSuccess={this.props.logout}
            />
          </NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav pullRight onSelect={this.handleNavClick}>
          <NavItem>
            <GoogleLogin 
              style={googleButtonStyle}
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLoginSuccess}
            />
          </NavItem>
        </Nav>
      );
    }
  }

// F@11TestCampu5

  render() {
    return (
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="./">SmartCampus</a>
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
  login,
  logout,
  openModal
};

export default connect(null, mapDispatchToProps)(NavBar);
