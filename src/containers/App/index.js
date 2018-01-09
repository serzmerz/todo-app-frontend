import React, { Component } from 'react'
import './index.css'
import { AppBar, MuiThemeProvider } from 'material-ui'
import TodoList from '../../components/TodoList'

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div className='App'>
          <AppBar
            title='Title'
            iconClassNameRight='muidocs-icon-navigation-expand-more'
          />
          <TodoList />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
