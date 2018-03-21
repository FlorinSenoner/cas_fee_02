import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Reboot } from 'material-ui'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { isAuthenticated } from '../../fire'

import './App.css'

import Dashboard from '../Dashboard'
import NotFound from '../NotFound'
import CreateBet from '../CreateBet'
import SignInScreen from '../SignIn'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <SignInScreen />)} />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.object,
  location: PropTypes.object,
}

const App = ({ user }) => (
  <Reboot>
    {console.log('Am I allowed? ', isAuthenticated())}
    <Switch>
      <PrivateRoute exact path="/" user={user} component={Dashboard} />
      <PrivateRoute exact path="/create" component={CreateBet} />
      <Route component={NotFound} />
    </Switch>
  </Reboot>
)

App.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ user: state.signIn.user })

const enhance = compose(withRouter, connect(mapStateToProps, null))

export default enhance(App)
