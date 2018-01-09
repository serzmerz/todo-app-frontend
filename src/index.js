import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router} from 'react-router'
import registerServiceWorker from './registerServiceWorker'
import { history as browserHistory } from './services'
import App from './containers/App'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
