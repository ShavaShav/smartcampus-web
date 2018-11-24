import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Loader } from 'semantic-ui-react';
import EventCard from './EventCard';

import { fetchEvents } from '../../actions';

class EventFeed extends Component {

  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {
    if (this.props.isFetching) {
      return <Loader active inline='centered'>Loading Events</Loader>
    } else {
      return (
        <Card.Group>
          { this.props.events.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              />
          ))}
        </Card.Group>
      );
    }
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    events: state.eventFeed.events,
    isFetching: state.eventFeed.isFetching
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  fetchEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(EventFeed);
