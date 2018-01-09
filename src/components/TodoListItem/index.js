import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
import { Checkbox, IconButton, TextField } from 'material-ui'
import RemoveTask from 'material-ui/svg-icons/action/highlight-off'

const cx = classNames.bind(styles)

class TodoListItem extends Component {
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
    this.changeEditable()
    this.props.updateTitle(this.props.index, e.target.value)
  }

  render () {
    const { item, index, updateCheck, removeTask } = this.props

    return (
      <div className={cx('wrap-list')}>
        <Checkbox
          checked={item.checked}
          onCheck={updateCheck(index)}
          style={{
            width: 'auto'
          }}
        />
        { this.getTitle(item) }
        <IconButton
          tooltip='delete'
          touch
          tooltipPosition='bottom-right'
          onClick={removeTask(index)}
        >
          <RemoveTask />
        </IconButton>
      </div>
    )
  }
}

export default TodoListItem
