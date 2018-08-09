import React from 'react';
import ReactDom from 'react-dom';
import Root from './app/root';
import { createStore } from 'redux'
// import './styles/index.css'


const init = function(state=[]) {
    return state
}

const store = createStore(init)

ReactDom.render(
    <Root store={store}/>,
    document.getElementById('app')
);
