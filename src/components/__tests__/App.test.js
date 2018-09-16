import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedApp from '../App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../../reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
  	thunkMiddleware,
  	promiseMiddleware()
  )
);

it('renders without crashing', () => {

	// App will make a call to get events
	fetch.mockResponse(JSON.stringify({events: []}));

  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
