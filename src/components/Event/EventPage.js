import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
 * Event page layout component
 */

class EventPage extends Component {

  renderUser() {
    if (this.props.currentUser) {
      return <div><b>User:</b> {this.props.currentUser.name}</div>
    } else {
      return <div><b>User:</b> Not signed in</div>
    }
  }

  render() {
    return (
      <div className='routed-page'>
        <h2>Under construction.</h2>
        <b>Event:</b> {this.props.match.params.id}
        <br/>
        { this.renderUser() }
      </div>
    );
  }
}

// Get access to some global state
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
};

export default connect(mapStateToProps)(EventPage);