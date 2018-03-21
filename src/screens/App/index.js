import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Reboot } from 'material-ui'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'

import './App.css'

import Dashboard from '../Dashboard'
import NotFound from '../NotFound'
import CreateBet from '../CreateBet'
import SignInScreen from '../SignIn'
const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Object.keys(user).length ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

const App = ({ user }) => (
  <Reboot>
    <Switch>
      <Route exact path="/login" component={SignInScreen} />
      <PrivateRoute exact path="/dashboard" user={user} component={Dashboard} />
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
