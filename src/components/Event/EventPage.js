import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Container, Form, Header, Icon, Grid } from 'semantic-ui-react';
import moment from 'moment';
import EventActionBar from '../EventActionBar';
import { fetchEvent, commentEvent, commentEventUpdate, deleteComment } from '../../actions';

/*
 * Event page layout component
 */

class EventPage extends Component {

  constructor(props) {
    super(props);    
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }
  
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
  }
  
  handleCommentChange(event) {
    this.props.commentEventUpdate(event.target.value);
  }

  handleCommentSubmit() {
    this.props.commentEvent(this.props.currentEvent.id, this.props.currentEventComment);
  }

  handleCommentDelete(e) {
    this.props.deleteComment(e.target.id);
  }

  renderDeleteCommentButton(comment) {
    if (this.props.currentUser && comment.author.id === this.props.currentUser.id) {
      return (
        <Comment.Action >
          <Icon name='delete' onClick={this.handleCommentDelete} id={comment.id}/>
          Delete
        </Comment.Action>
      )
    }
  }

  renderLikeButton() {
    const event = this.props.currentEvent;

    const numLikes = event.likes.length.toString();

    if (this.props.currentUser) {
      // If logged in, determine if user likes
      this.isLiked = event.likes.some(user => user.id === this.props.currentUser.id);
    } else {
      this.isLiked = false; // no user, no like
    }

    return (
      // 'basic' drains the color, indicating not liked
      <Button
        basic={!this.isLiked}
        color='red'
        icon='heart'
        label={{ circular: false, basic: true, color: 'red', pointing: 'left', content: numLikes }}
        onClick={ this.handleLike }
      />
    )
  }

  renderComments() {
    return (
      <div>
        { this.props.currentEvent.comments.map(comment => (
          <Comment key={comment.id}>
            <Comment.Avatar src={comment.author.picture} />
            <Comment.Content>
              <Comment.Author>{comment.author.name}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.createdAt}</div>
                <Comment.Actions>
                  { this.renderDeleteCommentButton(comment) }
                </Comment.Actions>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </div>
    )
  }

  renderEvent() {
    if (this.props.currentEvent) {
      const event = this.props.currentEvent;
      console.log(event);
      const eventMoment = moment(event.time);
      
      return (
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <h1>{event.title}</h1>
              <p>{event.body}</p>
            </Grid.Column>
            <Grid.Column width={6} className='side-event-page'>
              <Grid.Row>
                <EventActionBar event={event}/>
              </Grid.Row>
              <Grid.Row>
                <h2>When?</h2>
                <p>{eventMoment.format('dddd, MMMM DD, YYYY, h:mm a')}</p>
              </Grid.Row>
              <Grid.Row>
                <h2>Where?</h2>
                <p>{event.location}</p>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Comment.Group style={{width: '100%'}}>
              <Header as='h3' dividing>
                Comments ({event.comments.length})
              </Header>
              { this.renderComments() }

              <Form reply onSubmit={this.handleCommentSubmit}>
                <Form.TextArea onChange={this.handleCommentChange} value={this.props.currentEventComment}/>
                <Button id="body" content='Add Comment' labelPosition='left' icon='edit' primary />
              </Form>
            </Comment.Group>
          </Grid.Row>
        </Grid>
      )
    } else {
      return <Container>Waiting for event to load...</Container>
    }
  }

  render() {
    return (
      <div className='routed-page'>
        { this.renderEvent() }
      </div>
    );
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentEvent: state.currentEvent,
    currentEventComment: state.currentEventComment || ''
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  fetchEvent, commentEvent, commentEventUpdate, deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);