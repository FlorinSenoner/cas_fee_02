import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import Dashboard from '../Dashboard'
import Home from '../Home'
import NotFound from '../NotFound'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
