import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducer from 'reducers/reducer'

//create store 
//let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStore(
    reducer,
    applyMiddleware(thunk)
)
export default store
