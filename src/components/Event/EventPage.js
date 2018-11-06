import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Container, Form, Header, Icon } from 'semantic-ui-react';
import moment from 'moment';

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
	const eventMoment = moment(this.props.currentEvent.time);
	
      return (
        <div>
          <Container style={{height: '75%'}}>
            {/* We'll put the event details (title, image, description etc) here. Making 75% height for now */}
            <div><h1>{this.props.currentEvent.title}</h1> posted by<small style={{ color:'gray'}}> {this.props.currentEvent.author.name}</small></div><br/>
            <div><p>{this.props.currentEvent.body}</p>
              <p>This event will take place on <b>{ eventMoment.format('dddd, MMMM DD, YYYY, h:mm a')}</b> in the <b>{this.props.currentEvent.location}.</b></p>
            </div><br/>
          </Container>
          <Comment.Group>
            <Header as='h3' dividing>
              Comments
            </Header>
            { this.renderComments() }

            <Form reply onSubmit={this.handleCommentSubmit}>
              <Form.TextArea onChange={this.handleCommentChange} value={this.props.currentEventComment}/>
              <Button id="body" content='Add Comment' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
        </div>
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