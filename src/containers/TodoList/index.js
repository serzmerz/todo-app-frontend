import React, { Component } from 'react'
import {
  BottomNavigation,
  BottomNavigationItem,
  Card,
  CardActions,
  CardHeader,
  CardText,
  FlatButton,
  LinearProgress,
  TextField
} from 'material-ui'
import classNames from 'classnames/bind'
import styles from './index.css'
import TodoListItem from '../../components/TodoListItem/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createTask, deleteTask, updateTitleTask, updateCheckedTask, filterTask } from '../../actions/todoList'
import IconAll from 'material-ui/svg-icons/av/playlist-add-check'
import IconUncheck from 'material-ui/svg-icons/content/sort'
import IconCheck from 'material-ui/svg-icons/navigation/check'

const cx = classNames.bind(styles)

class TodoList extends Component {
  static propTypes = {
    filterFlagIndex: PropTypes.number.isRequired,
    todoList: PropTypes.array.isRequired,
    checkedTodoItemsCount: PropTypes.number.isRequired,
    todoListLength: PropTypes.number.isRequired,
    createTask: PropTypes.func.isRequired,
    updateCheckedTask: PropTypes.func.isRequired,
    updateTitleTask: PropTypes.func.isRequired,
    filterTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      enterText: ''
    }
  }

  updateCheck = (item) => () => {
    this.props.updateCheckedTask(item)
  };

  updateTitle = (item, title) => {
    this.props.updateTitleTask(item, title)
  };

  removeTask = (id) => () => {
    this.props.deleteTask(id)
  };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.createTask({title: e.target.value, checked: false});
      this.setState({enterText: ''})
    }
  };

  onChangeText = (field) => (e) => {
    this.setState({[field]: e.target.value})
  };

  getProgress = () => {
    const { checkedTodoItemsCount, todoListLength } = this.props;
    return Math.floor((checkedTodoItemsCount / todoListLength) * 100)
  };

  render () {
    const { todoList, checkedTodoItemsCount, todoListLength, filterFlagIndex, filterTask } = this.props
    return (
      <Card className={cx('todo-list')}>
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
            todoList.map((item, index) =>
              <TodoListItem
                key={index}
                item={item}
                updateCheck={this.updateCheck}
                removeTask={this.removeTask}
                updateTitle={this.updateTitle}
              />
            )
          }
          {
            checkedTodoItemsCount === todoListLength
              ? <p className={cx('complete-text')}>All completed</p>
              : <p className={cx('complete-text')}>
                Completed:{`${checkedTodoItemsCount}/${todoListLength}`}
              </p>
          }
          <LinearProgress mode="determinate" value={this.getProgress()}/>
          <BottomNavigation className={cx('filter')} selectedIndex={filterFlagIndex}>
            <BottomNavigationItem
              label="All"
              icon={<IconAll/>}
              onClick={() => filterTask({ index: 0, flag: [true, false] })}
            />
            <BottomNavigationItem
              label="Active"
              icon={<IconUncheck/>}
              onClick={() => filterTask({ index: 1, flag: [false] })}
            />
            <BottomNavigationItem
              label="Completed"
              icon={<IconCheck/>}
              onClick={() => filterTask({ index: 2, flag: [true] })}
            />
          </BottomNavigation>
        </CardText>
        <CardActions>
          <FlatButton label="Delete"/>
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  filterFlagIndex: state.todoList.filter.index,
  todoList: state.todoList.data.filter(item => state.todoList.filter.flag.indexOf(item.checked) !== -1),
  checkedTodoItemsCount: state.todoList.data.filter(item => item.checked === true).length,
  todoListLength: state.todoList.data.length
});

const mapDispatchToProps = {
  createTask,
  updateCheckedTask,
  updateTitleTask,
  filterTask,
  deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
