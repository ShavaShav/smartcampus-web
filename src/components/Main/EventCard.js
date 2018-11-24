import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Card, Container, Grid, Header } from 'semantic-ui-react';
import AttendButton from '../Buttons/AttendButton';
import CommentButton from '../Buttons/CommentButton';
import LikeButton from '../Buttons/LikeButton';

import { likeEvent, unlikeEvent } from '../../actions';

class EventCard extends Component {

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
        <Card.Content extra style={{textAlign: 'right'}}>
          <CommentButton event={event}/>
          <AttendButton event={event}/>
          <LikeButton event={event}/>
        </Card.Content>
      </Card>
    );
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  likeEvent, unlikeEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
