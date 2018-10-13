import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';
import { postEvent } from '../actions';

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      date: '',
      time: '',
      location: '',
      link: '',
      body: '',
    };
  }

  validateForm() {
    return this.state.title.length > 0 
      && this.state.location.length > 0
      && this.state.body.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    // 'yy-mm-dd hh-mm-ss' format for transmission (must be parseable by js' Date)
    const timestamp = this.state.date + ' ' + this.state.time + ':00';

    this.props.postEvent(this.state.title, timestamp,
      this.state.location, this.state.link, this.state.body);
  }

  render() {
    return (
      <div className="NewEvent">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title" bsSize="large">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="date" bsSize="large">
            <ControlLabel>Date</ControlLabel>
            <FormControl
              type="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="time" bsSize="large">
            <ControlLabel>Time</ControlLabel>
            <FormControl
              type="time"
              value={this.state.time}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="location" bsSize="large">
            <ControlLabel>Location</ControlLabel>
            <FormControl
              type="text"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="link" bsSize="large">
            <ControlLabel>Link</ControlLabel>
            <FormControl
              type="text"
              value={this.state.link}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="body" bsSize="large">
            <ControlLabel>Body</ControlLabel>
            <FormControl
              type="text"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Post Event
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(null, { postEvent })(NewEventForm);
