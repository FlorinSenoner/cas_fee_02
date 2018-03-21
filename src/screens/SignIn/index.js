import React from 'react'
import firebase from 'firebase'
import { FirebaseAuth } from 'react-firebaseui'
import { auth } from '../../fire'

class SignInScreen extends React.PureComponent {
  uiConfig = {
    signInFlow: 'popup',
    callbacks: {
      signInSuccess: () => false, // to tell react-firebaseui that we take care of the successful login
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
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

export default SignInScreen
