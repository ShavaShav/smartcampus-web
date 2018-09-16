import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openModal, closeModal  } from '../actions';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import NewEventForm from './NewEventForm';

class FormModal extends Component {

  static LOGIN     = 'LOGIN';
  static REGISTER  = 'REGISTER';
  static LOGOUT    = 'LOGOUT';
  static NEW_EVENT = 'NEW_EVENT';

  getTitle() {
    switch (this.props.modalType) {
      case FormModal.LOGIN:
        return 'Login'
      case FormModal.REGISTER:
        return 'Register'
      case FormModal.NEW_EVENT:
        return 'New Event'
      default:
        return '';
    }
  }

  renderModalBody() {
    switch (this.props.modalType) {
      case FormModal.LOGIN:
        return <LoginForm/>
      case FormModal.REGISTER:
        return <RegisterForm/>
      case FormModal.NEW_EVENT:
        return <NewEventForm/>
      default:
        return null;
    }
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            { this.getTitle() }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.renderModalBody() }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  openModal,
  closeModal
};

export default connect(null, mapDispatchToProps)(FormModal);