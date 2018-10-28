import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react'

import EventFeed from './EventFeed';

import { fetchEvents } from '../../actions';

/*
 * Main page layout component
 */

class MainPage extends Component {

  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <Container className='routed-page'>
        <EventFeed events={this.props.events} />
      </Container>
    );
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    events: state.eventFeed.events
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  fetchEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
