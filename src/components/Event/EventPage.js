import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Container, Form, Header } from 'semantic-ui-react';

import { fetchEvent, commentEvent, commentEventUpdate, deleteComment } from '../../actions';

/*
 * Event page layout component
 */

class EventPage extends Component {

  constructor(props){
    super(props);    
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
  }
  
  handleCommentChange(event){
    this.props.commentEventUpdate(event.target.value);
  }

  handleCommentSubmit(){
    this.props.commentEvent(this.props.currentEvent.id, this.props.currentEventComment);
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
      return (
        <div>
          <Container style={{height: '75%'}}>
            {/* We'll put the event details (title, image, description etc) here. Making 75% height for now */}
            <div><b>Event:</b> {this.props.currentEvent.title} by {this.props.currentEvent.author.name}</div>
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
        <h2>Under construction.</h2>
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