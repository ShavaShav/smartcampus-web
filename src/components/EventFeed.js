import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import EventCard from './EventCard';

class EventFeed extends Component {
  render() {
    const eventCards = [];

    this.props.events.forEach((event) => {
      // TODO: use slug ids instead of database ids
      eventCards.push(<EventCard key={event.id} event={event}/>);
    });

    return (
      <Grid>
        {eventCards}
      </Grid>
    );
  }
}

export default EventFeed;