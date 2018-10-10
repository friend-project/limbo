import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'

import Count from './components/count'
import Async from './components/async'

const App = () => (
  <div>
    <ul>
      <li><Link to="/count">Count</Link></li>
      <li><Link to="/async">Async</Link></li>
    </ul>
    <Route path="/count" exact component={Count} />
    <Route path="/async" exact component={Async} />
  </div>
)

export default App

