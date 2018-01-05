import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText, Checkbox, FlatButton } from 'material-ui'
import './index.css'

const updateObjectInArray = (array, action) => (
  array.map( (item, index) => {
    if(index !== action.index) {
      return item
    }

    return {
      ...item,
      ...action.item
    }
  })
)


class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
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
    this.setState({expanded: expanded})
  }

  updateCheck = (index) => () => {
    this.setState({ todo: updateObjectInArray(this.state.todo,
        { index, item: { checked: !this.state.todo[index].checked }
        })
    })
  }

  render () {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} className='todo-list'>
        <CardHeader
          title="URL Avatar"
          avatar="http://www.material-ui.com/images/ok-128.jpg"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          Description
          {
            this.state.todo.map((item, index) =>
                <Checkbox
                  label={item.title}
                  checked={item.checked}
                  onCheck={this.updateCheck(index)}
                />
            )
          }
        </CardText>
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Delete" onClick={this.handleExpandChange}/>
        </CardActions>
      </Card>
    )
  }
}

export default TodoList
