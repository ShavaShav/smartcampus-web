import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventCard from './EventCard';

class EventFeed extends Component {
  render() {
    const eventCards = [];

    this.props.events.forEach((event) => {
      // TODO: use slug ids instead of database ids
      eventCards.push(<EventCard key={event.id} event={event}/>);
    });

    return (
      <Grid relaxed='very' columns='equal' verticalAlign='middle' centered>
        {eventCards}
      </Grid>
    );
  }
}

export default EventFeed;