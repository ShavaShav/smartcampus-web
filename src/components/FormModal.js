import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { openModal, closeModal  } from '../actions';

import NewEventForm from './NewEventForm';

class FormModal extends Component {

  static NEW_EVENT = 'NEW_EVENT';

  getTitle() {
    switch (this.props.modalType) {
      case FormModal.NEW_EVENT:
        return 'New Event'
      default:
        return '';
    }
  }

  renderModalBody() {
    switch (this.props.modalType) {
      case FormModal.NEW_EVENT:
        return <NewEventForm/>
      default:
        return null;
    }
  }

  render() {
    return (
      <Modal open={this.props.showModal} onClose={this.props.closeModal}>
        <Modal.Header>
          { this.getTitle() }
        </Modal.Header>
        <Modal.Content>
          { this.renderModalBody() }
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  openModal,
  closeModal
};

export default connect(null, mapDispatchToProps)(FormModal);