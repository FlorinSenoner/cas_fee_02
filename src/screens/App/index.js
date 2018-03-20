import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Reboot } from 'material-ui'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './App.css'

import Dashboard from '../Dashboard'
import NotFound from '../NotFound'
import CreateBet from '../CreateBet'
import SignInScreen from '../SignIn'

class App extends React.Component {
  render() {
    return (
      <Reboot>
        {this.props.user ? (
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/create" component={CreateBet} />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <SignInScreen />
        )}
      </Reboot>
    )
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.signIn.user,
})

const enhance = connect(mapStateToProps)

export default enhance(App)
