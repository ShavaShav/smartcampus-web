import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Card, Container, Grid, Header, Button } from 'semantic-ui-react'

import { likeEvent } from '../../actions';

class EventCard extends Component {

  // Ids for button events
  static BUTTON_LIKE = 1;

  constructor(props) {
    super(props);
    
    this.handleLike = this.handleLike.bind(this);
  }
  
  handleLike(e) {
    e.preventDefault(); // This stops the Link in render() from routing to EventPage
    
    const event = this.props.event;
    if (event.liked) {
      // unlike
    } else {
      this.props.likeEvent(event.id);
    }
}

  renderLike() {
    const event = this.props.event;
    const numLikes = event.likes.toString();

    if (event.liked) {
      return (
        <Button
          circular
          color='red'
          icon='heart'
          label={{ circular: true, basic: true, color: 'red', pointing: 'left', content: numLikes }}
          onClick={ this.handleLike }
        />
      )
    } else {
      return (
        // 'basic' drains the color, indicated not liked
        <Button
          basic
          circular
          color='red'
          icon='heart'
          label={{ circular: true, basic: true, color: 'red', pointing: 'left', content: numLikes }}
          onClick={ this.handleLike }
        />
      )
    }
  }

  render() {
    const event = this.props.event;
    const eventMoment = moment(event.time);

    return (
      <Card as={ Link } to={'/event/'+event.id}>
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
          { this.renderLike() }
        </Card.Content>
      </Card>
    );
  }
}

// Get access to some dispatch actions
const mapDispatchToProps = {
  likeEvent
};

export default connect(null, mapDispatchToProps)(EventCard);
