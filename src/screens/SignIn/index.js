import React, { PureComponent } from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FirebaseAuth } from 'react-firebaseui'
import { auth } from '../../fire'
import { loginSuccessful } from './actions'

class SignInScreen extends PureComponent {
  uiConfig = {
    signInFlow: 'popup',
    callbacks: {
      signInSuccess: this.props.loginSuccessful,
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  }

  render() {
    return (
      <div>
        <h1>Welcome to Wettemer</h1>
        <p>
          Wettemer is the most awesome platform to challenge your friends to anything. Right now, in realtime, even
          offline! OMG! Right. Sign in to join the gang!
        </p>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
      </div>
    )
  }
}

SignInScreen.propTypes = {
  loginSuccessful: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  loginSuccessful: authObject => {
    dispatch(loginSuccessful(authObject))
    return false // to tell react-firebaseui that we take care of the successful login
  },
})

export default connect(null, mapDispatchToProps)(SignInScreen)
