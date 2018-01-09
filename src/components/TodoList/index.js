import React, { Component } from 'react'
import {
  Card, CardActions, CardHeader, CardText, FlatButton, LinearProgress,
  TextField
} from 'material-ui'
import classNames from 'classnames/bind'
import styles from './index.css'
import TodoListItem from '../TodoListItem'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions/todoList'

const cx = classNames.bind(styles)

const updateObjectInArray = (array, action) => (
  array.map((item, index) => {
    if (index !== action.index) {
      return item
    }

    return {
      ...item,
      ...action.item
    }
  })
)

const removeItem = (array, position) => array.filter((item, index) => index !== position)

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enterText: ''
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded})
  }

  updateCheck = (index) => () => {
    this.setState({
      todo: updateObjectInArray(this.state.todo,
        {
          index, item: {checked: !this.state.todo[index].checked}
        })
    })
  }

  updateTitle = (index, title) => {
    this.setState({
      todo: updateObjectInArray(this.state.todo,
        {
          index, item: { title: title }
        })
    })
  }

  removeTask = (index) => () => {
    this.setState({
      todo: removeItem(this.state.todo, index)
    })
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.actions.createTask({})
      this.setState({enterText: ''})
    }
  }

  onChangeText = (field) => (e) => {
    this.setState({[field]: e.target.value})
  }

  getProgress = () => {
    let count = 0

    this.props.todoList.forEach(item => {
      if (item.checked) count++
    })
    return Math.floor((count / this.props.todoList.length) * 100)
  }

  render () {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} className={cx('todo-list')}>
        <CardHeader
          title="URL Avatar"
          avatar="http://www.material-ui.com/images/ok-128.jpg"
        />
        <CardText>
          <TextField
            hintText="Type title here"
            floatingLabelText="Add something"
            value={this.state.enterText}
            onChange={this.onChangeText('enterText')}
            onKeyPress={this._handleKeyPress}
          />
          {
            this.props.todoList.map((item, index) =>
              <TodoListItem
                key={index}
                item={item}
                index={index}
                updateCheck={this.updateCheck}
                removeTask={this.removeTask}
                updateTitle={this.updateTitle}
              />
            )
          }
          <p>Progress: {this.getProgress()}</p>
          <LinearProgress mode="determinate" value={this.getProgress()}/>
        </CardText>
        <CardActions>
          <FlatButton label="Delete" onClick={this.handleExpandChange}/>
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  todoList: state.todoList.data
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
