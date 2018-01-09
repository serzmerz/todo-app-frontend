import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import todoList from './todoList'

export default combineReducers({
  routing: routerReducer,
  todoList
})
