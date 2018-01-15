import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
import { Checkbox, IconButton, TextField } from 'material-ui'
import PropTypes from 'prop-types'
import RemoveTask from 'material-ui/svg-icons/action/highlight-off'

const cx = classNames.bind(styles)

class TodoListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    updateCheck: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      editable: false
    }
  }

  changeEditable = () => {
    this.setState({ editable: !this.state.editable })
  }

  getTitle = (item) => (
    this.state.editable
    ? <TextField
        id={`id-${this.props.index}`}
      defaultValue={item.title}
      onBlur={this.onEditText}
    />
    : <span className={cx('title', {checkedTitle: item.checked})} onClick={this.changeEditable}>{item.title}</span>
  )

  onEditText = (e) => {
    const { item, updateTitle, removeTask } = this.props

    this.changeEditable()
    e.target.value
      ? updateTitle(item, e.target.value)
      : removeTask(item.id)()
  }

  render () {
    const { item, updateCheck, removeTask } = this.props

    return (
      <div className={cx('wrap-list')}>
        <Checkbox
          checked={item.checked}
          onCheck={updateCheck(item)}
          style={{
            width: 'auto'
          }}
        />
        { this.getTitle(item) }
        <IconButton
          touch
          onClick={removeTask(item.id)}
        >
          <RemoveTask />
        </IconButton>
      </div>
    )
  }
}

export default TodoListItem
