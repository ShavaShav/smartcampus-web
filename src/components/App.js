import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import EventFeed from './EventFeed';
import FormModal from './FormModal';

import {
  fetchCurrentUser,
  fetchEvents
} from '../actions';

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.fetchCurrentUser();
    }

    this.props.fetchEvents();
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.props.currentUser}/>
        <Jumbotron>
          <EventFeed events={this.props.events}/>
        </Jumbotron>
        <FormModal 
          modalType={this.props.modalType} 
          showModal={this.props.showModal}/>
        <Notifications notifications={this.props.notifications}/>
      </div>
    );
  }
}

// Global State
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    events: state.eventFeed.events,
    modalType: state.modal.type,
    showModal: state.modal.show,
    notifications: state.notifications
  }
};

const mapDispatchToProps = {
  fetchEvents,
  fetchCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
