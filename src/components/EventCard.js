import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class EventCard extends Component {
  render() {
    const event = this.props.event;
    // Convert ISO datestring to a readable format
    const dateString = new Date(event.time).toLocaleString();
    return (
      <Card>
        <Card.Content>
          <Card.Header>{event.title}</Card.Header>
          <Card.Meta>
            <small>Posted by {event.author.name}</small>
          </Card.Meta>
          <Card.Meta>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Card.Description>
                      <center>
                        {dateString}
                        <br/>
                        at <b>{event.location}</b>
                        <br/>
                        <a href={event.link}>{event.link}</a>
                      </center>
                    </Card.Description>
                  </td>
                  <td>
                    <Card.Description>{event.body}</Card.Description>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra style={{textAlign: 'right'}}>
          <small>Updated at {event.updatedAt}</small>
        </Card.Content>
      </Card>
    );
  }
}

export default EventCard;