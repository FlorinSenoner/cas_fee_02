import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Reboot } from 'material-ui'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { isAuthenticated, auth } from '../../fire'
import { userChanged } from '../SignIn/actions'

import './App.css'

import Dashboard from '../Dashboard'
import NotFound from '../NotFound'
import CreateBet from '../Create'
import Invite from '../Invite'
import SignInScreen from '../SignIn'
import { propTypesUser } from '../../customPropTypes'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <SignInScreen />)} />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: propTypesUser,
  location: PropTypes.object,
}

class App extends React.PureComponent {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.userChanged(user)
      }
      this.props.replace(this.props.location.pathname)
    })
  }

  render() {
    const { user } = this.props

    return (
      <Reboot>
        <Switch>
          <PrivateRoute exact path="/" user={user} component={Dashboard} />
          <PrivateRoute exact path="/create" component={CreateBet} />
          <PrivateRoute exact path="/bet/:id/invite" component={Invite} />
          <Route component={NotFound} />
        </Switch>
      </Reboot>
    )
  }
}

App.propTypes = {
  user: propTypesUser.isRequired,
  replace: PropTypes.func.isRequired,
  userChanged: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ user: state.signIn.user })
const mapDispatchToProps = { replace, userChanged }

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))

export default enhance(App)
