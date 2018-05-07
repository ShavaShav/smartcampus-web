import api from './api';

/*
 * Action Types
 */

export const ADD_EVENT = 'ADD_EVENT';

export const POST_EVENT = 'POST_EVENT';
export const POST_EVENT_SUCCESS = 'POST_EVENT_SUCCESS';
export const POST_EVENT_FAILURE = 'POST_EVENT_FAILURE';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

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

/*
 * Async Action Creators
 */

export function postEvent(title, date, time, location, link, body) {
  return dispatch => {
    dispatch({ type: POST_EVENT });

    const timestamp = date + ' ' + time + ':00';

    return api.Event.create(title, timestamp, location, link, body)
      .then((response) => {
        dispatch({ type: POST_EVENT_SUCCESS, event: response.body.event })
        dispatch({ type: CLOSE_MODAL });
      }).catch((error) => {
        dispatch({ type: POST_EVENT_FAILURE });
        console.log("Error", error);
      });
  }
}

export function fetchEvents() {
  return dispatch => {
    dispatch({ type: FETCH_EVENTS });

    return api.Event.feed()
      .then(response =>
        dispatch({ type: FETCH_EVENTS_SUCCESS, events: response.body.events })
     ).catch(error => {
        dispatch({ type: FETCH_EVENTS_FAILURE });
        console.log("Error", error);
    })
  }
}

export function fetchCurrentUser() {
  return dispatch => {
    dispatch({ type: FETCH_CURRENT_USER });

    return api.User.current()
      .then(response => {
        dispatch({ type: FETCH_CURRENT_USER_SUCCESS, user: response.body.user })

        localStorage.setItem('token', response.body.user.token);

    }).catch(error => {
        dispatch({ type: FETCH_CURRENT_USER_FAILURE });
        console.log("Error", error);
    });
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({ type: LOGIN });

    return api.User.login(email, password)
      .then(response => {
        dispatch({ type: LOGIN_SUCCESS, user: response.body.user })
        localStorage.setItem('token', response.body.user.token);
        
        dispatch({ type: CLOSE_MODAL });
    }).catch(error => {
        dispatch({ type: LOGIN_FAILURE });
        console.log("Error", error);
    });
  }
}

export function register(username, email, password) {
  return dispatch => {
    dispatch({ type: REGISTER });

    return api.User.register(username, email, password)
      .then(response => {
        dispatch({ type: REGISTER_SUCCESS, user: response.body.user })
        localStorage.setItem('token', response.body.user.token);
        
        dispatch({ type: CLOSE_MODAL });
    }).catch(error => {
        dispatch({ type: REGISTER_FAILURE });
        console.log("Error", error);
    });
  }
}

export function logout() {
  return dispatch => {
    dispatch({ type: LOGOUT });

    return api.User.logout()
      .then(response => {
        dispatch({ type: LOGOUT_SUCCESS });

        localStorage.clear();

    }).catch(error => {
        dispatch({ type: LOGOUT_FAILURE });
        console.log("Error", error);
    });
  }
}
