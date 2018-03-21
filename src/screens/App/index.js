import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Reboot } from 'material-ui'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { isAuthenticated, auth } from '../../fire'
import { loginSuccessful } from '../SignIn/actions'

import './App.css'

import Dashboard from '../Dashboard'
import NotFound from '../NotFound'
import CreateBet from '../CreateBet'
import SignInScreen from '../SignIn'
import { propTypesUser } from '../../customPropTypes'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <SignInScreen />)} />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: propTypesUser.isRequired,
  location: PropTypes.object,
}

class App extends React.PureComponent {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      console.log('AAAUTH STATE HAS CHANGED')
      this.props.userChanged(user)
      if (user) {
        this.props.changePage(this.props.location.pathname)
      }
    })
  }

  render() {
    const { user } = this.props

    return (
      <Reboot>
        <Switch>
          <PrivateRoute exact path="/" user={user} component={Dashboard} />
          <PrivateRoute exact path="/create" component={CreateBet} />
          <Route component={NotFound} />
        </Switch>
      </Reboot>
    )
  }
}

App.propTypes = {
  user: propTypesUser.isRequired,
  changePage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.signIn.user })
const mapDispatchToProps = { changePage: replace, userChanged: loginSuccessful }

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))

export default enhance(App)
