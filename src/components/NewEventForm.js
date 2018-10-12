import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Button, Form, Icon } from 'semantic-ui-react'

import { postEvent } from '../actions';

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      time: moment(),
      location: '',
      link: '',
      body: '',
    };
  }

  validateForm() {
    return this.state.title.length > 0 
      && this.state.time.isAfter(moment())
      && this.state.location.length > 0
      && this.state.body.length > 0;
  }

  handleDateChange = (e) => {
    this.setState({
      time: e
    })
  }

  handleTextChange = (e, {name, value}) => {
    console.log(name);
    console.log(value);

    // Update state from text fields
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    // Format date into string for transmission (must be parseable by JS Date)
    const timeString = moment(this.state.time).format('YYYY-MM-DD hh:mm:ss');

    this.props.postEvent(this.state.title, timeString,
      this.state.location, this.state.link, this.state.body);
  }

  // Example of how we could lock down locations to set of buildings
  // const buildings = [
  //   { key: 'e', text: 'Erie Hall', value: 'erie' },
  //   { key: 'c', text: 'C.A.W', value: 'caw' }
  // ]
  // Then use in Form.Input for location like 'options={buildings}'

  render() {
    return (
      <div className="NewEvent">
        <Form>
          <Form.Input name="title" fluid label="Title" 
          placeholder='A short summary of event...'
          onChange={this.handleTextChange}/>
          <Form.Field>
            <label>Date</label>
            {/*https://github.com/Hacker0x01/react-datepicker/issues/1116*/}
            <style>
              {`.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
                padding-left: 0;
                padding-right: 0;
              }`}
            </style>
            <DatePicker
              selected={this.state.time}
              name="time"
              onChange={this.handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="at"
            />
          </Form.Field>
          <Form.Input fluid 
            label="Location"
            name="location"
            onChange={this.handleTextChange}/>
          <Form.Input fluid 
            label="Link" 
            placeholder='Refer people to your website...'
            name="link"
            onChange={this.handleTextChange}/>
          <Form.TextArea
            name="body"
            label='Description' 
            placeholder='Tell us more about your event...' 
            onChange={this.handleTextChange}/>
          <Button animated
            primary
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleSubmit}>
            <Button.Content visible>Post Event</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { postEvent })(NewEventForm);
