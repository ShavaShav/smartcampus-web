import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux';
import {
  FETCH_EVENT,
  POST_EVENT,
  LIKE_EVENT,
  UNLIKE_EVENT,
  COMMENT_EVENT,
  COMMENT_EVENT_UPDATE,
  DELETE_COMMENT,
  FETCH_EVENTS,
  LOGIN,
  REGISTER,
  FETCH_CURRENT_USER,
  LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL
} from './actions'

/**
 * Refs
 * https://redux.js.org/basics/reducers
 * 
 * Reducers define how state is changed, given an action.
 * For ex. when user is logged in/out (action), we toggle currentUser (state)
 * When an action is dispatched in redux, these functions intercept.
 */

function eventFeed(state = {isFetching: false, events: []}, action) {
  switch (action.type) {
    case `${POST_EVENT}_FULFILLED`:
      return {
        ...state,
        events: [action.payload.body.event, ...state.events]
      };
    case `${LIKE_EVENT}_FULFILLED`:
    case `${UNLIKE_EVENT}_FULFILLED`:
      // Replace the event with the updated event from server
      const receivedEvent = action.payload.body.event;
      return {
        ...state,
        events: state.events.map((event) => 
          event.id === receivedEvent.id ? receivedEvent : event
        )
      };
    case `${FETCH_EVENTS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${FETCH_EVENTS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        events: action.payload.body.events
      };
    case `${FETCH_EVENTS}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.body
      };
    default:
      return state
  }
}

function currentUser(state = null, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
    case `${REGISTER}_FULFILLED`:
    case `${FETCH_CURRENT_USER}_FULFILLED`:
      return action.payload.body.user;
    case LOGOUT:
      return null; // no user
    default:
      return state
  }
}

// Sets the current event (used by EventPage)
function currentEvent(state = null, action) {
  switch (action.type) {
    case `${FETCH_EVENT}_FULFILLED`:
    case `${LIKE_EVENT}_FULFILLED`:
    case `${UNLIKE_EVENT}_FULFILLED`:
      return action.payload.body.event;
    case `${COMMENT_EVENT}_FULFILLED`:
      return { 
        ...state, // Add to start of event's comment list
        comments: [action.payload.body.comment, ...state.comments]
      }
    case `${DELETE_COMMENT}_FULFILLED`:
      return { 
        ...state, // Keep comments that arent the deleted one
        comments: state.comments.filter((comment) => comment.id !== action.id)
      }
    default:
      return state
  }
}

// Sets the current event's comment body (used by EventPage)
function currentEventComment(state = null, action) {
  switch (action.type) {
    case COMMENT_EVENT_UPDATE:
      return action.body; // update field with body
    case `${COMMENT_EVENT}_FULFILLED`:
      return ''; // reset comment field
    default:
      return state
  }
}

function modal(state = {type: null, show: false}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        type: action.modalType,
        show: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        show: false
      }
    default:
      return state
  }
}

export default combineReducers({
  currentUser, currentEvent, currentEventComment, eventFeed, modal, notifications
})