import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Reboot } from 'material-ui'

import './App.css'

import Dashboard from '../Dashboard'
import NotFound from '../NotFound'
import CreateBet from '../CreateBet'
// import SignInScreen from '../SignIn'

const App = () => (
  <Reboot>
    {/*<SignInScreen callback={}/>*/}
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/create" component={CreateBet} />
      <Route component={NotFound} />
    </Switch>
  </Reboot>
)

export default App
