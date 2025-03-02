import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Desktop9 from './views/desktop9'
import Desktop5 from './views/desktop5'
import Desktop18 from'./views/desktop18'
import Desktop17 from './views/desktop17'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Desktop17} exact path="/desktop17
        " />
        <Route component={Desktop9} exact path="/desktop9" />
        <Route component={Desktop5} exact path="/" />
        <Route component={Desktop18} exact path="/desktop18" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
