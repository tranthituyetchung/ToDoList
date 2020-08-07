import React, {Component} from 'react'
import { Provider } from 'react-redux'
import Main from './src/Main'
import {createStore} from 'redux'
//import store from './src/store/store';
//import store from './src/store/store'
import { MenuProvider } from 'react-native-popup-menu';
const defaultState = {
  todos: [
    { id: '1', title: 'Công việc 1', content: 'Nội dung công việc 1', checked: true },
    { id: '2', title: 'Công việc 2', content: 'Nội dung công việc 2', checked: false },
    { id: '3', title: 'Công việc 3', content: 'Nội dung công việc 3', checked: true },
    { id: '4', title: 'Công việc 4', content: 'Nội dung công việc 4', checked: true },
    { id: '5', title: 'Công việc 5', content: 'Nội dung công việc 5', checked: false },
    { id: '6', title: 'Công việc 6', content: 'Nội dung công việc 6', checked: true },
    { id: '7', title: 'Công việc 7', content: 'Nội dung công việc 7', checked: true },
    { id: '8', title: 'Công việc 8', content: 'Nội dung công việc 8', checked: true },
    { id: '9', title: 'Công việc 9', content: 'Nội dung công việc 9', checked: false },
    { id: '10', title: 'Công việc 10', content: 'Nội dung công việc 10', checked: false },
    { id: '11', title: 'Công việc 11', content: 'Nội dung công việc 11', checked: true },
    { id: '12', title: 'Công việc 12', content: 'Nội dung công việc 12', checked: false },
    { id: '13', title: 'Công việc 13 ', content: 'Nội dung công việc 13', checked: true },
    { id: '14', title: 'Công việc 14', content: 'Nội dung công việc 14', checked: true },
  ],
  filterStatus: 'SHOW_ALL',
  isAdding: false,
  isDeleting: false,
  
};

const reducer = (state = defaultState, action)=>{
  switch (action.type) {
    case 'CHECK_DONE':
        return {
          ...state,
          todos: state.todos.map(e=>{
            if (e.id !== action.id) return e;
            return {...e, checked: true};
          })
        };
    case 'CHECK_NOT_DONE':
        return {
          ...state,
          todos: state.todos.map(e=>{
            if (e.id !== action.id) return e;
            return {...e, checked: false};
          })
    };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [{
          id: state.todos.length + 1,
          title: action.title,
          content: action.content,
          checked: false,
        }].concat(state.todos)
      };
    case 'TOGGLE_IS_ADDING':
      return {
        ... state,
        isAdding: !state.isAdding,
      };
    case 'TOGGLE_IS_DELETING':
      return {
        ... state,
        isDeleting: !state.isDeleting,
      };
    case 'DELETE_TODO':
      return {
        ... state,
        todos: state.todos.filter( e => e.id !== action.id )
      }
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(e=>{
          if (e.id !== action.id) return e;
          return {...e, title: action.title, content: action.content};
        })
      }
    default:
      break;
  }
  return state;
}

const store = createStore(reducer);


export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <MenuProvider>
          <Main/> 
        </MenuProvider>
      </Provider>
    )
  }
}

