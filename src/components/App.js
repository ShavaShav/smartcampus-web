import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import NavBar from './NavBar';
import EventFeed from './EventFeed';
import api from '../api';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      currentUser: null,
      events: [] 
    };

    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('token') !== null) {
      api.User.current()
        .then((response) => {
          this.setCurrentUser(response.body.user);
        });
    }
  }

  componentDidMount() {
    api.Event.feed()
      .then((response) => {
        this.setState({ events: response.body.events });
      }).catch((error) => {
        alert("Unable to load events!");

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          console.log(JSON.stringify(error));
        }
      });
  }

  // Clears current user if null given
  setCurrentUser(user = null) {
    if (user && user.token !== null) {
      this.setState({ currentUser: user });
      localStorage.setItem('token', user.token);
    } else {
      this.setState({ currentUser: null });
      localStorage.clear();
    }
  }

  addEvent(event = null) {
    if (event) {
      this.setState({ events: [event, ...this.state.events] });
    }
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} 
                setCurrentUser={this.setCurrentUser}
                addEvent={this.addEvent}/>
        <Jumbotron>
          <EventFeed events={this.state.events}/>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
