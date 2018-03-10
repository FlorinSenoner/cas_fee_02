import React from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import { FirebaseAuth } from 'react-firebaseui'
import { auth } from '../../fire'

class SignInScreen extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
  }

  constructor(props) {
    console.log('props: ', props)
    super()

    this.uiConfig = {
      signInFlow: 'popup',
      callbacks: {
        signInSuccess: props.callback,
      },
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    }
  }

  render() {
    return (
      <div>
        <p>Please sign-in:</p>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
      </div>
    )
  }
}

export default SignInScreen
