import { error } from 'react-notification-system-redux';

import api from './api';

/**
 * Refs
 * https://redux.js.org/basics/actions
 * https://www.npmjs.com/package/redux-promise-middleware
 */

/*
 * Action Types
 */

export const FETCH_EVENT = 'FETCH_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const POST_EVENT = 'POST_EVENT';
export const LIKE_EVENT = 'LIKE_EVENT';
export const UNLIKE_EVENT = 'UNLIKE_EVENT';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/*
 * Synchronous Action Creators
 */

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    event
  }
}

export function openModal(modalType) {
  return {
    type: OPEN_MODAL,
    modalType
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function logout() {
  localStorage.clear();

  return {
    type: LOGOUT
  }
}

/*
 * Async Action Creators
 */

export function fetchEvents() {
  return {
    type: FETCH_EVENTS,
    payload: api.Event.feed()
  }
}

export function fetchEvent(id) {
  return {
    type: FETCH_EVENT,
    payload: api.Event.get(id)
  }
}

export function postEvent(title, timestamp, location, link, body) {
  return dispatch => {
    dispatch({ 
      type: POST_EVENT,
      payload: api.Event.create(title, timestamp, location, link, body)
    }).then(res => {
      dispatch({ type: CLOSE_MODAL });
    });
  }
}

export function likeEvent(id) {
  return {
    type: LIKE_EVENT,
    payload: api.Event.like(id)
  }
}

export function unlikeEvent(id) {
  return {
    type: UNLIKE_EVENT,
    payload: api.Event.unlike(id)
  }
}

export function fetchCurrentUser() {
  return dispatch => {
    dispatch({ 
      type: FETCH_CURRENT_USER,
      payload: api.User.current()
    }).then(res => {
      localStorage.setItem('token', res.value.body.user.token);
    });
  }
}

export function login(googleIDToken) {
  return dispatch => {
    // Call the API
    dispatch({ 
      type: LOGIN,
      payload: api.User.login(googleIDToken)
    }).then(res => {
      // Login successful, save the JWT
      localStorage.setItem('token', res.value.body.user.token);
    }).catch(err => {
      // Login failed, show an error message
      // TODO: Check for specific errors, instead of just relaying message.
      dispatch(
        error({ title: "Failed to log in", message: err.body.errors.message})
      );
    });
  }
}
