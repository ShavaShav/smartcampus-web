import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { openModal, closeModal  } from '../actions';
import NewEventForm from './NewEventForm';
import styles from './styles';

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
      <Modal closeIcon  open={this.props.showModal} onClose={this.props.closeModal}>
        <Modal.Header style={Object.assign({}, styles.BlueBackground, styles.WhiteText)}>
          { this.getTitle() }
        </Modal.Header>
        <Modal.Content>
          { this.renderModalBody() }
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  openModal,
  closeModal
};

export default connect(null, mapDispatchToProps)(FormModal);