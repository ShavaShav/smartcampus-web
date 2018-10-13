import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import EventCard from './EventCard';

class EventFeed extends Component {
  render() {
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

export default EventFeed;