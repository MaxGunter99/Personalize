import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//React Router Dom
import { BrowserRouter as Router , withRouter } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './Reducers';
const RootElement = document.getElementById('root')
const store = createStore(Reducer, applyMiddleware(thunk));

//Router
const AppWithRouter = withRouter( App )

ReactDOM.render(

    <Router>
        <Provider store = { store }>
            <AppWithRouter />
        </Provider>
    </Router>,
    RootElement 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
