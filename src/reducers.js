import { combineReducers } from 'redux'
import {
  POST_EVENT_SUCCESS,
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  FETCH_CURRENT_USER_SUCCESS,
  LOGOUT_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL
} from './actions'

function eventFeed(state = {isFetching: false, events: []}, action) {
  switch (action.type) {
    case POST_EVENT_SUCCESS:
      return {
        ...state,
        events: [action.event, ...state.events]
      };
    case FETCH_EVENTS:
      return {
        ...state,
        isFetching: true,
        events: state.events
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.events
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.error
      };
    default:
      return state
  }
}

function currentUser(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case FETCH_CURRENT_USER_SUCCESS:
      return action.user;
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state
  }
}

function modal(state = {type: 0, show: false}, action) {
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
  currentUser, eventFeed, modal
})