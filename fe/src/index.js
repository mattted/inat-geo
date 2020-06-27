import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Container from 'react-bootstrap/Container';
import './styles/App.scss';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    {/* <Container className='px-5'> */}
      <App />
    {/* </Container> */}
  </Provider>,
  document.getElementById('root')
);
