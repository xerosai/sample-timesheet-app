import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import AppRouter from './router';

// import './App.css';

const INITIAL_STATE = {
    auth: {
        authToken: ''
    }
};

class App extends Component {

    componentWillMount() {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            INITIAL_STATE.auth.authToken = authToken;
            console.log('initial state: ', INITIAL_STATE);
        }
    }

    render() {
        return (
            <Provider store={createStore(reducers, INITIAL_STATE, applyMiddleware(ReduxThunk))}>
                <AppRouter/>
            </Provider>
        );
    }
}

export default App;
