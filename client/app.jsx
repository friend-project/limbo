import React from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Main from './component/main'
import NotFound from './container/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="main" push />
    </Route>
    <Route path="/main" component={Main} />
    <Route component={NotFound} />
  </Switch>
)

export default App

