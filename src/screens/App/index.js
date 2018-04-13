import React, { PureComponent } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import CssBaseline from 'material-ui/CssBaseline'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'

import { isAuthenticated, auth } from '../../fire'
import { userChanged } from '../SignIn/actions'
import WithBets from './WithBets'
import Dashboard from '../Dashboard'
import NotFound from '../NotFound'
import CreateBet from '../Create'
import Invite from '../Invite'
import View from '../View'
import SignInScreen from '../SignIn'
import { propTypesUser } from '../../customPropTypes'
import { userSelector } from '../SignIn/selectors'
import SnackBar from './SnackBar'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <SignInScreen />)} />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
}

class App extends PureComponent {
  static propTypes = {
    user: propTypesUser.isRequired,
    replace: PropTypes.func.isRequired,
    userChanged: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  }

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
      <CssBaseline>
        {isAuthenticated() && <WithBets user={user} />}
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/create" component={CreateBet} />
          <PrivateRoute exact path="/bet/:id/invite" component={Invite} />
          <PrivateRoute exact path="/bet/:id/view" component={View} />
          <Route component={NotFound} />
        </Switch>
        <SnackBar />
      </CssBaseline>
    )
  }
}

const mapStateToProps = state => ({ user: userSelector(state) })
const mapDispatchToProps = { replace, userChanged }

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))

export default enhance(App)
