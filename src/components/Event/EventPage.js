import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEvent } from '../../actions';

/*
 * Event page layout component
 */

class EventPage extends Component {

  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
  }

  renderUser() {
    if (this.props.currentUser) {
      return <div><b>User:</b> {this.props.currentUser.name}</div>
    } else {
      return <div><b>User:</b> Not signed in</div>
    }
  }

  renderEvent() {
    if (this.props.currentEvent) {
      return <div><b>Event:</b> {this.props.currentEvent.title} by {this.props.currentEvent.author.name}</div>
    } else {
      return <div><b>Event:</b> Not set</div>
    }
  }

  render() {
    return (
      <div className='routed-page'>
        <h2>Under construction.</h2>
        { this.renderEvent() }
        <br/>
        { this.renderUser() }
      </div>
    );
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentEvent: state.currentEvent
  }
};

// Get access to some dispatch actions
const mapDispatchToProps = {
  fetchEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);