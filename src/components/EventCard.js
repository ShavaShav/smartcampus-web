import moment from 'moment';
import React, { Component } from 'react';
import { Card, Container, Grid, Header } from 'semantic-ui-react'

class EventCard extends Component {

  render() {
    const event = this.props.event;
    const eventMoment = moment(event.time);
    return (
      <Card link>
        <Card.Content className='event-card-header'>
          <Card.Header>{event.title}</Card.Header>
          <Card.Meta>
            <small>Posted by {event.author.name}</small>
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            <Grid relaxed>
              <Grid.Column style={{flex: 0.25, textAlign: 'center'}}>
                  <Header as='p'>
                    { eventMoment.format('MMM') }
                  </Header>
                  <Header as='h2'>
                    { eventMoment.format('D') }
                  </Header>
              </Grid.Column>
              <Grid.Column style={{flex: 0.75}}>
                <Container>
                  <p>{ eventMoment.format('h:mm a') }</p>
                  <p>{ event.location }</p>
                </Container>
              </Grid.Column>
            </Grid>
          </Card.Meta>
        </Card.Content>
      {/* TODO: Replace this content area with likes, attendees */}
        <Card.Content extra style={{textAlign: 'right'}}>
          <small>Updated at {event.updatedAt}</small>
        </Card.Content>
      </Card>
    );
  }
}

export default EventCard;