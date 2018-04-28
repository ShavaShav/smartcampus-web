import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import NavBar from './NavBar';
import EventFeed from './EventFeed';
import api from '../api';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { events: [] };
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

  render() {
    return (
      <div>
        <NavBar/>
        <Jumbotron>
          <EventFeed events={this.state.events}/>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
