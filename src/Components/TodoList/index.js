import React, { Component } from 'react'
import {
  Card, CardActions, CardHeader, CardText, Checkbox, FlatButton, IconButton, LinearProgress,
  TextField
} from 'material-ui'
import RemoveTask from 'material-ui/svg-icons/action/highlight-off'
import classNames from 'classnames/bind'
import styles from './index.css'
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

const removeItem = (array, position) => array.filter( (item, index) => index !== position)

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      completed: 0,
      enterText: '',
      todo: [
        {
          title: 'abc',
          checked: false
        },
        {
          title: 'two ones',
          checked: false
        }
      ]
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded })
  }

  updateCheck = (index) => () => {
    this.setState({
      todo: updateObjectInArray(this.state.todo,
        {
          index, item: {checked: !this.state.todo[index].checked}
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
      this.setState({ todo: [...this.state.todo, { title: this.state.enterText, checked: false }], enterText: '' })
    }
  }

  onChangeText = (field) => (e) => {
    this.setState({ [field]: e.target.value })
  }

  getProgress = () => {
    let count = 0;

    this.state.todo.forEach(item => {
      if(item.checked) count++;
    })
    return Math.floor((count / this.state.todo.length)*100);
  }

  onEditText = (e) => {
    console.log(e.target.value)
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
            this.state.todo.map((item, index) =>
              <div className={cx('wrap-list')} key={index}>
              <Checkbox
                checked={item.checked}
                onCheck={this.updateCheck(index)}
                style={{
                  width: 'auto'
                }}
              />
                <span className={cx('title', { checkedTitle: item.checked })}>{item.title}</span>
                <input
                  className={cx('title', { checkedTitle: item.checked })}
                  defaultValue={item.title}
                  onBlur={this.onEditText}
                />
                <IconButton
                  tooltip="delete"
                  touch={true}
                  tooltipPosition="bottom-right"
                  onClick={this.removeTask(index)}
                >
                  <RemoveTask />
                </IconButton>
              </div>
            )
          }
          <p>Progress: {this.getProgress()}</p>
          <LinearProgress mode="determinate" value={this.getProgress()} />
        </CardText>
        <CardActions>
          <FlatButton label="Delete" onClick={this.handleExpandChange}/>
        </CardActions>
      </Card>
    )
  }
}

export default TodoList
