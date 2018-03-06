import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import Dashboard from '../Dashboard'
import Home from '../Home'
import NotFound from '../NotFound'
import CreateBet from '../CreateBet'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/create" component={CreateBet} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
