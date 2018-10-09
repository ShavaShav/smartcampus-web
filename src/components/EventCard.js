import React, { Component } from 'react';
import { Panel  } from 'react-bootstrap';

class EventCard extends Component {
  render() {
    const event = this.props.event;
    // Convert ISO datestring to a readable format
    const dateString = new Date(event.time).toLocaleString();
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{event.title}</Panel.Title>
          <small>Posted by {event.author.name}</small>
        </Panel.Heading>
        <table>
          <tbody>
            <tr>
              <td>
                <Panel.Body>
                  <b>{dateString}</b>
                  <br/>
                    {event.location}
                  <br/>
                  <a href={event.link}>{event.link}</a>
                </Panel.Body>
              </td>
              <td>
                <Panel.Body>{event.body}</Panel.Body>
              </td>
            </tr>
          </tbody>
        </table>
        <Panel.Footer style={{textAlign: 'right'}}>
          <small>Updated at {event.updated_at}</small>
        </Panel.Footer>
      </Panel>
    );
  }
}

export default EventCard;